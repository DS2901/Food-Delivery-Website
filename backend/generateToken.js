const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateRefreshToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};
