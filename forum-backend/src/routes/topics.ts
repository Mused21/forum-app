import { Router } from 'express';
import { isAuthenticated } from '../middleware/authMiddleware';
import { permit } from '../middleware/roleMiddleware';
import * as topicController from '../controllers/topicController';

const router = Router();

router.get('/', topicController.getAllTopics);
router.get('/:id', topicController.getTopicById);
router.post('/', isAuthenticated, topicController.createTopic);
router.put('/:id', isAuthenticated, permit('moderator'), topicController.updateTopic);
router.delete('/:id', isAuthenticated, permit('moderator'), topicController.deleteTopic);

export default router;
