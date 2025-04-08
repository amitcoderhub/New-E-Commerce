import React from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-gray-600 text-lg">Your cart is empty.</div>
      ) : (
        <div className="grid gap-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex gap-4 items-center shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                {item.brand && (
                  <p className="text-gray-500 text-sm">Brand: {item.brand}</p>
                )}
                {item.weight && (
                  <p className="text-gray-500 text-sm">Weight: {item.weight}</p>
                )}
                {item.flavor && (
                  <p className="text-gray-500 text-sm">Flavor: {item.flavor}</p>
                )}
                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end gap-10">
                <div className="text-lg font-bold text-green-700">
                  ₹{item.price * item.quantity}
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex items-center gap-1 text-red-600 text-sm font-medium hover:scale-105 transition-transform"
                  title="Remove from Cart"
                >
                  🗑️ <span>Remove</span>
                </button>
              </div>
            </div>
          ))}

          {/* Total and Checkout */}
          <div className="mt-6 border-t pt-4 text-right">
            <p className="text-xl font-bold">
              Total: ₹
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </p>
            <Link to="/payment">
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
