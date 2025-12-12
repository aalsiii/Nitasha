const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const email = 'bijalwanakshat@gmail.com';
        const password = 'admin';
        const name = 'Admin User';

        let user = await User.findOne({ email });

        if (user) {
            user.password = password; // Will be hashed by pre-save hook
            user.isAdmin = true;
            await user.save();
            console.log('Admin user updated');
        } else {
            user = await User.create({
                name,
                email,
                password,
                isAdmin: true
            });
            console.log('Admin user created');
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();
