const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SingleFieldSubscriptions } = require("graphql/validation/rules/SingleFieldSubscriptions");
const stripe = require('../stripe');

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
    },
    async removeItemFromCart(parent, args, ctx, info) {
        // 1. Find the Cart Item
        const cartItem =  await ctx.db.query.cartItem({
            where: {
                id: args.id
            }
        }, `{ id, user { id }}`)
        // 2. Make sure we found an item.
        if(!cartItem) throw new Error('No CartItem Found!');
        // 3. Make sure user own that item.
        if(cartItem.user.id !== ctx.request.userId) {
            throw new Error(`Sorry you do not own this item and therefore can't delete it`);
        }
        // 4. Delete cart item.
        return ctxdb.mutation.deleteCartItem({
            where: {
                id: args.id
            }
        }, info);
    },
    async createOrder(parent, args, ctx, info) {
        // Query current user & make sure user is signed in.
        const { userId } = ctx.request;
        if(!userId) throw new Error(`YOu must be signed in to complete thsi order.`);

        const user = await ctx.db.query.user({ where: {
             id: userId
        }}, `{ 
                id name email cart { 
                    id quantity item { 
                        title price id description image 
                    }
                }
            }`);

        // Recalculate the total for the price.
        const amount = user.cart.reduce((tally, cartItem) => 
                tally + (cartItem.item.price * cartItem.quantity), 
                0
            );

        // Create the stripe charge (turn token into $).
        const charge = await stripe.charges.create({
            amount,
            currency: 'USD',
            source: args.token
        });

        // Convert the cartItems to OrderItems
        const orderItems = user.cart.map(cartItem => { 
            const orderItem = {
                ...cartItem.item,
                quantity: cartItem.quantity,
                user: { connect: { id: userId }}
            }
            delete orderItem.id;
            return orderItem;
        })
        // Create the order.
        const order = await ctx.db.mutation.createOrder({
            data: {
                total: charge.amount,
                charge: charge.id,
                items: { create: orderItems },
                user: { connect: { id: userId }}
            }
        })
        // Clear the user's cart & delete CartItems..
        const cartItemIds = user.cart.map(cartItem => cartItem.id);
        await ctx.db.mutation.deleteCartItems({ where: {
            id_in: cartItemIds
        }})
        // Return the order to the client
        return order;
    }
};

module.exports = Mutation;
