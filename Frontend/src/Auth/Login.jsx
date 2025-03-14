import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../Backend/Auth/auth";
import { useAuth } from "../Context/authContext/context";

export default function Login() {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSigningIn, setIsSigningIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate("/profile");
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
        navigate("/profile");
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 relative py-24"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/11/d9/76/11d976452ca684b3e7c0306cc306c3e1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

      {/* Login Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl flex overflow-hidden transform scale-105">
        {/* Left Side - Image */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://i.pinimg.com/736x/11/d9/76/11d976452ca684b3e7c0306cc306c3e1.jpg"
            alt="Big Cat"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-16 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center">
            Welcome to{" "}
            <span className="text-green-600 dark:text-green-400">EnFauna</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-3">
            Please enter your details to sign in.
          </p>

          <form onSubmit={handleLogin} className="mt-6">
            <div className="mb-5">
              <label className="font-medium text-gray-900 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-gray-100 dark:border-gray-700 rounded-full p-4 mt-1 bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-5">
              <label className="font-medium text-gray-900 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-gray-100 dark:border-gray-700 rounded-full p-4 mt-1 bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-300 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                >
                  {showPassword ? (
                    // Eye icon (password visible)
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    // Eye-slash icon (password hidden)
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="text-right mb-5">
              <a href="#" className="text-gray-500 dark:text-gray-400 text-sm">
                Forgot Password?
              </a>
            </div>

            {errorMessage && (
              <p className="text-red-600 dark:text-red-400 font-semibold text-md text-center mb-2">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSigningIn}
              className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-full font-bold transition duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="relative w-full flex items-center gap-2 my-5 opacity-30 uppercase text-gray-500 dark:text-gray-200 font-bold">
            <hr className="w-1/2 border-black dark:border-gray-200" />
            <p>or</p>
            <hr className="w-1/2 border-black dark:border-gray-200" />
          </div>

          <div className="mt-5 flex justify-center">
            <button
              onClick={handleGoogleSignIn}
              className="w-full py-2 flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform rounded-full text-gray-700 dark:text-gray-300 font-semibold border-2 border-gray-100 dark:border-gray-700"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                  fill="#EA4335"
                />
                <path
                  d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                  fill="#34A853"
                />
                <path
                  d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                  fill="#4A90E2"
                />
                <path
                  d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                  fill="#FBBC05"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Don't have an account?
              <Link
                to="/signup"
                className="text-green-600 dark:text-green-400 font-bold ml-1"
              >
                Create Account!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}