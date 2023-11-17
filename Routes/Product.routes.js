import { Router } from "express";
import { addProduct, getAllProduct,filterProducts, getSingleProduct } from "../Controllers/Products.controller.js";
import { checkUserId } from "../Middleware/AllMiddlewares.js";


const router = Router();

router.post('/filter-products',filterProducts)
router.post('/add-product',checkUserId, addProduct)
router.get('/get-product',getAllProduct)
router.post('/get-single-product',getSingleProduct)

export default router