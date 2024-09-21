const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;

    // Check if the authorization header is present
    if (!authorization) return res.status(401).json({ error: 'Token Not Found' });
    
    // Extract the JWT token from the Authorization header
    const token = authorization.split(' ')[1]; // 'Bearer jkjjkjgajkj exampleToken'

    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user info to the request object
        req.user = decoded;
        
        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: 'Invalid Token' });
    }
};

// Function to generate a token
const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30m' });
};

module.exports = { jwtAuthMiddleware, generateToken };
