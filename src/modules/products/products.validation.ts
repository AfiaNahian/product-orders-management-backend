import { z } from 'zod';

const TVariantValidationSchema = z.object({
    type: z.string().min(1, { message: 'Variant cannot be empty' }).max(20, { message: 'Variant type should not exceed 20 characters' }),
    value: z.string().min(1, { message: 'Value cannot be empty' }).max(20, { message: 'Variant value should not exceed 20 characters' }),
});

// Define the TInventoryValidationSchema type
const TInventoryValidationSchema = z.object({
    quantity: z.number().nonnegative({ message: 'Quantity cannot be negative' }),
    inStock: z.boolean({
        required_error: "inStock is required",
        invalid_type_error: "inStock must be a boolean",
    })
});

// Define the ProductValidationSchema type
const ProductValidationSchema = z.object({
    _id: z.string().optional(),
    name: z.string().min(1, { message: "Product name at least be 1 letter" }).max(30, { message: 'Product name can not exceed 30 letters' }),
    description: z.string().min(10, { message: "Product at least need 10 characters long description" }).max(150, { message: "Product description should not exceed 150 characters" }),
    price: z.number().nonnegative({ message: 'Price cannot be negative' }),
    category: z.string({
        required_error: "category is required",
    }),
    tags: z.array(z.string()),
    variants: z.array(TVariantValidationSchema),
    inventory: TInventoryValidationSchema,
});

export default ProductValidationSchema;
