import { Request, Response } from "express";
import { ProductServices } from "./products.service";
import ProductValidationSchema from "./products.validation"

// Creating a product after validation
const createProduct = async (req: Request, res: Response) => {
    try 
    {
        const productData = req.body;
        // product validation using zod
        const validatedProduct = ProductValidationSchema.parse(productData);
        const result = await ProductServices.createProduct(validatedProduct);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result
        });
    } 
    catch (error) 
    {
        res.status(400).json({
            success: false,
            message: error,
        })
    }
}

// Finding a product with specified term
const findProduct = async (req: Request, res: Response) => {
    try 
    {
        const { searchTerm } = req.query;
        if (req.query.hasOwnProperty('searchTerm') && typeof searchTerm === "string" && searchTerm !== undefined) {

            const result = await ProductServices.findProductWithSearch(searchTerm);
            // if there is no product in the array , it will show a message
            if (result.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "No product found"
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: `Products matching search term '${searchTerm}' fetched successfully!`,
                    data: result
                });
            }

        } else {
            const result = await ProductServices.findProduct();
            res.status(200).json({
                success: true,
                message: `Products matching search term '${searchTerm}' fetched successfully!`,
                data: result
            });
        }

    } 
    catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        })
    }
}

// finding a product with id
const findSingleProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const result = await ProductServices.findSingleProduct(productId);
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        })
    }
}

const updateSingleProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const updatedProductInfo = req.body
        const result = await ProductServices.updateProduct(productId, updatedProductInfo);
        if (!result) {
            res.status(400).json({
                success: false,
                message: 'Invalid Product ID',
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Product updated successfully!',
                data: result
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        })
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const result = await ProductServices.deleteProduct(productId);
        // error handling
        if (!result) {
            res.status(404).json({
                success: false,
                message: 'Product does not exist'
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Product deleted successfully!",
                data: result
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        })
    }
}

export const ProductController = {
    createProduct,
    findProduct,
    findSingleProduct,
    updateSingleProduct,
    deleteProduct
}