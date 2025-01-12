"use client";

import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/api";
import statesAndCities from "../utils/statesAndCities";

const ProfileModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    profile_picture: null, // Store as null initially
    username: "",
    email: "",
    phone_number: "",
    city: "",
    state: "",
    bio: ""
  });

  const [profilePictureUrl, setProfilePictureUrl] = useState("/default-profile.jpg"); // For displaying the image
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      api.get("/api/user/profile/")
        .then(data => {
          setFormData({
            username: data.username || "",
            email: data.email || "",
            phone_number: data.phone_number || "",
            city: data.city || "",
            state: data.state || "",
            bio: data.bio || "",
            profile_picture: null // Clear the profile picture field
          });
          setProfilePictureUrl(data.profile_picture || "/default-profile.jpg");
        })
        .catch(error => {
          console.error("Failed to fetch profile:", error);
          toast.error(error?.response?.data?.error || "Failed to fetch profile. Please try again.");
        });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
      setProfilePictureUrl(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    const body = new FormData();
    Object.keys(formData).forEach(key => {
      body.append(key, formData[key] instanceof File ? formData[key] : formData[key]);
    });
  
    try {
      const response = await api.put("/api/user/profile/", body, {
        headers: { "Content-Type": "multipart/form-data" }
      });
  
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        // Update formData with the new data from the server
        setFormData({
          ...formData,
          profile_picture: response.data.profile_picture || formData.profile_picture,
          username: response.data.username,
          email: response.data.email,
          phone_number: response.data.phone_number,
          city: response.data.city,
          state: response.data.state,
          bio: response.data.bio
        });
      } else {
        throw new Error('Failed to update profile.');
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(error?.response?.data?.error || "Failed to update profile.");
    }
  };
  

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      try {
        await api.delete("/api/user/profile/");
        toast.success("Account deleted successfully!");
        window.location.href = "/auth"; // Redirect to login page
      } catch (error) {
        console.error("Failed to delete account:", error);
        toast.error(error?.response?.data?.error || "Failed to delete account.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-4 animate-[fadeIn_0.3s_ease-out]">
      <div className="relative w-full max-w-3xl bg-blue-100 rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">My Profile</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:space-x-6">
          <div className="sm:w-1/3 flex flex-col items-center">
            <div className="relative w-32 h-32">
              <img
                src={profilePictureUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border border-gray-200 shadow-sm"
              />
              {isEditing && (
                <label htmlFor="profile_picture" className="absolute bottom-0 right-0 bg-gradient-to-r from-pink-500 to-orange-500 p-1 text-white rounded-full cursor-pointer hover:from-pink-600 hover:to-orange-600 transition-colors" title="Change Profile Picture">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487A9.995 9.995 0 003.661 11.8M3 3l3.593 3.593m13.319 13.319A9.995 9.995 0 0111.661 3.8M21 21l-3.594-3.594" />
                  </svg>
                  <input id="profile_picture" type="file" name="profile_picture" className="hidden" onChange={handleChange} />
                </label>
              )}
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{formData.username || "No Name"}</h3>
              <p className="text-sm text-gray-600">{formData.email}</p>
            </div>
          </div>
          <div className="sm:w-2/3 mt-6 sm:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Username</label>
                <input type="text" name="username" value={formData.username} readOnly={!isEditing} onChange={handleChange} className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300 bg-white" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="text" name="phone_number" value={formData.phone_number} readOnly={!isEditing} onChange={handleChange} className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300 bg-white" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">State</label>
                <select name="state" value={formData.state} disabled={!isEditing} onChange={handleChange} className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300 bg-white">
                  <option value="">Select a state</option>
                  {Object.keys(statesAndCities).map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">City</label>
                <select name="city" value={formData.city} disabled={!isEditing || !formData.state} onChange={handleChange} className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300 bg-white">
                  <option value="">Select a city</option>
                  {statesAndCities[formData.state]?.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={formData.email} readOnly className="w-full px-4 py-2 rounded-md border border-transparent bg-gray-100 text-gray-600" />
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="flex-1 py-2 px-4 text-white rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 transition-colors">Save Changes</button>
                  <button onClick={() => setIsEditing(false)} className="flex-1 py-2 px-4 rounded-xl bg-gray-400 text-white hover:bg-gray-500 transition-colors">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsEditing(true)} className="flex-1 py-2 px-4 text-white rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 transition-colors">Edit Profile</button>
                  <button onClick={() => setPasswordModalOpen(true)} className="flex-1 py-2 px-4 text-white rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 transition-colors">Change Password</button>
                  <button onClick={() => setShowDeleteConfirmation(prev => !prev)} className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors">More Options</button>
                </>
              )}
            </div>
            {showDeleteConfirmation && !isEditing && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-500 text-sm mb-3">If you really need to delete your account, click below.</p>
                <button onClick={handleDeleteAccount} className="py-2 px-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">Delete Account</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
