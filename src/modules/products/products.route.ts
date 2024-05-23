import express from "express";
import { ProductController } from "./products.controller";

const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.fetchProduct);
router.get('/:id', ProductController.fetchSingleProduct);
router.put('/:id', ProductController.updateSingleProduct);
router.delete('/:id', ProductController.deleteProduct);

export const ProductRoutes = router;