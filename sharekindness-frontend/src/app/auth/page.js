"use client"; // Ensure this is present at the top

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for app directory
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackgroundWrapper from "../components/BackgroundWrapper";

const AuthPage = () => {
  const router = useRouter(); // Initialize router
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    role: "RECIPIENT",
    profile_picture: null,
    contact_info: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegister
      ? `${process.env.NEXT_PUBLIC_API_URL}api/register/`
      : `${process.env.NEXT_PUBLIC_API_URL}api/login/`;

    const body = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) body.append(key, formData[key]);
    });

    try {
      const response = await fetch(endpoint, { method: "POST", body });
      const data = await response.json();

      if (response.ok) {
        toast.success(isRegister ? data.message : "Login successful!");

        if (isRegister) {
          setIsRegister(false); // Reset to login after successful registration
        } else {
          // Store access and refresh tokens securely
          localStorage.setItem("accessToken", data.access);
          localStorage.setItem("refreshToken", data.refresh);

          // Redirect to the dashboard
          router.push("/dashboard");
        }
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <BackgroundWrapper>
      <div className="w-full max-w-md px-6 py-8 text-center">
        <ToastContainer />
        <h1 className="mb-4 text-3xl font-extrabold text-pink-500">SHAREKINDNESS</h1>
        <p className="mb-6 text-lg italic text-gray-300">
          “Small acts of kindness create big ripples of change.”
        </p>

        <h2 className="mb-4 text-3xl font-bold text-white">
          {isRegister ? "Create an Account" : "Sign In"}
        </h2>
        <p className="mb-6 text-gray-400">
          {isRegister ? "Already have an account? " : "New user? "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-pink-500 hover:underline"
          >
            {isRegister ? "Sign In" : "Create an account"}
          </button>
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              className="w-full px-4 py-2 text-gray-900 bg-white rounded-full focus:ring-2 focus:ring-pink-500"
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-2 text-gray-900 bg-white rounded-full focus:ring-2 focus:ring-pink-500"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 text-gray-900 bg-white rounded-full focus:ring-2 focus:ring-pink-500"
            onChange={handleChange}
          />

          {isRegister && (
            <>
              <select
                name="role"
                required
                className="w-full px-4 py-2 text-gray-900 bg-white rounded-full focus:ring-2 focus:ring-pink-500"
                onChange={handleChange}
              >
                <option value="DONOR">Donor</option>
                <option value="RECIPIENT">Recipient</option>
              </select>

              <input
                type="file"
                name="profile_picture"
                className="w-full px-4 py-2 text-gray-900 bg-white rounded-full focus:ring-2 focus:ring-pink-500"
                onChange={handleChange}
              />

              <textarea
                name="contact_info"
                placeholder="Contact Info"
                rows="3"
                className="w-full px-4 py-2 text-gray-900 bg-white rounded-lg focus:ring-2 focus:ring-pink-500"
                onChange={handleChange}
              ></textarea>
            </>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-pink-500 rounded-full hover:bg-pink-600"
          >
            {isRegister ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {!isRegister && (
          <p className="mt-4 text-gray-400">
            Forgot Password?{" "}
            <button className="text-pink-500 hover:underline">Click here</button>
          </p>
        )}
      </div>
    </BackgroundWrapper>
  );
};

export default AuthPage;
