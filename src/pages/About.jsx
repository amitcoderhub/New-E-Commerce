const About = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-8">About Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src="https://i.pinimg.com/736x/af/43/26/af432697d0d5d2a274114d7e6c07efd3.jpg"
            alt="About Us"
            className="rounded-lg shadow-md"
          />
        </div>

        <div>
          <p className="text-gray-700 text-lg mb-4">
            Welcome to <span className="font-semibold text-green-600">GymFuel</span> – your trusted destination for premium gym supplements!
          </p>

          <p className="text-gray-700 text-lg mb-4">
            We provide high-quality whey protein, creatine, pre-workouts, and recovery blends to help you reach your fitness goals faster and smarter.
          </p>

          <p className="text-gray-700 text-lg mb-4">
            Our mission is simple: <span className="italic">to fuel your fitness journey</span> with products you can trust. We carefully curate each product from top brands to ensure quality, performance, and results.
          </p>

          <p className="text-gray-700 text-lg">
            Whether you're a beginner or a pro athlete, GymFuel has something for you. Explore our collections and take your training to the next level.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
