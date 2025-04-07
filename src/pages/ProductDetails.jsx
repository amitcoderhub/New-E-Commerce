import { useParams } from 'react-router-dom';
import productsData from '../data/products.json';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Link } from 'react-router-dom';

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
    .slice(0, 4); // max 4 related items

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
          className="w-full md:w-1/2 h-96 object-cover rounded-xl shadow-md"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <h2 className="text-lg text-gray-700">Brand: {product.brand}</h2>
          <p className="text-gray-600">{product.description || 'No description available.'}</p>

          <ul className="text-gray-600">
            <li><strong>Flavor:</strong> {product.flavor}</li>
            <li><strong>Weight:</strong> {product.weight}</li>
            <li><strong>Protein Per Serving:</strong> {product.proteinPerServing}</li>
          </ul>

          <div className="text-2xl font-bold text-green-700">₹{product.price}</div>

          <div className="flex gap-4 mt-4">
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
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Related Products</h2>
        {relatedProducts.length === 0 ? (
          <p className="text-gray-600">No related products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className="border rounded-lg p-4 hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 w-full object-cover rounded mb-2"
                />
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.brand}</p>
                <p className="text-green-600 font-bold mt-1">₹{item.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
