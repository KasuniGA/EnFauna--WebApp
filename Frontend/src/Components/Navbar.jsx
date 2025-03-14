import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/jaguar.png";
import { User } from "lucide-react";
import { useAuth } from "../Context/authContext/context";
import { doSignOut } from "../../../Backend/Auth/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle resize effect
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle dark mode effect
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Close dropdown
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    doSignOut().then(() => {
      navigate("/login");
      closeMobileMenu();
    });
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div
        className={`flex items-center justify-between p-4 transition-all duration-300 ${
          scrolled || isOpen
            ? "bg-white/95 shadow-md backdrop-blur-sm dark:bg-gray-900/95"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link to="/home" onClick={closeMobileMenu}>
          <div className="flex items-center">
            <img src={logo} alt="EnFauna Logo" className="h-8 w-8 mr-2" />
            <span
              className={`text-xl font-bold ${
                scrolled || isOpen ? "text-green-600" : "text-white"
              }`}
            >
              EnFauna
            </span>
          </div>
        </Link>

        {/* Hamburger Menu */}
        <div className="flex items-center md:hidden space-x-4">
          {/* Mobile Dark Mode Toggle */}
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              scrolled ? "bg-gray-200 dark:bg-gray-700" : "bg-white/20"
            }`}
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f9d006"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sun"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#020617"
                stroke="#08113a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-moon"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>

          <button
            className={`${
              scrolled || isOpen
                ? "text-gray-800 dark:text-white"
                : "text-white"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute w-6 h-0.5 transform transition-all duration-300 ${
                  isOpen ? "rotate-45 top-3" : "top-1"
                } ${
                  scrolled || isOpen ? "bg-gray-800 dark:bg-white" : "bg-white"
                }`}
              ></span>
              <span
                className={`absolute w-6 h-0.5 top-3 transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                } ${
                  scrolled || isOpen ? "bg-gray-800 dark:bg-white" : "bg-white"
                }`}
              ></span>
              <span
                className={`absolute w-6 h-0.5 transform transition-all duration-300 ${
                  isOpen ? "-rotate-45 top-3" : "top-5"
                } ${
                  scrolled || isOpen ? "bg-gray-800 dark:bg-white" : "bg-white"
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`absolute md:relative top-full left-0 w-full md:w-auto 
            ${
              scrolled || isOpen
                ? "bg-white/95 dark:bg-gray-900/95"
                : "bg-transparent"
            }
            md:flex md:items-center md:bg-transparent
            transform transition-all duration-300 ease-in-out
            ${
              isOpen
                ? "translate-y-0 opacity-100 visible"
                : "-translate-y-2 md:translate-y-0 opacity-0 md:opacity-100 invisible md:visible"
            }
            ${isOpen ? "h-[calc(100vh-4rem)] md:h-auto" : "h-0 md:h-auto"}
            overflow-y-auto md:overflow-visible`}
        >
          <ul className="flex flex-col md:flex-row items-start md:items-center md:space-x-6 p-4 md:p-0 space-y-4 md:space-y-0 w-full">
            <li className="w-full md:w-auto">
              <Link to="/home" onClick={closeMobileMenu}>
                <button
                  className={`w-full text-left px-4 py-2 hover:text-[#059669] ${
                    scrolled || isOpen
                      ? "text-gray-800 dark:text-white"
                      : "text-white"
                  }`}
                >
                  Home
                </button>
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link to="/report" onClick={closeMobileMenu}>
                <button
                  className={`w-full text-left px-4 py-2 hover:text-[#059669] ${
                    scrolled || isOpen
                      ? "text-gray-800 dark:text-white"
                      : "text-white"
                  }`}
                >
                  Report
                </button>
              </Link>
            </li>

            {/* Conditionally render Explore tab */}
            {userLoggedIn && (
              <li className="relative w-full md:w-auto">
                <button
                  className={`w-full text-left px-4 py-2 hover:text-[#059669] ${
                    scrolled || isOpen
                      ? "text-gray-800 dark:text-white"
                      : "text-white"
                  }`}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Explore
                </button>
                {isDropdownOpen && (
                  <ul className="md:absolute relative left-0 mt-2 w-full md:w-48 bg-white/95 dark:bg-gray-700/95 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-20">
                    <li>
                      <Link
                        to="/Fundpg"
                        className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => {
                          closeDropdown();
                          closeMobileMenu();
                        }}
                      >
                        Community-Driven Fundraising
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/feedpg"
                        className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => {
                          closeDropdown();
                          closeMobileMenu();
                        }}
                      >
                        Visitor Feedback Forum
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/photocontest"
                        className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => {
                          closeDropdown();
                          closeMobileMenu();
                        }}
                      >
                        Photo Sharing & Contests
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            <li className="w-full md:w-auto">
              <Link to="/gallery" onClick={closeMobileMenu}>
                <button
                  className={`w-full text-left px-4 py-2 hover:text-[#059669] ${
                    scrolled || isOpen
                      ? "text-gray-800 dark:text-white"
                      : "text-white"
                  }`}
                >
                  Gallery
                </button>
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link to="/about-us" onClick={closeMobileMenu}>
                <button
                  className={`w-full text-left px-4 py-2 hover:text-[#059669] ${
                    scrolled || isOpen
                      ? "text-gray-800 dark:text-white"
                      : "text-white"
                  }`}
                >
                  About
                </button>
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link to="/contact" onClick={closeMobileMenu}>
                <button
                  className={`w-full text-left px-4 py-2 hover:text-[#059669] ${
                    scrolled || isOpen
                      ? "text-gray-800 dark:text-white"
                      : "text-white"
                  }`}
                >
                  Contact
                </button>
              </Link>
            </li>
          </ul>

          {/* Mobile Auth Buttons */}
          <div className="md:hidden flex flex-col space-y-4 p-4 w-full">
            {userLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="w-full"
                >
                  <button className="w-full px-6 py-2 rounded-full border text-sm border-green-600 text-green-600 hover:bg-green-600 hover:text-white flex items-center justify-center space-x-2">
                    <User size={24} />
                    <span>Profile</span>
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full px-6 py-2 rounded-full bg-green-600 text-white text-sm hover:bg-green-700"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMobileMenu} className="w-full">
                  <button className="w-full px-6 py-2 rounded-full border text-sm border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                    Log in
                  </button>
                </Link>
                <Link to="/signup" onClick={closeMobileMenu} className="w-full">
                  <button className="w-full px-6 py-2 rounded-full bg-green-600 text-white text-sm hover:bg-green-700">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Desktop Right-Side Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full hover:shadow-md ${
              scrolled ? "bg-gray-200 dark:bg-gray-700" : "bg-white/20"
            }`}
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f9d006"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sun"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#020617"
                stroke="#08113a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-moon"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {userLoggedIn ? (
              <>
                <Link to="/profile">
                  <button
                    className={`px-2 py-2 rounded-full  flex items-center ${
                      scrolled
                        ? darkMode
                          ? "bg-transparent text-white "
                          : " text-green-600"
                        : " text-white"
                    } hover:bg-green-600 hover:text-white`}
                  >
                    <User size={24} />
                    {currentUser ? (
                      <span className="mr-2">{currentUser.email}</span>
                    ) : null}
                  </button>
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-full bg-green-600 text-white text-sm hover:bg-green-700"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button
                    className={`px-6 py-2 rounded-full border text-sm ${
                      scrolled
                        ? darkMode
                          ? "bg-transparent text-white border-green-600"
                          : "border-green-600 text-green-600"
                        : "border-white text-white"
                    } hover:bg-green-600 hover:text-white`}
                  >
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-6 py-2 rounded-full bg-green-600 text-white text-sm hover:bg-green-700">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;