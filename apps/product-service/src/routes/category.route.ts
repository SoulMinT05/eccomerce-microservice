import { Router } from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controller/category.controller';
import { shouldBeAdmin } from '../middlewares/authMiddleware';

const router: Router = Router();

router.post('/', shouldBeAdmin, createCategory);
router.patch('/:id', shouldBeAdmin, updateCategory);
router.delete('/:id', shouldBeAdmin, deleteCategory);
router.get('', getCategories);

export default router;
