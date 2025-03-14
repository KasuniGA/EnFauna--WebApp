import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Explore from "./Pages/Explore";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import Gallery from "./Pages/Gallery";
import Fundpg from "./Pages/Fundpg";
import Feedpg from "./Pages/Feedpg";
import Photocontest from "./Pages/Photocontest";
import Report from "./Pages/Report";
import Home from "./Pages/Home";
import Login from "./Auth/Login";
import Signup from "./Auth/SignUp";
import FAQs from "./Pages/FAQs";
import Profile from "./Pages/Profile";
import PhotoUploadForm from "./Pages/PhotoUploadForm";
import { AuthProvider, useAuth } from "./Context/authContext/context";
import { UserProvider } from "./Context/UserContext";
import ErrorBoundary from "./Components/ErrorBoundary"; // Add ErrorBoundary
import LoadingSpinner from "./Components/LoadingSpinner"; // Add LoadingSpinner
import ScrollToTop from "./Components/ScrollToTop"; // Add ScrollToTop
import { Helmet } from "react-helmet"; // For SEO

// Lazy load heavy components for better performance
const LazyGallery = React.lazy(() => import("./Pages/Gallery"));
const LazyPhotocontest = React.lazy(() => import("./Pages/Photocontest"));

function ProtectedRoute({ children }) {
  const { userLoggedIn } = useAuth();
  return userLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          {/* SEO and Accessibility */}
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
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route
                      path="/report"
                      element={
                        <ProtectedRoute>
                          <Report />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/fundpg" element={<Fundpg />} />
                    <Route path="/feedpg" element={<Feedpg />} />
                    <Route
                      path="/photocontest"
                      element={
                        <Suspense fallback={<LoadingSpinner />}>
                          <LazyPhotocontest />
                        </Suspense>
                      }
                    />
                    <Route path="/photouploadform" element={<PhotoUploadForm />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route
                      path="/gallery"
                      element={
                        <Suspense fallback={<LoadingSpinner />}>
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
                    <Route path="*" element={<Navigate to="/home" replace />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;