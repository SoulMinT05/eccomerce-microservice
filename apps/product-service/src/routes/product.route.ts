import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getDetailProduct,
    getProducts,
    updateProduct,
} from '../controller/product.controller';

const router: Router = Router();

router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('', getProducts);
router.get('/:id', getDetailProduct);

export default router;
