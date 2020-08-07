const { forwardTo } = require("prisma-binding");
const { createOrder } = require("./Mutation");

const Query = {
    async items(parent, args, ctx, info) {
        const items = await ctx.db.query.items();
        return items;
    },
    item: forwardTo('db'),
    itemsConnection: forwardTo('db'),
    



    // async createOrder(parent, args, ctx, info) {
    //     // Make sure user is logged in.
    //     if(!ctx.request.userId) {
    //         throw new Error(`You are not logged in!`);
    //     }
    //     // Query current order.
    //     const order = await ctx.db.query.order({ 
    //         where: { id: args.id}, info});
    //     // check if they have permissions to see order
    //     const ownsOrder = order.user.id === ctx.request.userId;
    //     const hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN');
    //     if(!ownsOrder || !hasPermissionToSeeOrder) {
    //         throw new Error(`You can't see this order`);
    //     }
    //     // return order.
    //     return order;
    // }
};

module.exports = Query;
