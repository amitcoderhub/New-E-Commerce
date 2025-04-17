import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import NotFound from "../pages/NotFound";
import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Collections from "../pages/Collections";
import Offers from "../pages/Offers";
import Wishlist from "../pages/Wishlist";
import RetailerLogin from "../pages/RetailerLogin";
import RetailerRegister from "../pages/RetailerRegister";
import CustomerLogin from "../pages/CustomerLogin";
import CustomerRegister from "../pages/CustomerRegister";


import Payment from "../pages/Payment";
import RetailerDashboard from "../pages/RetailerDashboard";

const AppRouter = () => {
  return (
    <Router>
      <Header /> {/* ✅ Removed searchQuery & setSearchQuery */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/retailer-login" element={<RetailerLogin />} />
          <Route path="/retailer-register" element={<RetailerRegister />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/customer-register" element={<CustomerRegister />} />
          <Route path="/retailer-dashboard" element={<RetailerDashboard />} />

        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default AppRouter;
