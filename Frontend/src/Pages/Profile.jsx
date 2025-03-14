import React, { useState, useRef, useContext } from "react";
import { Save, Edit, Camera } from "lucide-react";
import { UserContext } from "../Context/UserContext";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(UserContext); // Get user details from context
  const [name, setName] = useState(user?.name || "Guest");
  const [email, setEmail] = useState(user?.email || "example@example.com");

  const [profile, setProfile] = useState({
    dob: "",
    contactNo: "",
    bio: "",
    profileImage: user?.profileImage || null,
  });

  const fileInputRef = useRef(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-tl from-green-100 to-green-300 dark:from-gray-900 dark:to-gray-800 p-6 py-24">
      <div className="max-w-4xl mx-auto bg-green-50 dark:bg-gray-700 rounded-2xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Welcome, {name.split(" ")[0]}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-green-400 dark:border-green-700 overflow-hidden mx-auto">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="https://i.pinimg.com/736x/ea/50/80/ea508059e1a6d2f2439c7fac89590526.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-2 right-2 bg-green-500 dark:bg-green-700 text-white p-2 rounded-full"
                  >
                    <Camera size={16} />
                  </button>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">{email}</p>
            </div>
          </div>

          <div className="md:w-2/3 space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-green-500 dark:bg-green-700 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-800 transition"
              >
                {isEditing ? (
                  <Save className="w-5 h-5" />
                ) : (
                  <Edit className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white"
                  placeholder="Your Full Name"
                />
              </div>

              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={profile.dob}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2">
                  Contact No
                </label>
                <input
                  type="tel"
                  name="contactNo"
                  value={profile.contactNo}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white"
                  placeholder="+94"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white h-32"
                placeholder="Tell Something About You"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;