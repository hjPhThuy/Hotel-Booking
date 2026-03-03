import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hotel from './models/Hotel.js';
import Booking from './models/Booking.js';
import User from './models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    console.log("--- DEBUG START ---");

    // 1. Find bookings from the last 24 hours
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const recentBookings = await Booking.find({ createdAt: { $gte: oneDayAgo } })
        .populate('hotel')
        .populate('user');

    console.log(`\nFound ${recentBookings.length} bookings in last 24h:`);

    for (const b of recentBookings) {
        console.log(`Booking ID: ${b._id}`);
        console.log(`  - Created At: ${b.createdAt}`);
        console.log(`  - Status: ${b.status}`);
        console.log(`  - Guest Name (from User): ${b.user ? b.user.username : 'N/A'}`);
        console.log(`  - Guest Email (from User): ${b.user ? b.user.email : 'N/A'}`);
        if (b.hotel) {
            console.log(`  - Hotel ID: ${b.hotel._id}`);
            console.log(`  - Hotel Name: ${b.hotel.name}`);
            console.log(`  - Hotel Owner ID: ${b.hotel.owner}`);
        } else {
            console.log(`  - Hotel: NULL (This is bad!)`);
        }
    }

    // 2. List all Hotel Owners
    console.log("\n--- Hotel Owners ---");
    const owners = await User.find({ role: { $in: ['hotelOwner', 'admin'] } });
    owners.forEach(o => {
        console.log(`Owner ID: ${o._id}, Name: ${o.username}, Email: ${o.email}`);
    });

    console.log("--- DEBUG END ---");
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
