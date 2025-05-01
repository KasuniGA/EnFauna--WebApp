"use client";

import React, { Suspense, useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Explore from "./Pages/Explore";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import Fundpg from "./Pages/Fundpg";
import Feedpg from "./Pages/Feedpg";
import Report from "./Pages/Report";
import Home from "./Pages/Home";
import Login from "./Auth/Login";
import Signup from "./Auth/SignUp";
import FAQs from "./Pages/FAQs";
import Profile from "./Pages/Profile";
import PhotoUploadForm from "./Pages/PhotoUploadForm";
import { AuthProvider, useAuth } from "./Context/authContext/context";
import { UserProvider, UserContext } from "./Context/UserContext";
import { usePhotoStore } from "./store/photo.store.js";
import ErrorBoundary from "./common/ErrorBoundary";
import ScrollToTop from "./common/ScrollToTop";
import Loading from "./Pages/loading"; // Import your Loading page
import { Helmet } from "react-helmet"; // SEO
import ForgotPassword from "./Components/ForgotPassword.jsx";

// Lazy load heavy components for better performance
const LazyGallery = React.lazy(() => import("./Pages/Gallery"));
const LazyPhotocontest = React.lazy(() => import("./Pages/Photocontest"));

// PhotoStoreInitializer component to sync user with photo store
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

function ProtectedRoute({ children }) {
  const { userLoggedIn } = useAuth();
  return userLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000); // Simulate loading delay
  }, []);

  if (isLoading) {
    return <Loading />; // Show the loading page before the app loads
  }

  return (
    <AuthProvider>
      <UserProvider>
        <PhotoStoreInitializer>
          <Router>
            {/* SEO */}
            <Helmet>
              <title>EnFauna - Wildlife Conservation</title>
              <meta
                name="description"
                content="EnFauna is a platform dedicated to wildlife conservation, community-driven fundraising, and photo sharing."
              />
              <meta
                name="keywords"
                content="wildlife, conservation, fundraising, photo sharing, EnFauna"
              />
              <meta name="author" content="EnFauna Team" />
              <meta
                property="og:title"
                content="EnFauna - Wildlife Conservation"
              />
              <meta
                property="og:description"
                content="Join EnFauna in protecting wildlife and promoting conservation efforts."
              />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://enfauna.com" />
              <meta
                property="og:image"
                content="https://enfauna.com/logo.png"
              />
            </Helmet>

            {/* Scroll Restoration */}
            <ScrollToTop />

            <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
              <Navbar />
              <main className="flex-grow">
                <ErrorBoundary>
                  <Suspense fallback={<Loading />}>
                    <Routes>
                      <Route
                        path="/"
                        element={<Navigate to="/home" replace />}
                      />
                      <Route path="/home" element={<Home />} />
                      <Route path="/report" element={<Report />} />
                      <Route path="/explore" element={<Explore />} />
                      <Route path="/fundpg" element={<Fundpg />} />
                      <Route path="/feedpg" element={<Feedpg />} />
                      <Route
                        path="/photocontest"
                        element={
                          <Suspense fallback={<Loading />}>
                            <LazyPhotocontest />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/photouploadform"
                        element={<PhotoUploadForm />}
                      />
                      <Route path="/about-us" element={<AboutUs />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route
                        path="/gallery"
                        element={
                          <Suspense fallback={<Loading />}>
                            <LazyGallery />
                          </Suspense>
                        }
                      />
                      <Route path="/faqs" element={<FAQs />} />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                      />
                      <Route
                        path="*"
                        element={<Navigate to="/home" replace />}
                      />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </main>
              <Footer />
            </div>
          </Router>
        </PhotoStoreInitializer>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
