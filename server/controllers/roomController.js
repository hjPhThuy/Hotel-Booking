import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";
import fs from 'fs';

export const createRoom = async (req, res) => {
    try {
        console.log("Create Room Body:", req.body);
        fs.appendFileSync('debug_req.txt', JSON.stringify(req.body) + '\n');
        const { roomType, pricePerNight, description, amenities, hotelName, hotelAddress, hotelCity, hotelContact } = req.body;
        let hotel = await Hotel.findOne({ owner: req.user._id, name: hotelName })

        if (!hotel) {
            // Check if Hotel fields are provided
            if (!hotelName || !hotelAddress || !hotelCity || !hotelContact) {
                return res.json({ success: false, message: "Vui lòng nhập thông tin khách sạn trước khi thêm phòng" })
            }
            // Create Hotel First
            hotel = await Hotel.create({
                owner: req.user._id,
                name: hotelName,
                address: hotelAddress,
                city: hotelCity,
                contact: hotelContact
            });
            // Update User Role if needed (Just to be safe, though they should be Owner already)
            if (req.user.role !== 'hotelOwner') {
                // req.user.role = 'hotelOwner'; 
                // await req.user.save();
                // Or better update via Model to ensure DB persistence if needed, 
                // but usually role is updated at login or separate registration. 
                // Assuming they are already authorized to hit this endpoint implies they are owner or admin.
            }
        }

        const uploadImages = req.files.map(async (file) => {
            const respones = await cloudinary.uploader.upload(file.path);
            return respones.secure_url;
        })

        const images = await Promise.all(uploadImages)

        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            description: description || "No Description Provided",
            amenities: JSON.parse(amenities),
            images,
        })
        res.json({ success: true, message: `Thêm phòng thành công cho khách sạn: ${hotel ? hotel.name : 'Mới'} (Input: ${hotelName})` })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

import Review from "../models/Review.js";

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ isAvailable: true }).populate({
            path: 'hotel',
            populate: {
                path: 'owner',
                select: 'image'
            }
        }).sort({ createdAt: -1 })

        // Attach review stats to each room
        const roomsWithStats = await Promise.all(rooms.map(async (room) => {
            const reviews = await Review.find({ room: room._id });
            const totalReviews = reviews.length;
            const averageRating = totalReviews > 0
                ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
                : 0;

            return {
                ...room.toObject(),
                totalReviews,
                averageRating
            }
        }));

        res.json({ success: true, rooms: roomsWithStats });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getOwnerRooms = async (req, res) => {
    try {
        const hotels = await Hotel.find({ owner: req.user._id });
        const hotelIds = hotels.map(h => h._id);
        const rooms = await Room.find({ hotel: { $in: hotelIds } }).populate("hotel");
        res.json({ success: true, rooms });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body;
        const roomData = await Room.findById(roomId)
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({ success: true, message: "Cập nhật phòng thành công" })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const deleteRoom = async (req, res) => {
    try {
        const { id } = req.body;
        const room = await Room.findByIdAndDelete(id);
        if (room) {
            res.json({ success: true, message: "Xóa phòng thành công" });
        } else {
            res.json({ success: false, message: "Không tìm thấy phòng" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Xóa thất bại" });
    }
}
