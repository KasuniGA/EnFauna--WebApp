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

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "-10% 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Counter animation
  useEffect(() => {
    if (!isVisible) {
      setStats({ species: 0, contributors: 0, sightings: 0 });
      return;
    }

    const duration = 2000;
    const fps = 60;
    const totalFrames = (duration / 1000) * fps;
    let frame = 0;

    const easeOutQuad = (t) => t * (2 - t);

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      if (progress >= 1) {
        setStats({ ...targetStats });
        clearInterval(timer);
      } else {
        const eased = easeOutQuad(progress);
        setStats({
          species: Math.floor(eased * targetStats.species),
          contributors: Math.floor(eased * targetStats.contributors),
          sightings: Math.floor(eased * targetStats.sightings)
        });
      }
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, [isVisible]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K+';
    return num.toString();
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-lg shadow-xl my-8"
    >
      {/* Background Image */}
      <div className="relative h-96 md:h-[28rem]">
        <img
          src="https://images.pexels.com/photos/2973031/pexels-photo-2973031.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Wildlife"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/60 z-10" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 py-6 gap-6 sm:gap-10">
        {/* Text Section */}
        <div
          className={`w-full md:w-1/2 text-white text-center md:text-left transition-all duration-1000 ease-out transform ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Join EnFauna!
          </h1>
          <p className="mb-4 text-base sm:text-lg">
            Your wildlife sightings are valuable data that help protect endangered species and their habitats.
          </p>
          <p className="mb-6 text-sm sm:text-base">
            Participate in our citizen science initiative and contribute to conservation efforts.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              to="/report"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg uppercase tracking-wider flex items-center"
            >
              <span>Report a Sighting</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div
            className={`flex justify-around sm:justify-between mt-8 text-center transition-all duration-1000 delay-300 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <div>
              <div className="text-2xl font-bold text-green-400">
                {formatNumber(stats.species)}
              </div>
              <div className="text-sm sm:text-base">Species</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">
                {formatNumber(stats.contributors)}
              </div>
              <div className="text-sm sm:text-base">Contributors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">
                {formatNumber(stats.sightings)}
              </div>
              <div className="text-sm sm:text-base">Sightings</div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div
          className={`w-full md:w-1/2 flex justify-center items-center transition-all duration-1000 ease-out transform ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}
        >
          <div className="bg-black/30 backdrop-blur-sm p-2 sm:p-4 rounded-full">
            <img
              src="https://i.pinimg.com/736x/bd/3e/28/bd3e2808b89e3be0f00caca27aa5b1ed.jpg"
              alt="Wildlife species"
              className="rounded-full w-32 h-32 sm:w-48 sm:h-48 object-cover border-4 border-green-400 shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
