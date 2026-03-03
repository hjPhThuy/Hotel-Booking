import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRouter.js";
import connectCloudinary from "./configs/cloudinary.js";
import bookingRouter from "./routes/bookingRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";

dotenv.config();
const app = express();

// Khởi tạo kết nối DB và Cloudinary
connectDB();
connectCloudinary();

// -------------------------------------------------------------------
// 1. MIDDLEWARE CHUNG
// -------------------------------------------------------------------

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());

// -------------------------------------------------------------------
// 3. ĐỊNH NGHĨA CÁC ROUTE
// -------------------------------------------------------------------

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/reviews', reviewRouter);

app.get("/", (req, res) => {
  res.send("API đang hoạt động (Custom Auth Mode) 🚀");
});

// -------------------------------------------------------------------
// 4. CATCH-ALL 404 HANDLER
// -------------------------------------------------------------------

app.use((req, res) => {
  console.log(`[404] ${req.method} ${req.url}`);
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});


// -------------------------------------------------------------------
// 5. KHỞI ĐỘNG SERVER
// -------------------------------------------------------------------

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000; // Force restart for debug route
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// Forced restart for schema update
export default app;