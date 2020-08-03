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
        const where = args.id;
        // Find item.
        const item = await ctx.db.query.item({ where }, `{id, title}`);
        // Check if user has permissions to delete or owns item.

        // Delete Item.
        return ctx.db.mutation.deleteItem({ where }, info);
    }
};

module.exports = Mutation;
