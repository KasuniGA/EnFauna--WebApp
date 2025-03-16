import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../../../Backend/Auth/firebase.js";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../../../../Backend/Auth/firebase.js"; // Import Firestore

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // Additional user data from Firestore
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  // Example: Updating profile data
  const handleProfileUpdate = async (updatedData) => {
    try {
      await updateUserProfile(updatedData);
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error.message);
    }
  };

  async function initializeUser(user) {
    if (user) {
      setCurrentUser(user);

      // Check if the user logged in using email & password
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      // Check if the user logged in using Google
      const isGoogle = user.providerData.some(
        (provider) => provider.providerId === "google.com"
      );
      setIsGoogleUser(isGoogle);

      // Fetch additional user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      setUserData(null); // Clear user data on logout
    }

    setLoading(false);
  }

  // ✅ Login with email and password
  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(userCredential.user);
      setUserLoggedIn(true); // Ensure this is set to true

      // Fetch additional user data from Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }

      return userCredential.user;
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  }

  // ✅ Login with Google
  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user already exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        // If the user doesn't exist, create a new document
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          profileImage: user.photoURL || "", // Use Google profile image if available
          createdAt: new Date(),
        });
      } else {
        // If the user exists, only update the fields that are not already set
        await setDoc(
          doc(db, "users", user.uid),
          {
            name: userDoc.data().name || user.displayName, // Keep existing name if available
            email: userDoc.data().email || user.email, // Keep existing email if available
            profileImage: userDoc.data().profileImage || user.photoURL, // Keep existing profile image if available
          },
          { merge: true } // Merge the data instead of overwriting
        );
      }

      // Fetch updated user data from Firestore
      const updatedUserDoc = await getDoc(doc(db, "users", user.uid));
      if (updatedUserDoc.exists()) {
        setUserData(updatedUserDoc.data());
      }

      setCurrentUser(user);
      setUserLoggedIn(true);
      setIsGoogleUser(true);

      return result;
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      throw error;
    }
  }

  // ✅ Logout function
  async function logout() {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserLoggedIn(false);
      setUserData(null); // Clear user data on logout
    } catch (error) {
      console.error("Logout Error:", error.message);
      throw error;
    }
  }

  // ✅ Update user profile data in Firestore
  async function updateUserProfile(data) {
    if (currentUser) {
      try {
        await setDoc(
          doc(db, "users", currentUser.uid),
          data,
          { merge: true } // Merge the data instead of overwriting
        );
        setUserData((prev) => ({ ...prev, ...data })); // Update local user data
      } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
    }
  }

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    userData, // Additional user data from Firestore
    login,
    loginWithGoogle, // Add Google Sign-In function
    logout,
    updateUserProfile, // Function to update user profile data
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
