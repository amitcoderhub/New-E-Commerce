import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RetailerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    const savedEmail = localStorage.getItem("retailerEmail");
    const savedPassword = localStorage.getItem("retailerPassword");
  
    if (email === savedEmail && password === savedPassword) {
      localStorage.setItem("retailerLoggedIn", true);
      navigate("/retailer-dashboard");
    } else {
      alert("You are not registered! Please register first.");
      navigate("/retailer-register");
    }
  };
  

  return (
    <div className="container mx-auto max-w-md p-4">
      <h2 className="text-2xl font-semibold mb-4">Retailer Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <span>Don't have an account?</span>
        <button
          onClick={() => navigate("/retailer-register")}
          className="text-blue-600 font-medium"
        >
          Register here
        </button>
      </div>
    </div>
  );
};

export default RetailerLogin;
