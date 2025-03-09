import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';
import { isAuthenticated } from '../middleware/authMiddleware';
import { permit } from '../middleware/roleMiddleware';

const router = Router();

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

router.post('/', isAuthenticated, permit('moderator'), categoryController.createCategory);
router.put('/:id', isAuthenticated, permit('moderator'), categoryController.updateCategory);
router.delete('/:id', isAuthenticated, permit('moderator'), categoryController.deleteCategory);

export default router;
