import { Router } from 'express';
import * as userController from '../controllers/userController';
import { isAuthenticated } from '../middleware/authMiddleware';
import { permit } from '../middleware/roleMiddleware';

const router = Router();

router.get('/', isAuthenticated, permit('moderator'), userController.getUsers);
router.delete('/:id', isAuthenticated, permit('moderator'), userController.deleteUser);

export default router;
