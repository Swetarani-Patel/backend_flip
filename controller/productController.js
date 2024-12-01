import ProductModel from "../model/productSchema.js";

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findOne({ id: id });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    const { category, sort } = req.query;
    let sortField;

    if (sort === "asc_price") {
      sortField = "price";
    } else if (sort === "desc_price") {
      sortField = "-price";
    } else if (sort === "desc_rating") {
      sortField = "-rating";
    } else if (sort === "asc_rating") {
      sortField = "rating";
    }

    if (sort === "newest_first") {
      const products = await ProductModel.find({
        category: category,
        rating: { $lte: 2 },
      });
      res.status(200).json(products);
    } else if (sort === "popularity") {
      const products = await ProductModel.find({
        category: category,
        rating: { $gte: 4 },
      });
      res.status(200).json(products);
    } else {
      const products = await ProductModel.find({ category: category }).sort(
        sortField
      );
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
