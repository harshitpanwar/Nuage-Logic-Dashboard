const bcrypt = require('bcryptjs');
const User = require('../models/user');

const createAdmin = async () => {
    try {
        const admin = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (!admin) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
            const newAdmin = new User({
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword
            });
            await newAdmin.save();
        }
        else{
            
            //update password
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
            admin.password = hashedPassword;
            await admin.save();
        }
    }
    catch (error) {
        console.error('Error creating admin:', error);
    }
}

module.exports = createAdmin;