import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    // Save email & password in localStorage
    localStorage.setItem("customerEmail", email);
    localStorage.setItem("customerPassword", password);
    localStorage.setItem("customerLoggedIn", true);
    
    navigate("/customer-dashboard");
  };
  

  return (
    <div className="container mx-auto max-w-md p-4">
      <h2 className="text-2xl font-semibold mb-4">Customer Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
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

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Register
        </button>
      </form>

      <div className="mt-4 text-center">
        <span>Already have an account?</span>
        <button
          onClick={() => navigate("/customer-login")}
          className="text-blue-600 font-medium"
        >
          Login here
        </button>
      </div>
    </div>
  );
};

export default CustomerRegister;
