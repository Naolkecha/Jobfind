// utils/tokenGenerator.js
import jwt from 'jsonwebtoken';
const { sign } = jwt;

const generateToken = (user) => {
    const payload = {
        user: {
            id: user.id
        }
    };

    const jwtSecret = process.env.JWT_SECRET;

    // Check for the secret once and throw an error if not found
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    // Generate and return the JWT
    return sign(payload, jwtSecret, {
        expiresIn: "2h"
    });
};

export default generateToken;
