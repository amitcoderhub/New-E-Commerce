import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import ProductDetails from '../pages/ProductDetails';
import NotFound from '../pages/NotFound';
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Collections from '../pages/Collections';
import Offers from '../pages/Offers';
import Wishlist from '../pages/Wishlist';
import ProductDetail from '../pages/ProductDetails'; // Adjust path as needed



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
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default AppRouter;
