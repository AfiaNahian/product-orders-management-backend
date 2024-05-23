import { TProduct } from "./products.interface";
import { Products } from "./products.model";

// creating a product
const createProduct = async (payload: TProduct) => {
    const result = await Products.create(payload);
    return result;
}

// getting all products from the database
const findProduct = async () => {
    const result = await Products.find();
    return result;
}

// searching for a product with name or description
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

// find a product by id
const findSingleProduct = async (productId: string) => {
    const result = await Products.findOne({ _id: productId });
    return result;
}

// update product information after finding it by id
const updateProduct = async (productId: string, updatedProductData: Partial<TProduct>) => {
    const result = await Products.findByIdAndUpdate(
        { _id: productId }, //finding the product by id
        { $set: updatedProductData }, //updating the document
        { new: true } 

    )
    return result;
}

//deleting a product
const deleteProduct = async (productId: string) => {
    const result = await Products.findByIdAndDelete({ _id: productId });
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