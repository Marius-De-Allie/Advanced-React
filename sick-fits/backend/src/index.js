const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// import GQL-YOGA screateServer func.
const createServer = require('./createServer');
// import prisma db
const db = require('./db');

// Create GQL-YOGA server.
const server = createServer();

// TODO Use express middleware to handle cookies (JWT).
server.express.use(cookieParser());
// TODO Use express middleware to populate current user.
// decode the JWT so we can get the user id on each request.
server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if(token) {
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        // Put userId onto the request for further requests to access.
        req.userId = userId;
    }
    next();
});

// Start up YOGA server.
server.start({
    cors: {
        credentials: false,
        origin: process.env.FRONTEND_URL
    }
}, details => {
    console.log(`Server is now running on port http://localhost:${details.port}`);
})