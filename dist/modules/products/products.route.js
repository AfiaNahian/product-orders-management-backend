"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
router.post('/', products_controller_1.ProductController.createProduct);
router.get('/', products_controller_1.ProductController.fetchProduct);
router.get('/:id', products_controller_1.ProductController.fetchSingleProduct);
router.put('/:id', products_controller_1.ProductController.updateSingleProduct);
router.delete('/:id', products_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
