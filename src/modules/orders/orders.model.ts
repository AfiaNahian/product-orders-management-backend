import { TOrder } from "./orders.interface";
import { Schema, model } from 'mongoose';

const orderSchema = new Schema<TOrder>({
    email: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

export const Orders = model<TOrder>('Orders', orderSchema);