import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router";

import UserLayout from "./components/Layouts/UserLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import CartDetails from "./pages/CartDetails";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import ProtectedRoute from "./AuthRoutes/ProtectedRoute";
import LoginRoute from "./AuthRoutes/LoginRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<LoginRoute><Signup /></LoginRoute>} />
          <Route path="/login" element={<LoginRoute><Login /></LoginRoute>} />
          <Route path="contact" element={ <Contact />} />
          <Route path="account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="about" element={<About />} />
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="cart" element={<CartDetails />} />
          <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
