import { Router } from 'express';
import { isAuthenticated } from '../middleware/authMiddleware';
import { permit } from '../middleware/roleMiddleware';
import * as commentController from '../controllers/commentController';

const router = Router();

router.get('/topic/:topicId', commentController.getCommentsByTopic);
router.post('/', isAuthenticated, commentController.createComment);
router.delete('/:id', isAuthenticated, permit('moderator'), commentController.deleteComment);

export default router;
