import { Router } from "express";
import { Login } from "../Controllers/Auth.controller.js";

const router = Router();

router.get("/login", Login)

export default router;