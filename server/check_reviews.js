import mongoose from 'mongoose';
import Review from './models/Review.js';
import dotenv from 'dotenv';
dotenv.config();

const checkReviews = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://booking_db:123@cluster0.1nkn2.mongodb.net/booking-web");
        console.log("Connected to DB");

        const reviews = await Review.find({});
        console.log(`Total reviews in DB: ${reviews.length}`);

        if (reviews.length > 0) {
            console.log("Sample review:", JSON.stringify(reviews[0], null, 2));
        } else {
            console.log("No reviews found.");
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkReviews();
