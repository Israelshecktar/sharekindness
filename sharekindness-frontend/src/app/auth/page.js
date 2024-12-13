"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
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
      ? `${process.env.NEXT_PUBLIC_API_URL}/register`
      : `${process.env.NEXT_PUBLIC_API_URL}/login`;

    const body = new FormData();
    Object.keys(formData).forEach((key) => {
      body.append(key, formData[key]);
    });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(isRegister ? "Registration successful!" : "Login successful!");
        if (isRegister) setIsRegister(false);
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white md:flex-row">
      <ToastContainer />

      {/* Left Section: Vector Image */}
      <div className="w-full p-6 text-center md:w-1/2">
        <img
          src="/vector.jpeg"
          alt="Kindness Illustration"
          className="w-3/4 mx-auto rounded-lg md:w-full"
        />
      </div>

      {/* Right Section: Auth Form */}
      <div className="w-full max-w-md p-6 text-center md:w-1/2">
        <h1 className="mb-4 text-3xl font-extrabold text-pink-500">SHAREKINDNESS</h1>
        <p className="mb-8 text-lg italic text-gray-300">
          “Small acts of kindness create big ripples of change.”
        </p>

        <h2 className="mb-4 text-3xl font-bold">{isRegister ? "Create an Account" : "Sign In"}</h2>
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
              className="w-full px-4 py-2 bg-white text-gray-900 rounded-full focus:ring-2 focus:ring-pink-500"
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-2 bg-white text-gray-900 rounded-full focus:ring-2 focus:ring-pink-500"
            onChange={handleChange}
          />

          {isRegister && (
            <>
              <select
                name="role"
                required
                className="w-full px-4 py-2 bg-white text-gray-900 rounded-full focus:ring-2 focus:ring-pink-500"
                onChange={handleChange}
              >
                <option value="DONOR">Donor</option>
                <option value="RECIPIENT">Recipient</option>
              </select>

              <input
                type="file"
                name="profile_picture"
                className="w-full px-4 py-2 bg-white text-gray-900 rounded-full focus:ring-2 focus:ring-pink-500"
                onChange={handleChange}
              />

              <textarea
                name="contact_info"
                placeholder="Contact Info"
                rows="3"
                className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-pink-500"
                onChange={handleChange}
              ></textarea>
            </>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 bg-white text-gray-900 rounded-full focus:ring-2 focus:ring-pink-500"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-pink-500 rounded-full hover:bg-pink-600"
          >
            {isRegister ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {!isRegister && (
          <p className="mt-4 text-gray-400">
            Forgot Password? <button className="text-pink-500 hover:underline">Click here</button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
