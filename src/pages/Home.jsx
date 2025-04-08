import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import productsData from "../data/products.json";
import { useWishlist } from "../contexts/WishlistContext";

const Home = () => {
  const { addToCart, cartItems } = useCart();
  const { supplements, staticProducts } = productsData;
  const duplicatedSupplements = [...supplements, ...supplements];
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 animate-fade-in-up">
        Premium Protein Supplements
      </h1>

      {/* Infinite Scrolling Section */}
      <div className="relative overflow-hidden py-8">
        <div
          className="flex w-max animate-infinite-scroll"
          style={{ animation: "infinite-scroll 25s linear infinite" }}
        >
          {duplicatedSupplements.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="flex-shrink-0 h-[400px] w-[300px] sm:w-[350px] mx-4 relative group cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="h-full w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-2/3 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {product.brand}
                  </h3>
                  <p className="text-sm text-gray-600">{product.name}</p>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">
                      {product.flavor} • {product.weight}
                    </p>
                    <p className="text-xs text-blue-600 font-semibold">
                      {product.proteinPerServing} Protein/Serving
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Static Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {staticProducts.map((product) => {
            const isWishlisted = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 sm:h-60 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800">
                    {product.brand}
                  </h3>
                  <p className="text-sm text-gray-600">{product.name}</p>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">
                      {product.flavor} • {product.weight}
                    </p>
                    <p className="text-xs text-blue-600 font-semibold">
                      {product.proteinPerServing} Protein/Serving
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:justify-between items-center gap-2">
                    <span className="text-lg font-bold text-gray-900 text-center sm:text-left">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      Add to Cart
                    </button>

                    <div className="flex items-center gap-4">
                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          isWishlisted
                            ? removeFromWishlist(product.id)
                            : addToWishlist(product);
                        }}
                        className="text-2xl transition-transform hover:scale-110"
                        title={
                          isWishlisted
                            ? "Remove from Wishlist"
                            : "Add to Wishlist"
                        }
                      >
                        {isWishlisted ? "❤️" : "🤍"}
                      </button>

                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="text-2xl transition-transform hover:scale-110"
                        title="Add to Cart"
                      >
                        🛒
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom styles for animation */}
      <style>
        {`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Home;

// import { useCart } from "../contexts/CartContext";
// import productsData from "../data/products.json";
// import { useWishlist } from '../contexts/WishlistContext';

// const Home = () => {
//   const { addToCart } = useCart();
//   const { supplements, staticProducts } = productsData;
//   const duplicatedSupplements = [...supplements, ...supplements];
//   const { addToWishlist } = useWishlist();

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 animate-fade-in-up">
//         Premium Protein Supplements
//       </h1>

//       {/* Infinite Scrolling Section */}
//       <div className="relative overflow-hidden py-8">
//         <div
//           className="flex w-max animate-infinite-scroll"
//           style={{ animation: "infinite-scroll 25s linear infinite" }}
//         >
//           {duplicatedSupplements.map((product, index) => (
//             <div
//               key={`${product.id}-${index}`}
//               className="flex-shrink-0 h-[400px] w-[300px] sm:w-[350px] mx-4 relative group"
//             >
//               <div className="h-full w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="h-2/3 w-full object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-bold text-gray-800">
//                     {product.brand}
//                   </h3>
//                   <p className="text-sm text-gray-600">{product.name}</p>
//                   <div className="mt-2">
//                     <p className="text-xs text-gray-500">
//                       {product.flavor} • {product.weight}
//                     </p>
//                     <p className="text-xs text-blue-600 font-semibold">
//                       {product.proteinPerServing} Protein/Serving
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Static Products Section */}
//       <div className="mt-16">
//         <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
//           Featured Products
//         </h2>

//         <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//           {staticProducts.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-52 sm:h-60 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-base sm:text-lg font-bold text-gray-800">
//                   {product.brand}
//                 </h3>
//                 <p className="text-sm text-gray-600">{product.name}</p>
//                 <div className="mt-2">
//                   <p className="text-xs text-gray-500">
//                     {product.flavor} • {product.weight}
//                   </p>
//                   <p className="text-xs text-blue-600 font-semibold">
//                     {product.proteinPerServing} Protein/Serving
//                   </p>
//                 </div>

//                 <div className="mt-4 flex flex-col sm:flex-row sm:justify-between items-center gap-2">
//                   <span className="text-lg font-bold text-gray-900 text-center sm:text-left">
//                     ${product.price}
//                   </span>

//                   <button
//                     onClick={() => addToCart(product)}
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
//                   >
//                     Add to Cart
//                   </button>

//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={() => addToWishlist(product)}
//                       className="text-xl hover:scale-110 transition-transform"
//                       title="Add to Wishlist"
//                     >
//                       ❤️
//                     </button>
//                     <button
//                       onClick={() => addToCart(product)}
//                       className="text-xl hover:scale-110 transition-transform"
//                       title="Add to Cart"
//                     >
//                       🛒
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Custom styles for animation */}
//       <style>
//         {`
//           @keyframes infinite-scroll {
//             0% { transform: translateX(0); }
//             100% { transform: translateX(-50%); }
//           }
//           @keyframes fade-in-up {
//             0% { opacity: 0; transform: translateY(20px); }
//             100% { opacity: 1; transform: translateY(0); }
//           }
//           .animate-fade-in-up {
//             animation: fade-in-up 1s ease-out forwards;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Home;
