"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../utils/api"; // Import the centralized API handler
import statesAndCities from "../../utils/statesAndCities";

const AuthPage = () => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone_number: "",
    city: "",
    state: "",
    bio: "",
    profile_picture: null,
  });
  const [bioError, setBioError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "bio") {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > 50) {
        setBioError("Bio must not exceed 50 words.");
        return;
      } else {
        setBioError("");
      }
    }

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (bioError) {
      toast.error("Please fix the bio error before submitting.");
      return;
    }

    const endpoint = isRegister ? "api/register/" : "api/login/";
    const body = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) body.append(key, formData[key]);
    });

    try {
      // Use the centralized API handler for the request
      const response = await api.post(endpoint, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (isRegister) {
        toast.success(response.message || "Registration successful!");
        setIsRegister(false); // Switch to login mode
      } else {
        toast.success("Login successful!");

        // Save tokens to localStorage
        localStorage.setItem("accessToken", response.access);
        localStorage.setItem("refreshToken", response.refresh);

        // Redirect to dashboard
        router.push("/dashboard");
      }
    } catch (error) {
      // Handle error from centralized API handler
      toast.error(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />

      <div
        className="
          min-h-screen
          w-full
          bg-gradient-to-bl
          from-blue-950
          to-blue-800
          flex
          flex-col
          lg:flex-row
          animate-fadeIn
        "
      >
        {/* LEFT COLUMN (Hidden on smaller screens) */}
        <div className="hidden lg:flex w-1/2 h-full items-center justify-center">
          <img
            src="/word-kindness.png"
            alt="Word Kindness"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT COLUMN */}
        <div
          className={`flex flex-col w-full lg:w-1/2 ${
            isRegister ? "py-8" : "py-12"
          } px-4 sm:px-6 md:px-8 lg:px-12 items-center justify-center`}
        >
          <div
            className="
              w-full
              max-w-md
              p-8
              rounded-xl
              bg-white/20
              backdrop-blur-lg
              shadow-xl
              text-center
              border border-white/30
              animate-scaleIn
            "
          >
            <h1
              className="
                mb-2
                text-3xl
                font-extrabold
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-pink-500
                to-yellow-500
              "
            >
              SHAREKINDNESS
            </h1>
            <p className="mb-6 text-lg italic text-pink-100">
              "Small acts of kindness create big ripples of change."
            </p>

            <h2
              className="mb-2 text-2xl sm:text-3xl font-bold text-white drop-shadow"
            >
              {isRegister ? "Create an Account" : "Sign In"}
            </h2>

            <p className="mb-6 text-gray-100">
              {isRegister ? "Already have an account? " : "New user? "}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="
                  text-pink-200
                  font-medium
                  hover:text-pink-300
                  transition
                  underline
                "
              >
                {isRegister ? "Sign In" : "Create an account"}
              </button>
            </p>

            {/* AUTH FORM */}
            <form className="space-y-6 w-full" onSubmit={handleSubmit}>
              {isRegister ? (
                <>
                  <div className="text-left">
                    <label
                      htmlFor="username"
                      className="block text-sm font-semibold text-pink-50"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Enter your username"
                      required
                      className="
                        w-full
                        mt-1
                        px-4 py-2
                        border
                        rounded-lg
                        text-black
                        focus:ring-pink-500
                        focus:border-pink-500
                      "
                      onChange={handleChange}
                    />
                  </div>

                  <div className="text-left">
                    <label
                      htmlFor="bio"
                      className="block text-sm font-semibold text-pink-50"
                    >
                      Short Bio <span className="text-xs text-gray-200">(Max 50 words)</span>
                    </label>
                    <textarea
                      name="bio"
                      id="bio"
                      placeholder="Write a short bio"
                      rows="3"
                      className="
                        w-full
                        mt-1
                        px-4 py-2
                        border
                        rounded-lg
                        text-black
                        focus:ring-pink-500
                        focus:border-pink-500
                      "
                      onChange={handleChange}
                    />
                    {bioError && (
                      <p className="text-red-400 text-sm mt-1">{bioError}</p>
                    )}
                  </div>
                  <div className="text-left">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-pink-50"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      required
                      className="
                        w-full
                        mt-1
                        px-4 py-2
                        border
                        rounded-lg
                        text-black
                        focus:ring-pink-500
                        focus:border-pink-500
                      "
                      onChange={handleChange}
                    />
                  </div>
                  <div className="text-left">
                    <label
                      htmlFor="phone_number"
                      className="block text-sm font-semibold text-pink-50 mt-4"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone_number"
                      id="phone_number"
                      placeholder="Enter your phone number"
                      required
                      className="
                        w-full
                        mt-1
                        px-4 py-2
                        border
                        rounded-lg
                        text-black
                        focus:ring-pink-500
                        focus:border-pink-500
                      "
                      onChange={handleChange}
                    />
                  </div>
                  <div className="text-left">
                    <label
                      htmlFor="state"
                      className="block text-sm font-semibold text-pink-50 mt-4"
                    >
                      State
                    </label>
                    <select
                      name="state"
                      id="state"
                      required
                      className="
                        w-full
                        mt-1
                        px-4 py-2
                        border
                        rounded-lg
                        text-black
                        focus:ring-pink-500
                        focus:border-pink-500
                      "
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          state: e.target.value,
                          city: "",
                        })
                      }
                    >
                      <option value="" disabled>
                        Select your state
                      </option>
                      {Object.keys(statesAndCities).map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="city"
                      className="block text-sm font-semibold text-pink-50 mt-4"
                    >
                      City
                    </label>
                    <select
                      name="city"
                      id="city"
                      required
                      disabled={!formData.state}
                      className="
                        w-full
                        mt-1
                        px-4 py-2
                        border
                        rounded-lg
                        text-black
                        focus:ring-pink-500
                        focus:border-pink-500
                      "
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        Select your city
                      </option>
                      {statesAndCities[formData.state]?.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-left">
                    <label
                      htmlFor="profile_picture"
                      className="block text-sm font-semibold text-pink-50 mt-4"
                    >
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      name="profile_picture"
                      id="profile_picture"
                      className="
                        w-full
                        mt-1
                        px-4 py-2
                        border
                        rounded-lg
                        text-grey-700
                        focus:ring-pink-500
                        focus:border-pink-500
                      "
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="text-left">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-pink-50"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      required
                      className="w-full mt-1 px-4 py-2 border rounded-lg text-black focus:ring-pink-500 focus:border-pink-500"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="text-left">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-pink-50"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      required
                      className="w-full mt-1 px-4 py-2 border rounded-lg text-black focus:ring-pink-500 focus:border-pink-500"
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-3 text-white font-bold bg-pink-500 rounded-lg hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all"
              >
                {isRegister ? "Sign Up" : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
