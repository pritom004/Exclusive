import Product from "../models/product.model.js";
export const products = async (req, res) => {
  try {
    const {
      sort,
      limit = 20,
      minPrice,
      maxPrice,
      status,
      color,
      size,
      isNew,
      category 
    } = req.query;

    const filter = {};

    if(category){
      filter.category = category;
    }

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Status filter
    if (status) {
      filter.status = status; // "In Stock", "Out of Stock", etc
    }

    // Color filter
    if (color) {
      filter.colors = color; // matches array
    }

    // Size filter
    if (size) {
      filter.sizes = size; // matches array
    }

    // New products (last 7 days)
    if (isNew === "true") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      filter.createdAt = { $gte: sevenDaysAgo };
    }

    // Sorting
    let sortOption = {};
    if (sort === "discount_desc") sortOption.discount = -1;
    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "price_desc") sortOption.price = -1;
    if (sort === "newest") sortOption.createdAt = -1;

    // If sorting by rating, we must use aggregation
    if (sort === "rating_desc") {
      const products = await Product.aggregate([
        { $match: filter },
        {
          $addFields: {
            avgRating: { $avg: "$ratings.rating" }
          }
        },
        { $sort: { avgRating: -1 } },
        { $limit: Number(limit) }
      ]);

      return res.json(products);
    }

    const products = await Product.find(filter)
      .sort(sortOption)
      .limit(Number(limit));

    res.json(products);
  } catch (error) {
    res.status(500).json({
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