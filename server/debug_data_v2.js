import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hotel from './models/Hotel.js';
import Room from './models/Room.js';
import Booking from './models/Booking.js';
import User from './models/User.js';

dotenv.config();

const debugData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");

        const hotels = await Hotel.find({});
        console.log(`\n--- Hotels (${hotels.length}) ---`);
        hotels.forEach(h => console.log(`ID: ${h._id}, Name: ${h.name}, Owner: ${h.owner}`));

        const rooms = await Room.find({});
        console.log(`\n--- Rooms (${rooms.length}) ---`);
        rooms.forEach(r => console.log(`ID: ${r._id}, Name: ${r.roomType}, Hotel: ${r.hotel}`));

        const bookings = await Booking.find({});
        console.log(`\n--- Bookings (${bookings.length}) ---`);
        bookings.forEach(b => console.log(`ID: ${b._id}, Hotel: ${b.hotel}, User: ${b.user}, Status: ${b.status}`));

        const users = await User.find({});
        console.log(`\n--- Users (${users.length}) ---`);
        users.forEach(u => console.log(`ID: ${u._id}, Name: ${u.username}, Email: ${u.email}, Role: ${u.role}`));

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debugData();
