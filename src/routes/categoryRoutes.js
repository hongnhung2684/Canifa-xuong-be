import { Router } from "express";
import {
  createCategory,
  getAllCategorys,
  getCategoryById,
  removeCategoryById,
  updateCategoryById,
} from "../controllers/categories.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { checkIsAdmin } from "./../middlewares/checkIsAdmin.js";
import { categorySchema } from "./../validSchema/categorySchema.js";

const categoryRoutes = Router();
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.get("/", getAllCategorys);

// admin moi duoc lam
categoryRoutes.use("/", checkAuth, checkIsAdmin);
categoryRoutes.post("/", validBodyRequest(categorySchema), createCategory);
categoryRoutes.patch(
  "/:id",
  validBodyRequest(categorySchema),
  updateCategoryById
);
categoryRoutes.delete("/:id", removeCategoryById);
export default categoryRoutes;
