import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Contact Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="mb-4 text-gray-700">Feel free to reach out to us through this form or via our contact info below.</p>
            
            <ul className="text-gray-600 space-y-2">
              <li><strong>Email:</strong> support@gymstore.com</li>
              <li><strong>Phone:</strong> +91 xxxxxxxx22</li>
              <li><strong>Address:</strong> 123 Gym Lane, Fit City, IN</li>
            </ul>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Follow us:</h4>
              <div className="flex gap-4">
                <a href="#" className="text-blue-600 hover:underline">Facebook</a>
                <a href="#" className="text-blue-600 hover:underline">Instagram</a>
                <a href="#" className="text-blue-600 hover:underline">Twitter</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
