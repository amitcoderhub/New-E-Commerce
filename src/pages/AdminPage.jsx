// src/pages/AdminPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    category: 'protein',
    price: '',
    flavor: '',
    weight: '',
    image: '',
    proteinPerServing: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the product data to the server
    // For now, let's log it and add it locally
    console.log('Product added:', product);
    // Redirect to the products page or show a success message
    navigate('/products');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        >
          <option value="protein">Protein</option>
          <option value="pre-workout">Pre-Workout</option>
          <option value="creatine">Creatine</option>
          <option value="l-carnitine">L-Carnitine</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="flavor"
          placeholder="Flavor"
          value={product.flavor}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="weight"
          placeholder="Weight"
          value={product.weight}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="proteinPerServing"
          placeholder="Protein per Serving"
          value={product.proteinPerServing}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mt-4"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
