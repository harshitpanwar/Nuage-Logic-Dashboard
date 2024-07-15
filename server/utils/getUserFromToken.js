const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();


const getUserFromToken = async (token) => {
    try {
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            return user;
        }
        return null;
    } catch (error) {
        console.error("Error verifying token:", error.message);
        return null;
    }
};

module.exports = getUserFromToken;
