import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import productsData from "../data/products.json";
import { useWishlist } from '../contexts/WishlistContext';

const Products = () => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const retailerProducts = JSON.parse(localStorage.getItem("customProducts")) || [];

    const combinedProducts = [
      ...productsData.supplements,
      ...productsData.staticProducts,
      ...retailerProducts,
    ];

    setAllProducts(combinedProducts);
  }, []);

  const categories = [
    "all",
    "protein",
    "pre-workout",
    "recovery",
    "creatine",
    "l-carnitine",
  ];

  const filteredProducts = allProducts.filter((product) => {
    const name = product.name?.toLowerCase() || "";
    const brand = product.brand?.toLowerCase() || "";
    const flavor = product.flavor?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      name.includes(query) || brand.includes(query) || flavor.includes(query);

    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "protein" && name.includes("protein")) ||
      (selectedCategory === "pre-workout" && name.includes("pre-workout")) ||
      (selectedCategory === "recovery" &&
        (name.includes("recovery") || name.includes("bcaa"))) ||
      (selectedCategory === "creatine" && name.includes("creatine")) ||
      (selectedCategory === "l-carnitine" && name.includes("carnitine"));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-4 py-8 max-w-screen-xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-blue-700">
        Our Products
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search for a supplement..."
          className="px-4 py-2 w-full md:w-1/2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap justify-center md:justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-sm rounded-md capitalize ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id || product.name}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 sm:h-52 object-cover rounded-t-lg"
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-800">
                    {product.brand}
                  </h3>
                  <p className="text-sm text-gray-600">{product.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {product.flavor} • {product.weight}
                  </p>
                  <p className="text-xs text-blue-600 font-semibold">
                    {product.proteinPerServing || "N/A"} Protein/Serving
                  </p>
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToWishlist(product)}
                      className="text-xl hover:scale-110 transition-transform"
                      title="Add to Wishlist"
                    >
                      ❤️
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="text-xl hover:scale-110 transition-transform"
                      title="Add to Cart"
                    >
                      🛒
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm transition"
                >
                  Add to Cart
                </button>

                <Link
                  to={`/products/${product.id || product.name}`}
                  className="mt-2 w-full text-center text-sm border border-blue-600 text-blue-600 rounded py-1 hover:bg-blue-50 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg mt-10">
          No products found matching your search or filter.
        </div>
      )}
    </div>
  );
};

export default Products;
