import { Router } from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controller/category.controller';

const router: Router = Router();

router.post('/', createCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.get('', getCategories);

export default router;
