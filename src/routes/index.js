import { Router } from "express";
import productRoutes from "./productRoutes.js";
import authRouter from "./authRoutes.js";
import categoryRoutes from "./categoryRoutes.js";

const router = Router();
router.use("/products", productRoutes);
router.use("/auth", authRouter);
router.use("/categories", categoryRoutes);
export default router;
