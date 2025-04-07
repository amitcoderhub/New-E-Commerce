import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import productsData from '../data/products.json';

const Collections = () => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');

  const allProducts = [
    ...productsData.supplements,
    ...productsData.staticProducts
  ];

  const categories = ['Protein', 'Pre-Workout', 'Recovery', 'Creatine', 'L-Carnitine', 'Others'];

  const getCategoryProducts = (category) => {
    return allProducts.filter(product => {
      const name = product.name.toLowerCase();
      const brand = product.brand.toLowerCase();
      const flavor = product.flavor.toLowerCase();
      const search = searchQuery.toLowerCase();

      const matchesSearch =
        name.includes(search) || brand.includes(search) || flavor.includes(search);

      const inCategory =
        (category === 'Protein' && name.includes('protein')) ||
        (category === 'Pre-Workout' && name.includes('pre-workout')) ||
        (category === 'Recovery' && (name.includes('recovery') || name.includes('bcaa'))) ||
        (category === 'Creatine' && name.includes('creatine')) ||
        (category === 'L-Carnitine' && name.includes('carnitine')) ||
        (category === 'Others' &&
          !['protein', 'pre-workout', 'recovery', 'creatine', 'carnitine'].some(c => name.includes(c)));

      return matchesSearch && inCategory;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Product Collections</h1>

      <input
        type="text"
        placeholder="Search products..."
        className="w-full mb-6 px-4 py-2 border rounded-lg"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {categories.map(category => {
        const products = getCategoryProducts(category);
        if (products.length === 0) return null;

        return (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{category}</h2>
            <div className="flex overflow-x-auto space-x-4 pb-2">
              {products.map(product => (
                <div
                key={product.id}
                className="min-w-[250px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow relative"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              
                <div className="p-4">
                  <h3 className="font-bold text-lg">{product.brand}</h3>
                  <p className="text-sm text-gray-600">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.flavor} • {product.weight}</p>
                  <p className="text-sm font-semibold text-blue-600">{product.proteinPerServing} Protein/Serving</p>
              
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
              
                    <div className="flex items-center space-x-2">
                      {/* ❤️ Wishlist Button */}
                      <button
                        onClick={() => addToWishlist(product)}
                        className="text-red-500 hover:scale-110 transition-transform text-xl"
                        title="Add to Wishlist"
                      >
                        ❤️
                      </button>
              
                      {/* 🛒 Cart Button */}
                      <button
                        onClick={() => addToCart(product)}
                        className="text-red-500 hover:scale-110 transition-transform text-xl"
                        title="Add to Wishlist"
                      >
                        🛒
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 text-sm rounded"
                      >
                        Add
                      </button>
                    </div>
                  </div>
              
                  {/* View Details */}
                  <Link
                    to={`/products/${product.id}`}
                    className=" mt-2 w-full text-center text-sm border border-blue-600 text-blue-600 rounded py-1 hover:bg-blue-50 transition block mt-2 text-sm text-blue-600 hover:underline text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              
              ))}
            </div>
          </div>
        );
      })}

      {categories.every(cat => getCategoryProducts(cat).length === 0) && (
        <div className="text-center text-gray-500 text-xl mt-8">
          No products found matching your search
        </div>
      )}
    </div>
  );
};

export default Collections;
