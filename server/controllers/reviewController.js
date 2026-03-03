import Review from "../models/Review.js";
import Booking from "../models/Booking.js";

// API to add a review
export const addReview = async (req, res) => {
    try {
        const { bookingId, rating, comment } = req.body;
        const userId = req.user._id;

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.json({ success: false, message: "Không tìm thấy đơn đặt phòng" });
        }

        if (booking.user.toString() !== userId.toString()) {
            return res.json({ success: false, message: "Bạn không có quyền đánh giá đơn này" });
        }

        if (booking.isReviewed) {
            return res.json({ success: false, message: "Bạn đã đánh giá đơn này rồi" });
        }

        console.log("Creating review for room:", booking.room);

        const review = await Review.create({
            user: userId,
            hotel: booking.hotel,
            room: booking.room,
            booking: booking._id,
            rating,
            comment
        });

        console.log("Review created:", review);

        booking.isReviewed = true;
        await booking.save();

        res.json({ success: true, message: "Đánh giá thành công!" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi đánh giá" });
    }
}

// API to get all reviews (for Admin/Hotel Owner)
export const getAllReviews = async (req, res) => {
    try {
        // Can filter by hotel if needed for multi-tenant, but assuming single owner view for now
        // or filter by req.user.hotelId if implemented. 
        // For this task, we fetch all reviews.
        const reviews = await Review.find({})
            .populate('user', 'username email')
            .populate('room', 'roomType')
            .populate('hotel', 'name')
            .sort({ createdAt: -1 });

        console.log("Reviews fetched:", JSON.stringify(reviews, null, 2));

        res.json({ success: true, reviews });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi lấy danh sách đánh giá" });
    }
}
// API to get reviews by Room ID
export const getReviewsByRoomId = async (req, res) => {
    try {
        const { roomId } = req.params;
        console.log(`Fetching reviews for room: ${roomId}`);

        // Find reviews for this room OR reviews for this hotel (if you want to show all hotel reviews, but user asked for room)
        // Let's stick to Room specific reviews first as requested.
        const reviews = await Review.find({ room: roomId })
            .populate('user', 'username image') // assuming user has these fields
            .sort({ createdAt: -1 });

        console.log(`Found ${reviews.length} reviews for room ${roomId}`);

        res.json({ success: true, reviews });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi lấy đánh giá phòng" });
    }
}
