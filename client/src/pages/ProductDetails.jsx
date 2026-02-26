import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { fetchProductDetails } from "../redux/slices/productSlice";
import NotFound from "./NotFound";
import { CiHeart } from "react-icons/ci";
import { FaTruckFast } from "react-icons/fa6";
import { PiRecycleBold } from "react-icons/pi";
import { FaStar, FaStarHalf } from "react-icons/fa";
import RelatedProducts from "../modules/ProductDeatils/views/RelatedProducts";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.product);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedDetails, setSelectedDetails] = useState({
    color: "",
    size: "",
    quantity: 0,
  });

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (selectedProduct?.images?.length) {
      setSelectedImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  if (!selectedProduct) {
    return <NotFound />;
  }

  function getStarCounts(ratings) {
    let avgRatings =
      ratings.reduce((acc, curr) => (acc += curr.rating), 0) / ratings.length ||
      0;

    let full = Math.floor(avgRatings);
    let half = avgRatings - full > 0 ? 1 : 0;
    let empty = Math.floor(5 - avgRatings);

    return { full, half, empty };
  }

  const { full, half, empty } = getStarCounts(selectedProduct.ratings);


  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-14 xl:py-20">
      <h4 className="flex gap-x-3 text-gray-600 mb-10">
        <Link to="/account">Account</Link>/
        <Link to="/">{selectedProduct.category}</Link>/
        <Link to={`/products/${selectedProduct._id}`} className="text-black">
          {selectedProduct.name}
        </Link>
      </h4>
      
      <div className="flex flex-wrap gap-x-32 gap-y-10">
        <nav id="images&image" className="flex gap-10">
          <ul className="space-y-5">
            {selectedProduct.images &&
              selectedProduct.images.length > 0 &&
              selectedProduct.images.map((image, index) => (
                <li
                  key={image.url}
                  className={`size-28 ${image.url === selectedImage ? "outline-2 outline-red-600" : ""}`}
                  onClick={() => setSelectedImage(image.url)}
                >
                  <img
                    key={index}
                    className="object-cover"
                    src={image.url}
                    alt={image.alt}
                  />
                </li>
              ))}
          </ul>
          <img
            className="max-w-xl"
            src={selectedImage}
            alt={selectedProduct.name}
          />
          
        </nav>
        <nav className="space-y-4 grow">
          <h5 className="text-3xl font-semibold">{selectedProduct.name}</h5>

     <div className="flex gap-3 items-center">
      <div className="flex gap-x-1">
        {full > 0 && Array.from({ length: full }).map((_, i) => (
          <FaStar key={`full-${i}`} className="size-4 text-yellow-400" />
        ))}

        {half > 0 &&
          Array.from({ length: half }).map((_, i) => (
            <FaStarHalf key={`half-${i}`} className="size-4 text-yellow-400" />
          ))}
        {Array.from({ length: empty }).map((_, i) => (
          <FaStar key={`empty-${i}`} className="size-4 text-gray-300" />
        ))}
      </div>
      <span className="inline-block text-gray-500">
        ({selectedProduct.ratings.length} Reviews)
      </span>
<span className="text-gray-500">|</span>
      {selectedProduct.quantity <= 0 && <span className="text-red-600/60">Out of Stock</span>}
      {selectedProduct.quantity > 0 && selectedProduct.quantity <= 30 && <span className="text-yellow-600/60">Low Stock</span>}
      {selectedProduct.quantity > 30 && <span className="text-green-600/60">In Stock</span>}
     </div>

          <h6 className="text-2xl">${selectedProduct.price}</h6>

          <p className="max-w-xl">{selectedProduct.description}</p>

          <div className="border-b-4 max-w-xl  border-gray-300"></div>

          <div className="flex gap-x-8">
            <span className="text-lg">Colors:</span>
            <div className="flex gap-3">
              {selectedProduct?.colors?.map((color) => (
                <span
                  className={`size-7 border border-gray-200 rounded-full inline-block ${selectedDetails.color === color ? "outline-2 outline-black" : ""}`}
                  onClick={() =>
                    setSelectedDetails({ ...selectedDetails, color })
                  }
                  key={color}
                  style={{ backgroundColor: color.toLowerCase() }}
                ></span>
              ))}
            </div>
          </div>

          <div className="flex gap-x-8">
            <span className="text-lg">Sizes:</span>
            <div className="flex gap-3">
              {selectedProduct?.sizes?.map((size) => (
                <span
                  className={`h-9 rounded w-8 text-center border border-gray-300 inline-block ${selectedDetails.size === size ? "bg-red-600/70 text-white" : ""}`}
                  onClick={() =>
                    setSelectedDetails({ ...selectedDetails, size })
                  }
                  key={size}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <nav className="flex border rounded">
              <button
                disabled={selectedDetails.quantity < 1}
                onClick={() =>
                  setSelectedDetails((prev) => ({
                    ...prev,
                    quantity: prev.quantity - 1,
                  }))
                }
                className="border-r p-1.5 rounded-l"
              >
                -
              </button>
              <span className="inline-block px-5.5 text-xl py-1">
                {selectedDetails.quantity}
              </span>
              <button
                className="text-white p-1.5 rounded-r bg-red-600/70"
                onClick={() =>
                  setSelectedDetails((prev) => ({
                    ...prev,
                    quantity: prev.quantity + 1,
                  }))
                }
              >
                +
              </button>
            </nav>
            <button className="text-white py-1 px-8 rounded border border-gray-100 bg-red-600/80 cursor-pointer">
              Buy Now
            </button>
            <button className="p-1 rounded border border-gray-400">
              <CiHeart className="size-6" />
            </button>
          </div>

          <div className="max-w-xl rounded border border-gray-400">
            <div className="flex items-center gap-4 px-3 py-4">
              <FaTruckFast className="size-8.5" />
              <div className="space-y-4">
                <p className="text-lg">Free Delivery</p>
                <p className="text-sm underline">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="w-full border-b border-gray-400"></div>

            <div className="flex items-center gap-4 px-3 py-6">
              <PiRecycleBold className="size-8.5" />
              <div className="space-y-4">
                <p className="text-lg">Return Delivery</p>
                <p className="text-sm ">
                  Free 30 Days Returns.{" "}
                  <span className="underline">Details</span>
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
