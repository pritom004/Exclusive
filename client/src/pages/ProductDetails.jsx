import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router";
import { fetchProductDetails } from "../redux/slices/productSlice";
import NotFound from "./NotFound";
import Loading from "../components/common/Loading";
import { CiHeart } from "react-icons/ci";
import { FaTruckFast } from "react-icons/fa6";
import { PiRecycleBold } from "react-icons/pi";
import { FaStar, FaStarHalf } from "react-icons/fa";
import RelatedProducts from "../modules/ProductDeatils/views/RelatedProducts";
import useCart from "../hooks/useCarts";
import useCheckout from "../hooks/useCheckout";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { selectedProduct, loading } = useSelector((state) => state.product);
  const { user, guestId } = useSelector((store) => store.auth);

  const [selectedImage, setSelectedImage] = useState("");
 
  const [selectedDetails, setSelectedDetails] = useState({ quantity: 1, color: "", size: "" });
  
  const { addToCartUtil } = useCart();
  const { createCheckoutUtil } = useCheckout();

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [productId, dispatch]);

  
  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.images?.length) {
        setSelectedImage(selectedProduct.images[0].url);
      }
      setSelectedDetails({
        quantity: selectedProduct.quantity > 0 ? 1 : 0,
        color: selectedProduct.colors?.[0] || "",
        size: selectedProduct.sizes?.[0] || "",
      });
    }
  }, [selectedProduct]);


  if (loading) {
    return <Loading />;
  }

  if (!selectedProduct) {
    return <NotFound />;
  }

  const handleBuyNow = async () => {
    if (selectedDetails.quantity < 1) return;
    const payload = {
      productId,
      quantity: selectedDetails.quantity,
      color: selectedDetails.color,
      size: selectedDetails.size,
    };
    await createCheckoutUtil(payload);
    navigate("/checkout");
  };

  const handleAddToCart = async () => {
    if (selectedDetails.quantity < 1) return;
    await addToCartUtil({ ...selectedDetails, productId, userId: user?._id, guestId });
  };

  function getStarCounts(ratings) {
    let avgRatings =
      ratings?.reduce((acc, curr) => (acc += curr?.rating), 0) / ratings?.length || 0;

    let full = Math.floor(avgRatings);
    let half = avgRatings - full > 0 ? 1 : 0;
    let empty = Math.floor(5 - avgRatings);

    return { full, half, empty };
  }

  const { full, half, empty } = getStarCounts(selectedProduct?.ratings);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-14 xl:py-20">
      <h4 className="flex gap-x-3 text-gray-600 mb-10">
        <Link to="/account">Account</Link>/
        <Link to="/">{selectedProduct.category}</Link>/
        <Link to={`/products/${selectedProduct._id}`} className="text-black">
          {selectedProduct.name}
        </Link>
      </h4>
      
      <div className="flex flex-wrap gap-x-20 gap-y-10">
        <nav id="images&image" className="flex gap-10">
          <ul className="space-y-5">
            {selectedProduct.images?.map((image, index) => (
              <li
                key={image.url}
                className={`size-22 cursor-pointer ${image.url === selectedImage ? "outline-2 outline-red-600" : ""}`}
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  className="object-cover aspect-square w-full h-full"
                  src={image.url}
                  alt={image.alt || `Product preview ${index + 1}`}
                />
              </li>
            ))}
          </ul>
          {selectedImage && (
            <img
              className="max-w-lg aspect-square object-cover"
              src={selectedImage}
              alt={selectedProduct.name}
            />
          )}
        </nav>

        <nav className="space-y-4 grow">
          <h5 className="text-3xl font-semibold">{selectedProduct.name}</h5>

          <div className="flex gap-3 items-center">
            <div className="flex gap-x-1">
              {Array.from({ length: full }).map((_, i) => (
                <FaStar key={`full-${i}`} className="size-4 text-yellow-400" />
              ))}
              {Array.from({ length: half }).map((_, i) => (
                <FaStarHalf key={`half-${i}`} className="size-4 text-yellow-400" />
              ))}
              {Array.from({ length: empty }).map((_, i) => (
                <FaStar key={`empty-${i}`} className="size-4 text-gray-300" />
              ))}
            </div>
            <span className="inline-block text-gray-500">
              ({selectedProduct?.ratings?.length || 0} Reviews)
            </span>
            <span className="text-gray-500">|</span>
            {selectedProduct.quantity <= 0 && <span className="text-red-600/60">Out of Stock</span>}
            {selectedProduct.quantity > 0 && selectedProduct.quantity <= 30 && <span className="text-yellow-600/60">Low Stock</span>}
            {selectedProduct.quantity > 30 && <span className="text-green-600/60">In Stock</span>}
          </div>

          <h6 className="text-2xl">${selectedProduct.price}</h6>
          <p className="max-w-xl">{selectedProduct.description}</p>
          <div className="border-b-4 max-w-xl border-gray-300"></div>

          {/* Colors */}
          <div className="flex gap-x-8 items-center">
            <span className="text-lg">Colors:</span>
            <div className="flex gap-3">
              {selectedProduct?.colors?.map((color) => {
                const bgMap = {
                  red: "bg-red-500",
                  green: "bg-green-500",
                  blue: "bg-blue-500",
                  white: "bg-white",
                  gray: "bg-gray-500",
                  black: "bg-black"
                };
                return (
                  <span
                    className={`size-7 border border-gray-300 rounded-full inline-block cursor-pointer ${selectedDetails.color === color ? "outline outline-2 outline-offset-2 outline-black" : ""} ${bgMap[color.toLowerCase()] || "bg-gray-200"}`}
                    onClick={() => setSelectedDetails({ ...selectedDetails, color })}
                    key={color}
                  ></span>
                );
              })}
            </div>
          </div>

          {/* Sizes */}
          <div className="flex gap-x-8 items-center">
            <span className="text-lg">Sizes:</span>
            <div className="flex gap-3">
              {selectedProduct?.sizes?.map((size) => (
                <span
                  className={`h-9 w-9 flex items-center justify-center rounded border border-gray-300 inline-block cursor-pointer ${selectedDetails.size === size ? "bg-red-600/70 text-white border-transparent" : ""}`}
                  onClick={() => setSelectedDetails({ ...selectedDetails, size })}
                  key={size}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity Controls & Call to actions */}
          <div className="flex gap-4 items-center pt-2">
            <nav className="flex border rounded overflow-hidden">
              <button
                disabled={selectedDetails.quantity <= 1}
                onClick={() =>
                  setSelectedDetails((prev) => ({ ...prev, quantity: prev.quantity - 1 }))
                }
                className="border-r px-3 py-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="inline-block px-5 text-xl py-1 w-14 text-center">
                {selectedDetails.quantity}
              </span>
              <button
                className="text-white px-3 py-1.5 bg-red-600/70 hover:bg-red-600"
                onClick={() =>
                  setSelectedDetails((prev) => ({ ...prev, quantity: prev.quantity + 1 }))
                }
              >
                +
              </button>
            </nav>
            
            <button 
              onClick={handleBuyNow}
              disabled={selectedProduct.quantity <= 0}
              className="text-white py-2 px-8 rounded border border-transparent bg-red-600/80 hover:bg-red-600 disabled:bg-gray-400 cursor-pointer">
              Buy Now
            </button>
            <button 
              onClick={handleAddToCart}
              disabled={selectedProduct.quantity <= 0}
              className="text-white py-2 px-8 rounded border border-transparent bg-black/80 hover:bg-black disabled:bg-gray-400 cursor-pointer">
              Add To Cart
            </button>
            <button className="p-2 rounded border border-gray-400 hover:bg-gray-50">
              <CiHeart className="size-6" />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="max-w-xl rounded border border-gray-400 mt-6">
            <div className="flex items-center gap-4 px-3 py-4">
              <FaTruckFast className="size-8.5" />
              <div className="space-y-1">
                <p className="text-lg font-medium">Free Delivery</p>
                <p className="text-sm underline cursor-pointer text-gray-600">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="w-full border-b border-gray-400"></div>

            <div className="flex items-center gap-4 px-3 py-6">
              <PiRecycleBold className="size-8.5" />
              <div className="space-y-1">
                <p className="text-lg font-medium">Return Delivery</p>
                <p className="text-sm text-gray-600">
                  Free 30 Days Returns. <span className="underline cursor-pointer">Details</span>
                </p>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <RelatedProducts category={selectedProduct.category} />
    </div>
  );
};

export default ProductDetails;