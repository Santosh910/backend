import { Router } from "express";
import authRoutes from './Auth.routes.js'
import productRoutes from './Product.routes.js'
import getProductRoutes from './Product.routes.js'

const router = Router();



router.use('/auth',authRoutes)
router.use('/add', productRoutes)
router.use('/get-pro', getProductRoutes)

export default router; 