import React, { useState, useEffect } from "react";
import { Camera, Calendar, Download, Users, ArrowRight } from "lucide-react";
import SpotlightSection from "../Components/Home/SpotlightSection";
import StatsSection from "../Components/Home/StatsSection";
import EnFaunaLanding from "../Components/Home/what";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStats, setActiveStats] = useState(false);

  const slides = [
    {
      image:
        "https://images.pexels.com/photos/4137250/pexels-photo-4137250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Join with EnFauna protecting Sri Lanka's unique wildlife.",
      subtitle:
        "Together we can make a difference in conservation efforts and ensure a sustainable future for our natural heritage.",
      location: "Wilpattu National Park",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2021/12/02/07/48/monkey-6839877_1280.jpg",
      title: "Explore the Wild Side of Sri Lanka",
      subtitle: "Experience the beauty and diversity of our natural world.",
      location: "Horton Plains National Park",
    },
    {
      image:
        "https://images.unsplash.com/photo-1545063914-a1a6ec821c88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Discover Our Rich Biodiversity",
      subtitle: "Home to countless unique species",
      location: "Yala National Park",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2023/09/28/23/18/snake-8282641_1280.jpg",
      title: "Be Part of Conservation",
      subtitle: "Make a difference today",
      location: "Sinharaja Forest",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    setIsLoading(false);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStats(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const statsSection = document.querySelector(".stats-section");
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`min-h-screen bg-gray-50  dark:bg-gray-950 transition-opacity duration-1000 ${
        isLoading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden bg-black">
        {/* Social Media Links with Vertical Line */}
        <div className="absolute left-6 top-1/4 z-20 flex flex-col items-center">
          <div className="w-px h-16 bg-white mb-8"></div>
          <div className="flex flex-col gap-8">
            <a
              href="#"
              className="text-white hover:text-green-400 transition-colors duration-300"
            >
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-white hover:text-green-400 transition-colors duration-300"
            >
              <span className="sr-only">Facebook</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-white hover:text-green-400 transition-colors duration-300"
            >
              <span className="sr-only">Twitter</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
              </svg>
            </a>
          </div>
          <div className="w-px h-16 bg-white mt-8"></div>
        </div>

        {/* Slides */}
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-all duration-1000 ease-in-out"
              style={{
                opacity: currentSlide === index ? 1 : 0,
                transform: `scale(${currentSlide === index ? 1 : 1.1})`,
                zIndex: currentSlide === index ? 1 : 0,
              }}
            >
              {/* Background Image with Gradient */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${slide.image}')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center z-10">
                <div className="container mx-auto px-24">
                  <div className="max-w-2xl">
                    <h1 className="text-white text-6xl font-bold mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-white/80 text-lg mb-8 max-w-xl">
                      {slide.subtitle}
                    </p>

                    {/* Explore Button */}
                    <Link
                      to="/explore"
                      className="bg-white text-black px-8 py-3 rounded-sm flex items-center gap-2 group hover:bg-green-500 hover:text-white transition-all duration-300 w-36"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                    </Link>

                    {/* Location Tags */}
                    <div className="mt-12">
                      <span className="inline-flex items-center gap-2 text-white/80">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {slide.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Thumbnail Navigation */}
          <div className="absolute bottom-8 right-8 z-20">
            <div className="flex gap-4">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                    currentSlide === index
                      ? "ring-2 ring-white"
                      : "opacity-50 hover:opacity-75"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-white transition-all duration-[5000ms] ease-linear"
              style={{
                width: "100%",
                transform: `scaleX(${(currentSlide + 1) / slides.length})`,
                transformOrigin: "left",
              }}
            />
          </div>
        </div>
      </div>

      {/* What is EnFauna */}
      <EnFaunaLanding />

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 bg-slate-50 dark:bg-gray-950">
        <StatsSection />

        {/* Species Spotlight */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-10 mb-12 py-12">
          <SpotlightSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
