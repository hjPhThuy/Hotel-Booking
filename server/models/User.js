import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: "https://via.placeholder.com/150" },
    role: { type: String, enum: ["user", "hotelOwner", "admin"], default: "user" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    recentSearchedCities: { type: [String], default: [] },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;