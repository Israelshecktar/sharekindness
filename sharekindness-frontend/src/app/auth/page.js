"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackgroundWrapper from "../components/BackgroundWrapper";
import statesAndCities from "../utils/statesAndCities"; // Import the states and cities file

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
      <ToastContainer />

      {/* Outer container */}
      <div
        className="
          flex
          items-center
          justify-center
          min-h-screen
          animate-fadeIn
          px-4
        "
      >
        {/* Auth Card */}
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
              text-4xl
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
            className="
              mb-2
              text-2xl
              sm:text-3xl
              font-bold
              text-white
              drop-shadow
            "
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

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isRegister ? (
              <>
                {/* Registration Form */}
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
                    Short Bio{" "}
                    <span className="text-xs text-gray-200">
                      (Max 50 words)
                    </span>
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
                  ></textarea>
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
                      text-black
                      focus:ring-pink-500
                      focus:border-pink-500
                    "
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <>
                {/* Sign-In Form */}
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
              </>
            )}

            <button
              type="submit"
              className="
                w-full
                py-3
                text-white
                font-bold
                bg-pink-500
                rounded-lg
                hover:bg-pink-600
                focus:ring-2
                focus:ring-pink-500
                focus:ring-offset-2
                transition-all
              "
            >
              {isRegister ? "Sign Up" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default AuthPage;
