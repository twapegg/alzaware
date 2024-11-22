"use client";
import React, { useState, useRef } from "react";
import { FaPen } from "react-icons/fa"; // Pencil icon from react-icons (you can choose another icon if you'd like)

export default function AccountSettings() {
  const [userInfo, setUserInfo] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "+1234567890",
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Account settings updated successfully!");
  };

  // Function to trigger the file input click when the preview image is clicked
  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger the file input click programmatically
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6">Account Settings</h2>

      {/* Profile Picture Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Profile Picture</h3>
        <div className="relative flex flex-col items-center space-y-4">
          {/* Profile Picture Preview */}
          <div
            className="w-32 h-32 rounded-full overflow-hidden mb-4 cursor-pointer"
            onClick={handleImageClick} // Add click handler to the preview image
          >
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xl text-gray-500">
                No Image
              </div>
            )}

            {/* Pencil Icon Overlay */}
            {preview && (
              <div className="absolute top-0 right-0 p-2 bg-white bg-opacity-60 rounded-full cursor-pointer">
                <FaPen className="text-gray-700" size={20} />
              </div>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef} // Attach the ref to the file input
            onChange={handleProfilePicChange}
            className="hidden"
          />
        </div>
      </section>

      {/* Personal Information Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        <form className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={userInfo.fullName}
              onChange={handleUserInfoChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email}
              onChange={handleUserInfoChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={userInfo.phoneNumber}
              onChange={handleUserInfoChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </form>
      </section>

      {/* Change Password Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="confirmPassword"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
