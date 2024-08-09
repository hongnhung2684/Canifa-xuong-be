import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  removeProductById,
  updateProductById,
} from "./../controllers/product.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { productSchema } from "../validSchema/productSchema.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";

const productRoutes = Router();
// logic
productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);

// Admin mới được làm
productRoutes.use("/", checkAuth, checkIsAdmin);
productRoutes.post("/", validBodyRequest(productSchema), createProduct);
productRoutes.delete("/:id", removeProductById);
productRoutes.patch("/:id", validBodyRequest(productSchema), updateProductById);
export default productRoutes;
