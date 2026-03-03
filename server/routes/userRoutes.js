import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUserData, storeRencentSearchedCities } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/', protect, getUserData);
userRouter.post('/store-recent-search', protect, storeRencentSearchedCities);
userRouter.post('/profile', protect, (await import("../controllers/userController.js")).updateUserProfile);


export default userRouter;