// middlewares/authMiddlewares.js

import jwt from 'jsonwebtoken';
import config from 'config';


export function protect(req, res, next) {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    console.log('Token:', token);

    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// In the authMiddlewares.js file, we have created a middleware function that checks for the presence of a token in the request header. If the token is not present, it returns a 401 status code with a message 'No token, authorization denied'. If the token is present, it verifies the token using the jwt.verify method and extracts the user information from the decoded token. It then attaches the user information to the request object and calls the next middleware function in the stack.