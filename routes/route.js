import express from "express";
import { userLogin, userSignup } from "../controller/userController.js";
import {
  getProductByCategory,
  getProductById,
  getProducts,
} from "../controller/productController.js";

const router = express.Router();
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/products", getProducts);
router.get("/product/category", getProductByCategory);
router.get("/product/:id", getProductById);

export default router;
