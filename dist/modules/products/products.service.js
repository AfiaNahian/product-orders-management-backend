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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const products_model_1 = require("./products.model");
// creating a product
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.create(payload);
    return result;
});
// getting all products from the database
const findProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.find();
    return result;
});
// searching for a product with name or description
const findProductWithSearch = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const regexQuery = `${query}`;
    const result = yield products_model_1.Products.find({
        $or: [
            { name: { $regex: regexQuery, $options: 'i' } },
            { description: { $regex: regexQuery, $options: 'i' } },
        ]
    });
    return result;
});
// find a product by id
const findSingleProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.findOne({ _id: productId });
    return result;
});
// update product information after finding it by id
const updateProduct = (productId, updatedProductData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.findByIdAndUpdate({ _id: productId }, //finding the product by id
    { $set: updatedProductData }, //updating the document
    { new: true });
    return result;
});
//deleting a product
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.findByIdAndDelete({ _id: productId });
    return result;
});
exports.ProductServices = {
    createProduct,
    findProduct,
    findSingleProduct,
    updateProduct,
    deleteProduct,
    findProductWithSearch
};
