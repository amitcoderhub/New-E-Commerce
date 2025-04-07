import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems } = useCart();

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
              className="border rounded-lg p-4 flex justify-between items-center shadow"
            >
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              {/* Optional: Add Quantity/Remove */}
            </div>
          ))}

          {/* Total and Checkout */}
          <div className="mt-6 border-t pt-4 text-right">
            <p className="text-xl font-bold">
              Total: ₹
              {cartItems.reduce((total, item) => total + item.price, 0)}
            </p>
            <Link to="/checkout">
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
