import { TProduct } from "./products.interface";
import { Products } from "./products.model";

// create a product
const createProduct = async (payload: TProduct) => {
    const result = await Products.create(payload);
    return result;
}

// Get all products
const findProduct = async () => {
    const result = await Products.find();
    return result;
}

// get a product with id
const findSingleProduct = async (productId: string) => {
    const result = await Products.findOne({ _id: productId });
    return result;
}

// update a product
const updateProduct = async (productId: string, updatedProduct: Partial<TProduct>) => {
    const result = await Products.findByIdAndUpdate(
        { _id: productId }, 
        { $set: updatedProduct }, 
        { new: true } 

    )
    return result;
}


//delete a product
const deleteProduct = async (productId: string) => {
    const result = await Products.findByIdAndDelete({ _id: productId });
    return result;
}


// searching products with specified name or description 
const findProductWithSearch = async (query: string) => {
    const regexQuery = `${query}`;
    const result = await Products.find(
        {
            $or: [
                { name: { $regex: regexQuery, $options: 'i' } },
                { description: { $regex: regexQuery, $options: 'i' } },
            ]
        }
    )
    return result;
}


export const ProductServices = {
    createProduct,
    findProduct,
    findSingleProduct,
    updateProduct,
    deleteProduct,
    findProductWithSearch
}