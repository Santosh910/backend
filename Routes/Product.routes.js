import { Router } from "express";
import { addProduct } from "../Controllers/Products.controller.js";
import { checkUserId } from "../Middleware/AllMiddlewares.js";


const router = Router();

router.post('/add-product',checkUserId, addProduct)

export default router