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
      category,
    } = req.query;

    const filter = {};

    if (category) {
      //e.g. find({category: 'electronics'})
      filter.category = category;
    }

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      //e.g. find({price: {$gte: 80}})
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Status filter
    if (status) {
      //e.g. find({status: 'stock_out'})
      filter.status = status; 
    }

    // Color filter
    if (color) {
      //e.g. find({status: 'stock_out'})
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

    let useRatingSort = false;
    const applySort = (s) => {
      if (s === "discount_desc") sortOption.discount = -1;
      if (s === "price_asc") sortOption.price = 1;
      if (s === "price_desc") sortOption.price = -1;
      if (s === "newest") sortOption.createdAt = -1;
      if (s === "rating_desc") useRatingSort = true;
    };

    if (Array.isArray(sort)) {
      sort.forEach(applySort);
    } else if (sort) {
      applySort(sort);
    }

    // block invalid combination
if (useRatingSort && Array.isArray(sort) && sort.length > 1) {
  return res.status(400).json({
    message: "rating_desc cannot be combined with other sorts",
  });
}

    // If sorting by rating, we must use aggregation
    if (useRatingSort) {
      const products = await Product.aggregate([
        { $match: filter },
        {
          $addFields: {
            avgRating: { $avg: "$ratings.rating" },
          },
        },
        { $sort: { avgRating: -1 } },
        { $limit: Number(limit) },
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
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching product details",
      error: error.message,
    });
  }
};
