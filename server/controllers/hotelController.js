import Hotel from "../models/Hotel.js";
import User from "../models/User.js"

export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body
        const owner = req.user._id

        //kiểm tra nếu người dùng chưa Đăng ký
        const hotel = await Hotel.findOne({ owner })
        if (hotel) {
            return res.json({ success: false, message: "Khách sạn chưa đăng ký" })
        }

        await Hotel.create({ name, address, contact, city, owner });

        await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

        res.json({ success: true, message: "Khách sạn đăng ký thành công" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getOwnerHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({ owner: req.user._id });
        res.json({ success: true, hotels });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}