import React, { useState, useRef, useEffect } from "react";
import {
  Save,
  Edit,
  Camera,
  User,
  Mail,
  Calendar,
  Phone,
  FileText,
} from "lucide-react";
import { useAuth } from "../Context/authContext/context";

const Profile = () => {
  const { currentUser, userData, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [profile, setProfile] = useState({
    dob: userData?.dob || "",
    contactNo: userData?.contactNo || "",
    bio: userData?.bio || "",
    profileImage: userData?.profileImage || null,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    setName(userData?.name || "");
    setEmail(userData?.email || "");
    setProfile({
      dob: userData?.dob || "",
      contactNo: userData?.contactNo || "",
      bio: userData?.bio || "",
      profileImage: userData?.profileImage || null,
    });
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    if (!currentUser) {
      setError("No user is logged in.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await updateUserProfile({
        name: name,
        email: email,
        dob: profile.dob,
        contactNo: profile.contactNo,
        bio: profile.bio,
        profileImage: profile.profileImage,
      });
      setIsEditing(false);
      showNotification("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: "" });
    }, 3000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get first name for greeting
  const firstName = name.split(" ")[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-300 via-teal-200 to-cyan-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 py-16">
      {/* Notification */}
      {notification.show && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-down z-50 flex items-center">
          <span className="mr-2">✓</span>
          {notification.message}
        </div>
      )}

      <div className="max-w-5xl mx-auto overflow-hidden rounded-lg shadow-xl py-10 ">
        {/* Header Banner */}
        <div className="h-48 bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-700 dark:to-teal-900 relative">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="absolute -bottom-20 left-12">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-700 shadow-xl">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-emerald-100 dark:bg-gray-600">
                    <User
                      size={64}
                      className="text-emerald-500 dark:text-emerald-300"
                    />
                  </div>
                )}
                {isEditing && (
                  <div
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <div className="bg-emerald-500 p-3 rounded-full">
                      <Camera size={20} className="text-white" />
                    </div>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>
          <div className="absolute bottom-6 right-8 flex items-center text-white">
            <div className="mr-4 text-right">
              <p className="text-sm font-light opacity-80">Today is</p>
              <p className="font-medium">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 pt-24 pb-12 px-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Welcome back,{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  {firstName}
                </span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Manage your personal information
              </p>
            </div>
            <button
              onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
              className={`px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all ${
                isEditing
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-emerald-100 hover:bg-emerald-200 text-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 dark:text-white"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : isEditing ? (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </>
              ) : (
                <>
                  <Edit className="w-5 h-5" />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300">
              <p>{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="md:col-span-1 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
                Profile Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <User size={18} className="text-emerald-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Name
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {name || "Not set"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail size={18} className="text-emerald-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {email || "Not set"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="text-emerald-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Date of Birth
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {profile.dob ? formatDate(profile.dob) : "Not set"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone size={18} className="text-emerald-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Contact Number
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {profile.contactNo || "Not set"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl mb-6">
                <div className="flex items-center mb-4">
                  <FileText size={20} className="text-emerald-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    About Me
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {profile.bio || "No bio information added yet."}
                </p>
              </div>

              {isEditing && (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
                    Edit Your Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10 w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-emerald-500 focus:ring focus:ring-emerald-200 dark:focus:ring-emerald-800 transition"
                          placeholder="Your Full Name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-emerald-500 focus:ring focus:ring-emerald-200 dark:focus:ring-emerald-800 transition"
                          placeholder="Your Email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="date"
                          name="dob"
                          value={profile.dob}
                          onChange={handleInputChange}
                          className="pl-10 w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-emerald-500 focus:ring focus:ring-emerald-200 dark:focus:ring-emerald-800 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="contactNo"
                          value={profile.contactNo}
                          onChange={handleInputChange}
                          className="pl-10 w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-emerald-500 focus:ring focus:ring-emerald-200 dark:focus:ring-emerald-800 transition"
                          placeholder="+94 XX XXX XXXX"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bio
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <FileText size={16} className="text-gray-400" />
                        </div>
                        <textarea
                          name="bio"
                          value={profile.bio}
                          onChange={handleInputChange}
                          className="pl-10 w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-emerald-500 focus:ring focus:ring-emerald-200 dark:focus:ring-emerald-800 transition h-32 resize-none"
                          placeholder="Tell something about yourself..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add some custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out;
        }
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default Profile;
