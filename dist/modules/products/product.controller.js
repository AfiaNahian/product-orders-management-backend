"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const products_service_1 = require("./products.service");
const product_zod_validation_1 = __importDefault(require("./product.zod.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        // validation using zod
        const validatedProductData = product_zod_validation_1.default.parse(productData);
        const result = yield products_service_1.ProductServices.createProduct(validatedProductData);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
});
const fetchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        /*eslint no-prototype-builtins: "off"*/
        if (req.query.hasOwnProperty('searchTerm') && typeof searchTerm === "string" && searchTerm !== undefined) {
            const result = yield products_service_1.ProductServices.findProductWithSearch(searchTerm);
            // if there is no product in the array , it will show a message
            if (result.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "No product found"
                });
            }
            else {
                res.status(200).json({
                    success: true,
                    message: 'Products fetched successfully!',
                    data: result
                });
            }
        }
        else {
            const result = yield products_service_1.ProductServices.findProduct();
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
                data: result
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
});
const fetchSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const result = yield products_service_1.ProductServices.findSingleProduct(productId);
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
});
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const updatedProductInfo = req.body;
        const result = yield products_service_1.ProductServices.updateProduct(productId, updatedProductInfo);
        if (!result) {
            res.status(400).json({
                success: false,
                message: 'Invalid Product ID',
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Product updated successfully!',
                data: result
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const result = yield products_service_1.ProductServices.deleteProduct(productId);
        // error handling
        if (!result) {
            res.status(404).json({
                success: false,
                message: 'Product does not exist'
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Product deleted successfully!",
                data: result
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
});
exports.ProductController = {
    createProduct,
    fetchProduct,
    fetchSingleProduct,
    updateSingleProduct,
    deleteProduct
};
