const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SingleFieldSubscriptions } = require("graphql/validation/rules/SingleFieldSubscriptions");

const Mutation = {
    async createItem(parent, args, ctx, info) {
        // TODO checkif they are logged in.
        const item = await ctx.db.mutation.createItem({
            data: {
                ...args
            }
        }, info);
        return item;
    },
    async updateItem(parent, args, ctx, info) {
        // take a copy of updates
        const updates = {...args};
        // REmove id property from updates.
        delete updates.id;
        // run the update method.

        
        return ctx.db.mutation.updateItem({
            data: updates, 
            where: {
                id: args.id
            }
        }, info);
    },
    async deleteItem(parent, args, ctx, info) {
        throw new Error(`You aren't allowed!!!!`);
        const where = args.id;
        // Find item.
        const item = await ctx.db.query.item({ where }, `{id, title user { id }}`);
        // Check if user has permissions to delete or owns item.
        const ownsItem = item.user.id === ctx.request.userId;
        const hasPermissions = ctx.request.user.permissions.some(permission => 
            ['ADMIN', 'ITEMDELETE'].includes(permission));

            if(!ownsItem && !hasPermissions){
                throw new Error(`You don't have permission to do that!`);
            }


        // Delete Item.
        return ctx.db.mutation.deleteItem({ where }, info);
    },
    async signup(parent, args, ctx, info) {
        // Set email to lowercase string.
        args.email = args.email.toLowerCase();
        // Hash the password.
        const password = await bcrypt.hash(args.password, 10);
        // Create user in db.
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                // set user's default permissions
                permissions: { set: ['USER'] }
            }
        }, info);
        // Create a JWT token for user.
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // Set jwt as cookie on response.
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365 //1 year cookie
        });
        // we return the user to the browser.
        return user;
    },

    signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return { message: 'Goodbye!'}
    },
    async addToCart(parent, args, ctx, info) {
        // 1. Make sure user is signed in.
        const { userId } = ctx.request;
        if(!userId) {
            throw new Error(`You muts be signed in.`);
        }

        // 2. Query the user's current cart.
        const [exisitngCartItem] = await ctx.db.query.cartItems({
            where: {
                user: { id: userId },
                item: { id: args.id }
            }
        });
        // 3. Check if item already in user's cart. If so increment by 1.
        if(exisitngCartItem) {
            return ctx.db.mutation.updateCartItem({
                where: { id: exisitngCartItem.id },
                data: { quantity: exisitngCartItem.quantity + 1 }
            }, info);
        }
        // 4. If not create fresh item for that user.
        return ctx.db.mutation.createCartItem({
            data: {
                user: {
                    connect: { id: userId },
                },
                item: {
                    connect: { id: args.id }
                }
            }
        }, info)
    }
};

module.exports = Mutation;
