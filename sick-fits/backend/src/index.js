require('dotenv').config();
// import GQL-YOGA screateServer func.
const createServer = require('./createServer');
// import prisma db
const db = require('./db');

// Create GQL-YOGA server.
const server = createServer();

// TODO Use express middleware to handle cookies (JWT).
// TODO Use express middleware to populate current user.

// Start up YOGA server.
server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL
    }
}, details => {
    console.log(`Server is now running on port http://localhost:${details.port}`);
})