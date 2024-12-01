import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    
  },
  category:{
    type: String,

  },
  url: String,
  detailUrl: String,
  title: Object,
  price: Object,
  quantity: Number,
  description: String,
  discount: String,
  tagline: String,
  color:String,
  rating:Number,
  size:Array
});

const ProductModel = mongoose.model("product", productSchema);
export default ProductModel;
