// This file connect to remote prisma db and allows querying db with JS.
const { Prisma } = require('prisma-binding');

const db = new Prisma({
    typeDefs: 'generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: false
});

module.exports = db;