"use client";

import { useState } from "react";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'RECIPIENT',
    profile_picture: null,
    contact_info: '',
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
    const url = isRegister ? `${process.env.NEXT_PUBLIC_API_URL}/register/` : `${process.env.NEXT_PUBLIC_API_URL}/login/`;
    const method = 'POST';
    const body = new FormData();

    for (const key in formData) {
      body.append(key, formData[key]);
    }

    console.log('Submitting form to:', url);
    console.log('Form data:', formData);

    try {
      const response = await fetch(url, {
        method,
        body,
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        alert(isRegister ? 'Registration successful!' : 'Login successful!');
        if (!isRegister) {
          // Save tokens or handle login success
          console.log('Access Token:', data.access);
          console.log('Refresh Token:', data.refresh);
        }
      } else {
        alert(data.error || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white md:flex-row">
      {/* Left Section: Vector Image */}
      <div className="w-full p-6 text-center md:w-1/2 md:block">
        {/* Vector Image */}
        <img
          src="/vector.jpeg" 
          alt="Kindness Illustration"
          className="w-3/4 mx-auto md:w-full lg:w-full xl:w-full rounded-lg"
        />
      </div>

      {/* Right Section: Auth Form with Header */}
      <div className="w-full max-w-md p-6 text-center md:w-1/2">
        {/* App Name */}
        <h1 className="mb-4 text-3xl font-extrabold text-pink-500 md:text-4xl lg:text-5xl">SHAREKINDNESS</h1>
        {/* Adage */}
        <p className="mb-8 text-lg italic text-gray-300">
          “Small acts of kindness create big ripples of change.”
        </p>

        {/* Header */}
        <h2 className="mb-4 text-3xl font-bold text-center">
          {isRegister ? "Create an Account" : "Sign In"}
        </h2>
        <p className="mb-6 text-center text-gray-400">
          {isRegister ? "Already have an account? " : "New user? "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-pink-500 hover:underline"
          >
            {isRegister ? "Sign In" : "Create an account"}
          </button>
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username (Register only) */}
          {isRegister && (
            <div>
              <label
                htmlFor="username"
                className="block mb-1 text-sm text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full px-4 py-2 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                onChange={handleChange}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              onChange={handleChange}
            />
          </div>

          {/* Role (Register only) */}
          {isRegister && (
            <div>
              <label
                htmlFor="role"
                className="block mb-1 text-sm text-gray-300"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                className="w-full px-4 py-2 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                onChange={handleChange}
              >
                <option value="DONOR">Donor</option>
                <option value="RECIPIENT">Recipient</option>
              </select>
            </div>
          )}

          {/* Profile Picture (Register only) */}
          {isRegister && (
            <div>
              <label
                htmlFor="profile_picture"
                className="block mb-1 text-sm text-gray-300"
              >
                Profile Picture
              </label>
              <input
                type="file"
                id="profile_picture"
                name="profile_picture"
                className="w-full px-4 py-2 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                onChange={handleChange}
              />
            </div>
          )}

          {/* Contact Info (Register only) */}
          {isRegister && (
            <div>
              <label
                htmlFor="contact_info"
                className="block mb-1 text-sm text-gray-300"
              >
                Contact Info
              </label>
              <textarea
                id="contact_info"
                name="contact_info"
                rows="3"
                className="w-full px-4 py-2 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                onChange={handleChange}
              ></textarea>
            </div>
          )}

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-pink-500 rounded-full hover:bg-pink-600 transition duration-200"
          >
            {isRegister ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Forgot Password */}
        {!isRegister && (
          <p className="mt-4 text-center text-gray-400">
            Forgot Password?{" "}
            <button className="text-pink-500 hover:underline">
              Click here
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
