"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const TVariantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: 'Variant cannot be empty' }).max(20, { message: 'Variant type should not exceed 20 characters' }),
    value: zod_1.z.string().min(1, { message: 'Provide some value information' }).max(20, { message: 'Variant value should not exceed 20 characters' }),
});
// Define the TInventoryValidationSchema type
const TInventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().nonnegative({ message: 'Quantity cannot be negative' }),
    inStock: zod_1.z.boolean({
        required_error: "inStock is required",
        invalid_type_error: "inStock must be a boolean",
    })
});
// Define the ProductValidationSchema type
const ProductValidationSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    name: zod_1.z.string().min(1, { message: "Must be 1 or more characters long" }).max(30, { message: 'Product name must not exceed 30 characters' }),
    description: zod_1.z.string().min(10, { message: "Product must have at least 5 characters long description" }).max(150, { message: "Product description should not exceed 150 characters" }),
    price: zod_1.z.number().nonnegative({ message: 'Price cannot be negative' }),
    category: zod_1.z.string({
        required_error: "category for the product is required",
    }),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(TVariantValidationSchema),
    inventory: TInventoryValidationSchema,
});
exports.default = ProductValidationSchema;
