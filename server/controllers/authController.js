import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: '1d' });

        res.json({ success: true, token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: '1d' });

        res.json({ success: true, token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
