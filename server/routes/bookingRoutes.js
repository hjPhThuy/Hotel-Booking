import express from "express";
import {
    getUserBookings,
    getHotelBookings,
    checkAvailabilityAPI,
    createBooking,
    deleteBooking,
    confirmBooking,
    markAsPaid,
    cancelBooking,
    trackingBooking
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', createBooking);
bookingRouter.post('/track', trackingBooking);

bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/hotel', protect, getHotelBookings);
bookingRouter.post('/delete', protect, deleteBooking);
bookingRouter.post('/confirm', protect, confirmBooking);
bookingRouter.post('/mark-paid', protect, markAsPaid);
bookingRouter.post('/cancel', protect, cancelBooking);

bookingRouter.get('/debug-dump', async (req, res) => {
    try {
        const Hotel = (await import("../models/Hotel.js")).default;
        const Booking = (await import("../models/Booking.js")).default;
        const Room = (await import("../models/Room.js")).default;

        const hotels = await Hotel.find({});
        const bookings = await Booking.find({});
        const rooms = await Room.find({});

        res.json({ hotels, bookings, rooms });
    } catch (e) {
        res.json({ error: e.message });
    }
});

export default bookingRouter;   