import { Router } from 'express';
import productRouter from './product.route.js';
import categoryRouter from './category.route.js';

const router: Router = Router();

router.use('/products', productRouter);
router.use('/categories', categoryRouter);

export default router;
