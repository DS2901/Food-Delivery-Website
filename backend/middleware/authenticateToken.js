const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                console.error("Token expired");
                return res.status(401).send("Token expired");
            }
            console.error("Token verification error:", err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
