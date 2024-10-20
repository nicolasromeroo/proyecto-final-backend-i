
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'; 

const productCollection = "Product";

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    imageUrl: String,
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;

