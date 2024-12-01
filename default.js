import { products } from "./constants/data.js";
import ProductModel from "./model/productSchema.js";
///add
const DefaultData = async () => {
  try {
    // await ProductModel.deleteMany({})
    // await ProductModel.insertMany(products);
    console.log("Data inserted Successfully");
  } catch (error) {
    console.log("Error while inserting default data", error.message);
  }
};

export default DefaultData;
