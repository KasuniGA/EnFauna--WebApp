import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    species: 0,
    contributors: 0,
    sightings: 0
  });
  const sectionRef = useRef(null);
  const targetStats = {
    species: 15000,
    contributors: 50000,
    sightings: 120000
  };
  
  // Handle scroll-based animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { 
        threshold: 0.2,  // Trigger when 20% of the element is visible
        rootMargin: "-10% 0px" // Adds margin to the root
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Handle animated counters
  useEffect(() => {
    if (!isVisible) {
      setStats({ species: 0, contributors: 0, sightings: 0 });
      return;
    }
    
    const duration = 2000; // 2 seconds for the animation
    const framesPerSecond = 60;
    const totalFrames = duration / 1000 * framesPerSecond;
    let frame = 0;
    
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      if (progress >= 1) {
        setStats({
          species: targetStats.species,
          contributors: targetStats.contributors,
          sightings: targetStats.sightings
        });
        clearInterval(timer);
      } else {
        // Easing function for smooth animation
        const easeOutQuad = (t) => t * (2 - t);
        const easedProgress = easeOutQuad(progress);
        
        setStats({
          species: Math.floor(easedProgress * targetStats.species),
          contributors: Math.floor(easedProgress * targetStats.contributors),
          sightings: Math.floor(easedProgress * targetStats.sightings)
        });
      }
    }, 1000 / framesPerSecond);
    
    return () => clearInterval(timer);
  }, [isVisible]);
  
  // Format numbers with commas and K/M suffix
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toString();
  };
  
  return (
    <div ref={sectionRef} className="relative w-full max-w mx-auto overflow-hidden rounded-lg shadow-xl">
      {/* Background Image with Overlay */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/60 z-10" />
        <img 
          src="https://images.pexels.com/photos/2973031/pexels-photo-2973031.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Wildlife in natural habitat" 
          className="w-full object-cover h-96"
        />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 z-20 flex flex-col md:flex-row items-center p-6">
        {/* Wildlife Image Section */}
        <div 
          className={`md:w-1/2 flex justify-center items-center transition-all duration-1000 ease-out transform ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          <div className="bg-black/20 backdrop-blur-sm p-4 rounded-full">
            <img 
              src="https://i.pinimg.com/736x/bd/3e/28/bd3e2808b89e3be0f00caca27aa5b1ed.jpg" 
              alt="Wildlife species" 
              className="rounded-full w-64 h-64 object-cover border-4 border-green-400 shadow-lg"
            />
          </div>
        </div>
        
        {/* Text Content Section */}
        <div 
          className={`md:w-1/2 text-white transition-all duration-1000 delay-300 ease-out transform ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          <h1 className="text-4xl font-bold mb-4 text-center md:text-left">
            Join EnFauna !
          </h1>
          
          <p className="mb-4 text-lg text-center md:text-left">
            Your wildlife sightings are valuable data that help protect endangered species and their habitats.
          </p>
          
          <p className="mb-6 text-center md:text-left">
            Participate in our citizen science initiative and contribute to conservation efforts .
          </p>
          
          {/* Call to Action Button */}
          <div className="flex justify-center md:justify-start">
            <button> 
              <Link to="/report"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg uppercase tracking-wider flex items-center"
              >
                <span>Report a Sighting</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </button>
          </div>

          {/* Real-time Animated Stats Counters */}
          <div className={`flex justify-between mt-8 transition-all duration-1000 delay-600 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {formatNumber(stats.species)}
              </div>
              <div className="text-sm">Species</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {formatNumber(stats.contributors)}
              </div>
              <div className="text-sm">Contributors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {formatNumber(stats.sightings)}
              </div>
              <div className="text-sm">Sightings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;