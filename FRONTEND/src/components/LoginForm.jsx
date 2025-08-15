import { useState } from "react";
import { loginUserAPI } from "../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";
import { useNavigate } from "@tanstack/react-router";

const LoginForm = ({ state }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await loginUserAPI(formData.email, formData.password);
      dispatch(loginSuccess(data.user));
      navigate({ to: "/dashboard" });
      state(false);
      setFormData("");
    } catch (err) {
      setError(err.message || "Login failed") ||
        setError("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
      <div className="text-center">
        <p className="text-sm text-gray-600 cursor-pointer">
          Don't have an account?{" "}
          <span
            onClick={() => state(false)}
            className="text-blue-600 hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
