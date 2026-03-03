import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hotel from './models/Hotel.js';
import Booking from './models/Booking.js';
import Room from './models/Room.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    console.log("DB Connected");

    // Dump Hotels
    const hotels = await Hotel.find({});
    console.log("HOTELS:");
    hotels.forEach(h => console.log(`ID: ${h._id}, Owner: ${h.owner}, Name: ${h.name}`));

    // Dump Rooms
    const rooms = await Room.find({});
    console.log("\nROOMS:");
    rooms.forEach(r => console.log(`ID: ${r._id}, Hotel: ${r.hotel}, Type: ${r.roomType}`));

    // Dump Bookings
    const bookings = await Booking.find({});
    console.log("\nBOOKINGS:");
    bookings.forEach(b => console.log(`ID: ${b._id}, Hotel: ${b.hotel}, Status: ${b.status}`));

    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
