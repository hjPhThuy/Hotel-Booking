import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const checkAndFixUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");

        const user = await User.findOne({ email: "admin@quickstay.com" });
        if (!user) {
            console.log("User admin@quickstay.com not found!");
        } else {
            console.log(`User found: ${user.email}, Role: ${user.role}`);
            if (user.role === 'user') {
                console.log("Promoting to hotelOwner...");
                user.role = 'hotelOwner';
                await user.save();
                console.log("User promoted to hotelOwner successfully.");
            } else {
                console.log("User is already admin/owner.");
            }
        }
        process.exit();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

checkAndFixUser();
