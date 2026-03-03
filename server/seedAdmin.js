
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");

        const adminEmail = "admin@quickstay.com";
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log("Admin account already exists.");
            console.log("Email: ", adminEmail);
            console.log("If you forgot the password, please delete the user from DB or run a password reset script.");
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("123456", salt);

            await User.create({
                username: "Super Admin",
                email: adminEmail,
                password: hashedPassword,
                role: "hotelOwner", // Or 'admin' depending on your exact logic, keeping hotelOwner for now to ensure sidebar access
                image: "https://via.placeholder.com/150"
            });
            console.log("✅ Admin account created successfully!");
            console.log("Email: admin@quickstay.com");
            console.log("Password: 123456");
        }
        process.exit();
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();
