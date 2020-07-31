const { GraphQLServer } = require('graphql-yoga');
// Import both resolvers.
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
// Import prisma db connection.
const db = require('./db');

// Create the GQL YOGA server

const createServer = () => {
    return new GraphQLServer({
        typeDefs: 'src/schema.graphql',
        resolvers: {
            Mutation,
            Query
        },
        resolverValidationOptions: {
            requireResolversForResolveType: false
        },
        context: req => ({...req, db})
    });
};

module.exports = createServer;