const { forwardTo } = require("prisma-binding");
const { createOrder } = require("./Mutation");
const { hasPermission } = require('../utils');

const Query = {
    // async items(parent, args, ctx, info) {
    //     const items = await ctx.db.query.items();
    //     return items;
    // },
    items: forwardTo('db'),
    item: forwardTo('db'),
    itemsConnection: forwardTo('db'),
    me(parent, args, ctx, info) {
        // check if there is a current user ID
        if(!ctx.request.userId) {
            return null;
        }
        return ctx.db.query.user({
            where: { id: ctx.request.userId }
        }, info);
    },
    async users(parent, args, ctx, info) {
        // Check if user is logged in.
        if(!ctx.request.userId) {
            throw new Error(`You must be logged in.`);
        }
        // Check if the user has a the permissions to query all the users.
        hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
        // If they do, Query all the users.
        return ctx.db.query.users({}, info);
    },
    async order(parent, args, ctx, info) {
        // Make sure user is logged in.
        if(!ctx.request.userId) {
            throw new Error(`You aren't logged in!`)
        }
        // Query current order
        const order = await ctx.db.query.order({ 
            where: { id: args.id }
        }, info);
        // Check if user have permissions tosee this order
        ownsOrder = order.user.id === ctx.request.userId;
        hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN');
        if(!ownsOrder || hasPermissionToSeeOrder) {
            throw new Error(`Sorry, you do not have permissions to see this order.`) ;
        }
        // return the order
        return order;
    },
    async orders(parent, args, ctx, info) {
        const { userId } = ctx.request;
        if(!userId) {
            throw new Error(`You must be signed in.`);
        }
        return ctx.db.query.orders({
            where: {
                user: { id: userId }
            }
        }, info);
    }
};

module.exports = Query;
