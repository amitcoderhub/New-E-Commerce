import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();


export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };
  

  const addToWishlist = (product) => {
    const exists = wishlistItems.find(item => item.id === product.id);
    if (!exists) {
      setWishlistItems(prev => [...prev, product]);
      console.log('Added to wishlist:', product);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist , removeFromWishlist}}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
