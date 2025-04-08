import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, wishlistItems, removeFromWishlist } = useWishlist();

  const allProducts = [
    ...productsData.supplements,
    ...productsData.staticProducts,
  ];

  const product = allProducts.find((item) => item.id.toString() === id);

  const relatedProducts = allProducts
    .filter(
      (item) =>
        item.id.toString() !== id &&
        (item.brand === product?.brand || item.flavor === product?.flavor)
    )
    .slice(0, 4);

  if (!product) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Product not found
      </div>
    );
  }

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-96 object-cover rounded-xl shadow-lg"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

          <div className="flex flex-wrap gap-3">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              Brand: {product.brand}
            </span>
            <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
              Flavor: {product.flavor}
            </span>
          </div>

          <p className="text-gray-700 mt-2">
            {product.description || 'No description available.'}
          </p>

          <ul className="text-gray-600 space-y-1 text-sm">
            <li><strong>Weight:</strong> {product.weight}</li>
            <li><strong>Protein Per Serving:</strong> {product.proteinPerServing}</li>
          </ul>

          <div className="text-3xl font-bold text-green-700 mt-4">₹{product.price}</div>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => addToCart(product)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              🛒 Add to Cart
            </button>

            <button
              onClick={() =>
                isInWishlist
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product)
              }
              className={`px-6 py-2 rounded-lg transition ${
                isInWishlist
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
              }`}
            >
              {isInWishlist ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">Related Products</h2>
        {relatedProducts.length === 0 ? (
          <p className="text-gray-600">No related products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => {
              const isRelatedInWishlist = wishlistItems.some(w => w.id === item.id);

              return (
                <div
                  key={item.id}
                  className="border rounded-xl p-4 hover:shadow-xl transition bg-white flex flex-col justify-between"
                >
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-40 w-full object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="text-green-600 font-bold mt-1">₹{item.price}</p>
                  </Link>

                  <div className="flex flex-col gap-2 mt-4">
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      🛒 Add to Cart
                    </button>

                    <button
                      onClick={() =>
                        isRelatedInWishlist
                          ? removeFromWishlist(item.id)
                          : addToWishlist(item)
                      }
                      className={`text-sm px-4 py-2 rounded-lg transition ${
                        isRelatedInWishlist
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                      }`}
                    >
                      {isRelatedInWishlist ? '❤️ Remove' : '🤍 Wishlist'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
