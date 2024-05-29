import { z } from "zod";

const OrderValidationSchema = z.object({
    email: z.string().email({ message: 'standard email format required' }),
    productId: z.string({
        required_error: 'Product id cannot be empty',
        invalid_type_error: 'Product id  must be a sting'
    }),
    price: z.number().nonnegative({ message: "Price cannot be negative" }),
    quantity: z.number().min(1, { message: "You have to  order at least one item" }),
});

export default OrderValidationSchema;