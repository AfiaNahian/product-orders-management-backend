"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_route_1 = require("./modules/products/products.route");
const app = (0, express_1.default)();
//step 1 : to use parsers
app.use(express_1.default.json());
//products route
app.use('/api/products', products_route_1.ProductRoutes);
//const port = 3000
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
