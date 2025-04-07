import { useParams } from 'react-router-dom';
import productsData from '../data/products.json';

const ProductDetail = () => {
  const { id } = useParams();

  const allProducts = [
    ...productsData.supplements,
    ...productsData.staticProducts
  ];

  const product = allProducts.find(item => item.id.toString() === id);

  if (!product) {
    return <div className="text-center text-red-500 text-xl mt-10">Product not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-96 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <h2 className="text-xl text-gray-700 mb-2">Brand: {product.brand}</h2>
          <p className="text-gray-600 mb-4">{product.description || 'No description available.'}</p>

          <ul className="mb-4 text-gray-600">
            <li><strong>Flavor:</strong> {product.flavor}</li>
            <li><strong>Weight:</strong> {product.weight}</li>
            <li><strong>Protein Per Serving:</strong> {product.proteinPerServing}</li>
          </ul>

          <div className="text-2xl font-bold mb-4">${product.price}</div>
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
