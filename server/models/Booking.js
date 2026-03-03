import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: { type: String, ref: "User", required: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    guests: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending"
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "card", "online"],
        default: "cash"
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    isReviewed: {
        type: Boolean,
        default: false
    },
    code: {
        type: String,
        required: true,
        unique: true
    }

}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;