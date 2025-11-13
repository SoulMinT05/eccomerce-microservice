import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getDetailProduct,
    getProducts,
    updateProduct,
} from '../controller/product.controller';
import { shouldBeAdmin } from '../middlewares/authMiddleware';

const router: Router = Router();

router.post('/', shouldBeAdmin, createProduct);
router.patch('/:id', shouldBeAdmin, updateProduct);
router.delete('/:id', shouldBeAdmin, deleteProduct);
router.get('', getProducts);
router.get('/:id', getDetailProduct);

export default router;
