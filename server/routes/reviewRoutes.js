import express from 'express';
import { addReview, getAllReviews, getReviewsByRoomId } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const reviewRouter = express.Router();

reviewRouter.post('/add', protect, addReview);
reviewRouter.get('/all', protect, getAllReviews);
reviewRouter.get('/room/:roomId', getReviewsByRoomId); // Public route, no protect needed to view reviews

export default reviewRouter;
