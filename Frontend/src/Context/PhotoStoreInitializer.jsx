"use client";

import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { usePhotoStore } from "../store/photo.store.js";

const PhotoStoreInitializer = ({ children }) => {
  const { user } = useContext(UserContext);
  const { setCurrentUser } = usePhotoStore();

  useEffect(() => {
    if (user) {
      // Map your user object to the format expected by the photo store
      setCurrentUser({
        id: user._id || user.id, // Adjust based on your user object structure
        name: user.name || user.username || "Anonymous User",
        email: user.email || "",
        isLoggedIn: !!user,
      });
    } else {
      // Reset current user when logged out
      setCurrentUser(null);
    }
  }, [user, setCurrentUser]);

  return <>{children}</>;
};
