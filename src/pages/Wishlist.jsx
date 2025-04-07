import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{product.brand}</h2>
                <p className="text-gray-600">{product.name}</p>
                <p className="text-sm text-gray-500">{product.flavor} • {product.weight}</p>
                <p className="text-blue-600 font-semibold mt-1">${product.price}</p>

                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/products/${product.id}`}
                    className="text-sm text-green-600 hover:underline"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
