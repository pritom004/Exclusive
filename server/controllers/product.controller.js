
import Product from "../models/product.model.js";
export const products = async (req, res) => {
  try {
    const {
      sort,
      limit = 6,
      minPrice,
      maxPrice,
      category,
      color,
      size,
      page = 1,
      search,
    } = req.query;

    const filter = {};
    const sortProducts = {};
    
  
    const parsedLimit = Math.max(1, Number(limit));
    const parsedPage = Math.max(1, Number(page));
    const skip = parsedLimit * (parsedPage - 1);

   
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

  
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

   
    if (color) {
      filter.colors = Array.isArray(color) ? { $in: color } : color;
    }
    if (size) {
      filter.sizes = Array.isArray(size) ? { $in: size } : size;
    }
    if (category && category.toLowerCase() !== "all") {
      filter.category = category;
    }

   
    const totalDocuments = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / parsedLimit);

   
    if (sort === "rating_desc") {
      const results = await Product.aggregate([
        { $match: filter },
        {
          $addFields: {
            avgRating: { $avg: "$ratings.rating" },
          },
        },
       
        { $sort: { avgRating: -1 } },
        { $skip: skip },
        { $limit: parsedLimit },
      ]);

      return res.json({
        success: true,
        totalPage: totalPages,
        page: parsedPage,
        data: results,
      });
    }

  
    switch (sort) {
      case "price_asc":
        sortProducts.price = 1;
        break;
      case "price_desc":
        sortProducts.price = -1;
        break;
      case "discount_desc":
        sortProducts.discount = -1;
        break;
      case "newest":
      default:
        sortProducts.createdAt = -1; 
        break;
    }

    const results = await Product.find(filter)
      .sort(sortProducts)
      .skip(skip)
      .limit(parsedLimit);

    res.json({
      success: true,
      totalPage: totalPages,
      page: parsedPage,
      data: results,
    });
    
  } catch (error) {
    console.error("Products Fetch Error:", error);
    res.status(500).json({
      success: false,
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
