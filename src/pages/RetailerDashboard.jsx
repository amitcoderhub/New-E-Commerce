import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RetailerDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    company: "",
    category: "",
    type: "", // supplement or product
    price: "",
    image: "",
  });
  const [postedProducts, setPostedProducts] = useState([]);
  const navigate = useNavigate();

  // Load posted products from localStorage when the component mounts
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("customProducts")) || [];
    setPostedProducts(storedProducts);
  }, []);

  const handleHomeClick = () => {
    navigate("/");
    window.location.reload();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      id: Date.now(),
    };
    const updatedProducts = [...postedProducts, newProduct];

    // Save new product to localStorage
    localStorage.setItem("customProducts", JSON.stringify(updatedProducts));

    // Update the state with the new products list
    setPostedProducts(updatedProducts);

    // Reset form data and close form
    setFormData({
      name: "",
      brand: "",
      company: "",
      category: "",
      type: "",
      price: "",
      image: "",
    });
    setShowForm(false);

    alert("Product posted successfully!");
  };

  const handleRemoveProduct = (productId) => {
    const updatedProducts = postedProducts.filter(
      (product) => product.id !== productId
    );

    // Update localStorage
    localStorage.setItem("customProducts", JSON.stringify(updatedProducts));

    // Update state with the new products list
    setPostedProducts(updatedProducts);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Retailer Dashboard</h2>
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleHomeClick}
          className="bg-blue-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          Home
        </button>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          New Product Post
        </button>
      </div>

      {/* Product posting form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 max-w-xl border p-4 rounded shadow-md bg-white"
        >
          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="supplement">Supplement</option>
            <option value="product">Product</option>
          </select>
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Post Product
          </button>
        </form>
      )}

      {/* Display posted products */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Posted Products</h3>
        {postedProducts.length === 0 ? (
          <p>No products posted yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {postedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-52 object-cover rounded-t-lg"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h3 className="font-bold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600">{product.brand}</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-sm text-blue-600 font-semibold">{product.type}</p>
                  <p className="text-lg font-bold text-gray-900">${product.price}</p>
                  <div className="mt-3">
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="text-red-600 hover:text-red-800 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Remove Product
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RetailerDashboard;
