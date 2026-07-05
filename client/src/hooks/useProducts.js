import { useDispatch, useSelector } from "react-redux";
import { 
  fetchFlashProduct, 
  fetchBestSellingProducts, 
  fetchExploreProducts, 
  fetchAllProducts, 
  fetchProductDetails, 
  fetchRelatedProducts,
  setFilter
} from "../redux/slices/productSlice";

export default function useProducts() {
  const productState = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const fetchFlashProductUtil = async () => {
    return dispatch(fetchFlashProduct());
  };

  const fetchBestSellingProductsUtil = async () => {
    return dispatch(fetchBestSellingProducts());
  };

  const fetchExploreProductsUtil = async () => {
    return dispatch(fetchExploreProducts());
  };

  const fetchAllProductsUtil = async (params) => {
    return dispatch(fetchAllProducts(params));
  };

  const fetchProductDetailsUtil = async (productId) => {
    return dispatch(fetchProductDetails(productId));
  };

  const fetchRelatedProductsUtil = async (category) => {
    return dispatch(fetchRelatedProducts(category));
  };

  const setFilterUtil = (filter) => {
    dispatch(setFilter(filter));
  };

  return { 
    ...productState,
    fetchFlashProductUtil, 
    fetchBestSellingProductsUtil, 
    fetchExploreProductsUtil, 
    fetchAllProductsUtil, 
    fetchProductDetailsUtil, 
    fetchRelatedProductsUtil,
    setFilterUtil
  };
}
