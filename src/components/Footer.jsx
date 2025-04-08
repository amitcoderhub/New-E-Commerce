import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Boxes, Gift, ShoppingBag } from 'lucide-react';

const Footer = () => {
  return (
    <>
      {/* Desktop Footer */}
      <footer className="hidden md:block bg-gray-800 text-white p-6">
        <div className="container mx-auto text-center">
          <p>
            © 2025 E-Commerce Store <span className="text-blue-400 font-semibold">Amit's Muscle Mart</span>. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Mobile Bottom Fixed Navbar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg md:hidden">
        <div className="flex justify-between items-center px-6 py-2 text-sm text-gray-700">
          <Link to="/" className="flex flex-col items-center hover:text-blue-600">
            <Home size={22} />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link to="/products" className="flex flex-col items-center hover:text-blue-600">
            <ShoppingBag size={22} />
            <span className="text-xs mt-1">Products</span>
          </Link>

          <Link to="/collections" className="flex flex-col items-center hover:text-blue-600">
            <Boxes size={22} />
            <span className="text-xs mt-1">Collections</span>
          </Link>

          <Link to="/offers" className="flex flex-col items-center hover:text-blue-600">
            <Gift size={22} />
            <span className="text-xs mt-1">Offers</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
