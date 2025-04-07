import { Link } from 'react-router-dom';

const offers = [
  {
    id: 1,
    title: "Buy 1 Get 1 Free!",
    description: "On select protein powders. Limited time only!",
    image: "https://i.pinimg.com/736x/5e/60/9b/5e609b76b8b9c06213b12b7aa10eb3e9.jpg",
  },
  {
    id: 2,
    title: "20% Off All Creatine",
    description: "Boost your performance with our premium creatine range.",
    image: "https://i.pinimg.com/736x/af/43/26/af432697d0d5d2a274114d7e6c07efd3.jpg",
  },
  {
    id: 3,
    title: "Free Shaker on Orders ₹999+",
    description: "Get a premium shaker absolutely free on your order!",
    image: "https://i.pinimg.com/736x/da/c4/0f/dac40f97e146c20a851d26249e34dead.jpg",
  },
];

const Offer = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        🎁 Special Offers Just for You
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{offer.title}</h3>
              <p className="text-gray-600 mb-4">{offer.description}</p>
              <Link
                to="/collections"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm transition duration-200"
              >
                🛍️ Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
