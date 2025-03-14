import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { 
  Leaf, 
  MapPin, 
  Users, 
  ArrowRight, 
  PawPrint,  
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Hero section background images
const heroImages = [
  '../src/assets/ele.jpg',
  '../src/assets/pit-viper.jpg',
  '../src/assets/kingfisher.jpg'
];

// Updated mock data for endangered species (kept from original code)
const endangeredSpecies = [
  { 
    name: 'Ceylon Elephant', 
    population: 4000, 
    threat: 'Habitat Loss', 
    description: 'The Ceylon Elephant is a subspecies endemic to Sri Lanka, facing critical challenges due to rapid habitat fragmentation and human-elephant conflicts.',
    image: '../src/assets/elephant.jpg',
    icon: <PawPrint className="w-12 h-12 text-green-600 dark:text-green-400" />
  },
  { 
    name: 'Sri Lankan Leopard', 
    population: 700, 
    threat: 'Poaching', 
    description: 'A critically endangered big cat native to Sri Lanka, the Sri Lankan Leopard is struggling to survive due to habitat loss and human interference.',
    image: '../src/assets/leopard.jpg',
    icon: <PawPrint className="w-12 h-12 text-amber-600 dark:text-amber-400" />
  },
  { 
    name: 'Red Slender Loris', 
    population: 2500, 
    threat: 'Habitat Destruction', 
    description: 'This small nocturnal primate is unique to Sri Lanka, facing severe threats from deforestation and the illegal pet trade.',
    image: '../src/assets/loris.jpg',
    icon: <PawPrint className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
  }
];

const WildlifeHotspots = [
  { 
    name: 'Yala National Park', 
    coordinates: '6.5°N, 81.3°E', 
    speciesCount: 32 
  },
  { 
    name: 'Udawalawe National Park', 
    coordinates: '6.5°N, 81.0°E', 
    speciesCount: 25 
  }
];

const AboutUs = () => {
  const [hoveredSpecies, setHoveredSpecies] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Automatic image transition
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Manual navigation functions
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % heroImages.length
    );
  };

  return (
    <div 
      className="bg-gradient-to-br from-green-100 via-green-700 to-white 
             dark:from-blue-900 dark:via-gray-900 dark:to-grey-800 
             min-h-screen text-gray-900 dark:text-gray-100 
             transition-colors duration-300 bg-cover bg-center">
      {/* Hero Section with Carousel */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Image Carousel Background */}
        <div className="absolute inset-0 overflow-hidden">
          {heroImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex 
                  ? 'opacity-100' 
                  : 'opacity-0'
              }`}
            >
              <img 
                src={image} 
                alt={`Hero background ${index + 1}`}
                className="w-full h-full object-cover brightness-50"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full z-20"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button 
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full z-20"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
            Empowering Wildlife Conservation in Sri Lanka
          </h1>
          <p className="text-xl text-white mb-10 drop-shadow-md">
            Bridging the gap between conservation efforts and community participation through an innovative, accessible platform.
          </p>
          <Link to="/explore">
            <button className="bg-green-600 dark:bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-700 dark:hover:bg-green-600 transition flex items-center justify-center mx-auto space-x-2">
              Get Started 
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </Link>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {heroImages.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full  ${
                  index === currentImageIndex 
                    ? 'bg-white' 
                    : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Remaining components from the original code */}
      {/* Endangered Species Infographic */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-green-950 dark:text-green-300 mb-12 relative z-10">
          <div className="inline-block px-4 py-2 bg-white/70 dark:bg-black/50 rounded">
            Endangered Species at a Glance
          </div>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {endangeredSpecies.map((species, index) => (
            <div 
              key={species.name}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              onMouseEnter={() => setHoveredSpecies(index)}
              onMouseLeave={() => setHoveredSpecies(null)}
            >
              {/* Image with hover effect */}
              <div className="relative">
                <img 
                  src={species.image} 
                  alt={species.name} 
                  className="w-full h-48 object-cover"
                />
                {hoveredSpecies === index && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 dark:bg-opacity-80 text-white p-4 flex items-center justify-center">
                    <p className="text-center">{species.description}</p>
                  </div>
                )}
              </div>

              {/* Species Info */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {species.icon}
                  <h3 className="ml-4 text-xl font-semibold text-green-800 dark:text-green-300">{species.name}</h3>
                </div>
                <div className="space-y-2 text-green-700 dark:text-green-200">
                  <p>Population: {species.population}</p>
                  <p>Primary Threat: {species.threat}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wildlife Hotspots */}
      <div className="bg-green-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-900 dark:text-green-300 mb-12">
            Wildlife Hotspots
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {WildlifeHotspots.map((spot, index) => (
              <div 
                key={spot.name} 
                className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center mb-4">
                  <MapPin className="w-8 h-8 text-green-600 dark:text-green-400 mr-4" />
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">{spot.name}</h3>
                </div>
                <div className="space-y-2 text-green-700 dark:text-green-200">
                  <p>Coordinates: {spot.coordinates}</p>
                  <p>Species Count: {spot.speciesCount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission and Vision */}
      <div className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-900 dark:text-green-300 mb-6">Our Mission</h3>
            <p className="text-green-800 dark:text-green-200 mb-6">
              EnFauna is dedicated to protecting the endangered species of Sri Lanka by creating a collaborative platform that bridges conservation efforts with community participation.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Leaf className="w-10 h-10 mx-auto text-green-600 dark:text-green-400 mb-2" />
                <p className="text-green-800 dark:text-green-200">Raise Awareness</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="w-10 h-10 mx-auto text-green-600 dark:text-green-400 mb-2" />
                <p className="text-green-800 dark:text-green-200">Promote Conservation</p>
              </div>
              <div className="text-center">
                <Users className="w-10 h-10 mx-auto text-green-600 dark:text-green-400 mb-2" />
                <p className="text-green-800 dark:text-green-200">Community Engagement</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-900 dark:text-green-300 mb-6">Our Vision</h3>
            <p className="text-green-800 dark:text-green-200 italic">
              "To foster a harmonious coexistence between humans and wildlife while safeguarding the natural heritage of Sri Lanka for generations to come."
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-green-600 dark:bg-green-800 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Join the Conservation Movement</h2>
          <p className="text-xl mb-10">
            Your involvement can make a real difference in protecting Sri Lanka's unique wildlife.
          </p>
          <div className="flex justify-center space-x-6">
            <button className="bg-green-200 text-green-600 dark:bg-white dark:text-green-600 px-8 py-3 rounded-full hover:bg-white dark:hover:bg-green-200 transition">
              Explore Features
            </button>
            <button className="border-2 border-green-100 text-green-100 dark:border-green-600 dark:text-green-100 px-8 py-3 rounded-full hover:bg-white hover:text-green-600 dark:hover:bg-green-600 dark:hover:text-green-100 transition">
              Get Involved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;