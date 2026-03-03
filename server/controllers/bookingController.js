import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

const generateBookingCode = () => {
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `BK-${randomStr}`;
}

const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lt: checkOutDate },
            checkOutDate: { $gt: checkInDate }
        });
        const isAvailable = bookings.length === 0;
        return isAvailable;

    } catch (error) {
        console.log(error);
    }

}

//API to check available of room
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { checkInDate, checkOutDate, room } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        res.json({ success: true, isAvailable });
    } catch (error) {
        console.log(error);
    }
}

//API to create a new booking
export const createBooking = async (req, res) => {
    try {
        const { checkInDate, checkOutDate, room, guests, name, email, phone, paymentMethod } = req.body;
        console.log("Create Booking Body:", req.body); // DEBUG LOG
        let userId;

        // Nếu đã đăng nhập thì lấy ID user
        if (req.user) {
            userId = req.user._id;
        } else {
            // Nếu là khách vãng lai (Guest)
            // Kiểm tra xem email này đã có account chưa
            // Note: Cần import User model ở trên cùng file nếu chưa có
            // import User from "../models/User.js"; (Tôi sẽ thêm import này sau)

            // Tạm thời để đơn giản: Nếu không đăng nhập, ta yêu cầu gửi thêm name/email/phone
            // và tạo một user mới (hoặc tìm user cũ) cho họ.
            if (!email || !name) {
                return res.json({ success: false, message: "Vui lòng đăng nhập hoặc nhập tên và email để đặt phòng" });
            }

            // Logic đơn giản: Check user by email
            const User = (await import("../models/User.js")).default; // Dynamic import để tránh lỗi nếu chưa import
            let user = await User.findOne({ email });

            if (!user) {
                // Tạo user mới cho khách vãng lai với password ngẫu nhiên
                const randomPassword = Math.random().toString(36).slice(-8);
                const bcrypt = (await import("bcryptjs")).default;
                const hashedPassword = await bcrypt.hash(randomPassword, 10);

                user = await User.create({
                    username: name,
                    email,
                    password: hashedPassword,
                    role: "user"
                });
                console.log(`Created new guest user: ${email} / ${randomPassword}`);
            }
            userId = user._id;
        }

        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        if (!isAvailable) {
            return res.json({ success: false, message: "Uii, phòng này không trống lịch vào ngày bạn đặt! Hãy tham khảo phòng khác nhé!" });
        }

        const roomData = await Room.findById(room).populate("hotel");
        if (!roomData) {
            return res.json({ success: false, message: "Phòng không tồn tại" });
        }
        if (!roomData.hotel) {
            return res.json({ success: false, message: "Phòng này chưa được liên kết với khách sạn nào (Lỗi dữ liệu)" });
        }

        let totalPrice = roomData.pricePerNight;
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (checkOut <= checkIn) {
            return res.json({ success: false, message: "Ngày trả phòng phải sau ngày nhận phòng" });
        }

        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (nights > 1) {
            totalPrice = roomData.pricePerNight + (nights - 1) * (roomData.pricePerNight * 0.5);
        } else {
            totalPrice = roomData.pricePerNight * nights;
        }

        const booking = await Booking.create({
            user: userId,
            room,
            hotel: roomData.hotel._id,
            checkInDate,
            checkOutDate,
            guests: +guests,
            totalPrice,
            paymentMethod: paymentMethod || 'cash',
            paymentMethod: paymentMethod || 'cash',
            isPaid: paymentMethod === 'online' ? true : false,
            code: generateBookingCode()
        });
        res.json({ success: true, message: "Đặt phòng thành công", code: booking.code });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Đặt phòng thất bại: " + error.message });
    }
}
//API to get all bookings of a user 
export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({ user }).populate("room hotel").sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lấy thông tin booking thất bại" });
    }
}

export const getHotelBookings = async (req, res) => {
    try {
        let bookings;
        if (req.user && req.user.role === 'admin') {
            bookings = await Booking.find({}).populate("room hotel user").sort({ createdAt: -1 });
        } else {
            const hotels = await Hotel.find({ owner: req.user._id });
            if (!hotels || hotels.length === 0) {
                return res.json({ success: true, bookings: [], totalBookings: 0, totalRevenue: 0 });
            }
            const hotelIds = hotels.map(h => h._id);
            bookings = await Booking.find({ hotel: { $in: hotelIds } }).populate("room hotel user").sort({ createdAt: -1 });
        }

        const totalBookings = bookings.length;
        // Doanh thu chỉ tính các đơn Đã thanh toán và không bị hủy
        const totalRevenue = bookings.reduce((acc, booking) => {
            if (booking.isPaid && booking.status !== 'cancelled') {
                return acc + booking.totalPrice;
            }
            return acc;
        }, 0);

        res.json({ success: true, bookings, totalBookings, totalRevenue });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lấy thông tin booking thất bại" });
    }
}

export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.body;
        const booking = await Booking.findByIdAndDelete(id);
        if (booking) {
            res.json({ success: true, message: "Hủy đặt phòng thành công" });
        } else {
            res.json({ success: false, message: "Không tìm thấy yêu cầu" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Hủy thất bại" });
    }
}



export const confirmBooking = async (req, res) => {
    try {
        const { id } = req.body;
        const booking = await Booking.findByIdAndUpdate(id, { status: 'confirmed' });
        if (booking) {
            res.json({ success: true, message: "Xác nhận đặt phòng thành công" });
        } else {
            res.json({ success: false, message: "Không tìm thấy yêu cầu" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Xác nhận thất bại" });
    }
}

export const markAsPaid = async (req, res) => {
    try {
        const { id } = req.body;
        const booking = await Booking.findByIdAndUpdate(id, { isPaid: true });
        if (booking) {
            res.json({ success: true, message: "Cập nhật thanh toán thành công" });
        } else {
            res.json({ success: false, message: "Không tìm thấy yêu cầu" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Cập nhật thất bại" });
    }
}

export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.body;
        const booking = await Booking.findById(id);

        if (!booking) {
            return res.json({ success: false, message: "Không tìm thấy đơn đặt phòng" });
        }

        if (booking.user.toString() !== req.user._id.toString()) {
            return res.json({ success: false, message: "Bạn không có quyền hủy đơn này" });
        }

        if (booking.status !== 'pending') {
            return res.json({ success: false, message: "Chỉ có thể hủy đơn đang chờ xác nhận" });
        }

        booking.status = 'cancelled';
        await booking.save();

        res.json({ success: true, message: "Hủy đặt phòng thành công" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Hủy đơn thất bại" });
    }
}

export const trackingBooking = async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) return res.json({ success: false, message: "Vui lòng nhập mã đơn hàng" });

        const booking = await Booking.findOne({ code }).populate("room hotel");
        if (!booking) {
            return res.json({ success: false, message: "Không tìm thấy đơn hàng với mã này" });
        }

        res.json({ success: true, booking });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Tra cứu thất bại" });
    }
}
