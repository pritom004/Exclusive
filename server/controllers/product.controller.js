import Product from "../models/product.model.js";
export const products = async (req, res) => {
  try {
    const { sort, limit = 20, category, minPrice, maxPrice, isNew } = req.query;

    const filter = {};

    // Filtering
    if (category) {
      filter.category = category;
    }

    if (isNew === "true") {
      filter.isNew = true;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Sorting
    let sortOption = {};
    if (sort === "discount_desc") sortOption.discount = -1;
    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "price_desc") sortOption.price = -1;
    if (sort === "rating_desc") sortOption.rating = -1;

    const products = await Product.find(filter)
      .sort(sortOption)
      .limit(Number(limit));

    res.json(products);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};


export const productDetails = async (req, res) => {
  try {
    
    const product = await Product.findById(req.params.productId)

    if(!product){
      return res.status(404).json({
        message: "Product not found!"
      })
    }

    return res.json(product)
  } catch (error) {
      return res.status(500).json({
      message: "Error fetching product details",
      error: error.message,
    });
  }
}