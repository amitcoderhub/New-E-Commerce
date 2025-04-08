import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useState } from "react";
import productsData from "../data/products.json";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Collections", path: "/collections" },
    { name: "Offers", path: "/offers" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const products =
    Array.isArray(productsData.supplements) &&
    Array.isArray(productsData.staticProducts)
      ? [...productsData.supplements, ...productsData.staticProducts]
      : [];

  const filteredProducts = searchQuery.trim()
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="bg-blue-600 text-white p-4 sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto flex flex-wrap justify-between items-center gap-4">
        {/* Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="text-2xl font-bold">
          Amit's <span className="text-blue-900"> Muscle Mart </span>
          </Link>
          <button
            className="md:hidden block"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row w-full md:w-auto gap-4 md:items-center`}
        >
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block md:inline hover:text-green-500 border-b-2 md:border-10 pb-1 md:pb-0 ${
                  isActive
                    ? "text-white md:border-white font-semibold"
                    : "md:border-transparent"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Search, Wishlist, Cart */}
        <div className="flex  md:flex-row items-stretch md:items-center gap-3 mt-3 md:mt-0 w-full md:w-auto relative">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <div className="absolute bg-white text-black w-full mt-1 max-h-60 overflow-y-auto rounded shadow-md z-50">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 hover:bg-blue-100 cursor-pointer border-b text-sm"
                      onClick={() => {
                        navigate(`/product/${item.id}`);
                        setSearchQuery("");
                        setMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-600 text-sm">
                    No products found.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative hover:text-blue-200 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative hover:text-blue-200 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
