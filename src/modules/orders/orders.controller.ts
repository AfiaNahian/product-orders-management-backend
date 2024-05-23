import { Request, Response } from "express";
import { OrdersServices } from "./orders.service";
import { Orders } from "./orders.model";
import { Products } from "../products/products.model";
import OrderValidationSchema from "./orders.validation";

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;

        // validating order data using zod
        const validatedOrderData = OrderValidationSchema.parse(orderData);

        const { productId, quantity: orderQuantity } = validatedOrderData;

        // first we find the corresponding product using the id we get from order data

        const product = await OrdersServices.createAnOrderToDB(productId);

        // if order quantity is bigger than product invenotry below code will run and handle the situation
        if (product?.inventory.quantity < orderQuantity) {
            res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory",
                data: { product }
            })
        } else {
            // if the quantity is not 0 then we will create the order and update the quantity of that product
            if (product?.inventory.quantity !== 0) {
                const order = await Orders.create(validatedOrderData);
                // after we create the order, we will update the quantity of the product and stock status
                const updateProductQuantity = await Products.findByIdAndUpdate(
                    { _id: product?._id },
                    { $inc: { "inventory.quantity": -orderQuantity } }, //this is the order quantity that is being deducted from the inventory
                    { new: true }
                );
                // after ordering if the product quantity is equals to zero the code block below will run and set the stock to false
                if (updateProductQuantity?.inventory.quantity === 0) {
                    await Products.findByIdAndUpdate(
                        { _id: product?._id },
                        { $set: { "inventory.inStock": false } }, //when the inventory stock is 0 the stock will be set to false
                        { new: true }
                    )
                }
                res.status(200).json({
                    success: true,
                    message: "Order created successfully!",
                    data: { order }
                })
            } else {
                const updateProductInventory = await Products.findByIdAndUpdate(
                    { _id: product?._id },
                    { $set: { "inventory.inStock": false } }, //when the inventory is empty the stock will be set to false
                    { new: true }
                );
                res.status(400).json({
                    success: false,
                    message: "Insufficient quantity available in inventory",
                    data: { updateProductInventory }
                })
            }
        }

    } catch (error) {
        res.status(403).json({
            message: error
        });
    }

}
const fetchOrder = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;
        // checking if there's a query for single order based on email
        /*eslint no-prototype-builtins: "off"*/
        if (req.query.hasOwnProperty("email") && typeof email === 'string' && email !== 'undefined') {
            // if the email is there we will fetch the order for that specific user
            const result = await OrdersServices.fetchOrdersByEmailFromDB(email);
            // wrong email input will result in no data. Then we will show this error message
            if (result.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "Order not found"
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: "Orders fetched successfully for user email!",
                    data: result
                })
            }

        } else {
            // this part of the code will show all the orders in the collection
            const result = await OrdersServices.fetchAllOrdersFromDB();
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: result
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })
    }

}


export const OrderController = {
    createOrder,
    fetchOrder
}