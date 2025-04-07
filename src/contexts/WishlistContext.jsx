import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // ✅ Add product to wishlist (allow duplicates)
  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => [...prevItems, product]);
  };

  // ✅ Remove one instance of product by ID
  const removeFromWishlist = (id) => {
    setWishlistItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        const newItems = [...prevItems];
        newItems.splice(index, 1); // remove only one occurrence
        return newItems;
      }
      return prevItems;
    });
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// ✅ Custom hook for using wishlist context
export const useWishlist = () => useContext(WishlistContext);
