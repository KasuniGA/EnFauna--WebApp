import React, { useState, useEffect } from "react";
import Adopt from "../Components/Fundpg/Adopt";
import Testimonials from "../Components/Fundpg/Testimonials";
import Campaign from "../Components/Fundpg/campaign";

const Fundpg = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative bg-gray-900 dark:bg-gray-800 ">
        <div className="relative w-full h-screen max-h-screen overflow-hidden">
          <img
            src="https://wildlife.lk/wp-content/uploads/2024/03/rescue-1024x683.jpg"
            alt="Wildlife"
            className="w-full object-cover"
          />
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Support Wildlife Conservation
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">
              Join hands to protect Sri Lanka's endangered species and
              ecosystems.
            </p>
            <div className="bg-green-600 hover:bg-green-700 text-white px-8 py-3  text-lg font-semibold transition-colors">
              Donate Now
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Search */}
      <Campaign />

      {/* Adopt a Species */}
      <Adopt />

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default Fundpg;
