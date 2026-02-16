import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router";

import UserLayout from "./components/Layouts/UserLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import { useSelector } from "react-redux";
import Account from "./pages/Account";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  const { loading, user } = useSelector((state) => state.auth);


  return (
    <>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={user? <Account />: <Navigate to="/login"/>} />
          <Route path="/about" element={<About />}/>
          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
