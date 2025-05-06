import React, { useState, useEffect, useRef } from "react";
import { LogIn, Camera, HeartHandshake, Award, ChevronRight } from "lucide-react";

const HowEnFaunaWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [hoverStep, setHoverStep] = useState(null);
  const timerRef = useRef(null);
  const timeoutRef = useRef(null);

  // Animation trigger on scroll
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('how-it-works-section');
      if (element) {
        const position = element.getBoundingClientRect();
        // If the section is in the viewport
        if (position.top < window.innerHeight * 0.8 && position.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };

    // Set up step animation intervals
    if (isVisible) {
      let step = 0;
      timerRef.current = setInterval(() => {
        setActiveStep(step);
        step = (step + 1) % 4; // Loop through steps 0-3 (match number of steps)
        if (step === 0) {
          // After one complete cycle, clear the interval
          timeoutRef.current = setTimeout(() => setActiveStep(null), 1000);
          clearInterval(timerRef.current);
        }
      }, 1200);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isVisible]);

  const steps = [
    {
      number: "01",
      icon: <LogIn className="w-8 h-8" />,
      title: "Sign In",
      color: "from-green-500 to-teal-400",
      shadowColor: "shadow-blue-300",
      features: [
        "Log in using your email/password or Google account",
        "New users? Click Sign Up to create an account",
        "Access your wildlife dashboard"
      ]
    },
    {
      number: "02",
      icon: <Camera className="w-8 h-8" />,
      title: "Explore & Report Wildlife",
      color: "from-green-500 to-teal-400",
      shadowColor: "shadow-green-300",
      features: [
        "Visit the homepage to view updates on wildlife and conservation",
        "Report sightings or threats using the interactive map form",
        "Upload a photo, description, and location",
        "Engage with content about spotlight species and local conservation efforts"
      ]
    },
    {
      number: "03",
      icon: <HeartHandshake className="w-8 h-8" />,
      title: "Get Involved",
      color: "from-green-500 to-teal-400",
      shadowColor: "shadow-teal-300",
      features: [
        "Browse active conservation campaigns",
        "Contribute to fundraisers or awareness events directly through the platform"
      ]
    },
    {
      number: "04",
      icon: <Award className="w-8 h-8" />,
      title: "Photo Contest",
      color: "from-green-500 to-teal-400",
      shadowColor: "shadow-cyan-300",
      features: [
        "Submit your best wildlife photos to the EnFauna Photo Contest",
        "View the public gallery and vote",
        "Top photos are featured with full credits!"
      ]
    }
  ];

  // Background decoration elements
  const decorElements = [
    { top: '10%', left: '5%', size: 'w-24 h-24', delay: '0ms', rotate: '15deg' },
    { top: '30%', right: '8%', size: 'w-16 h-16', delay: '300ms', rotate: '-10deg' },
    { top: '70%', left: '10%', size: 'w-20 h-20', delay: '600ms', rotate: '20deg' },
    { top: '80%', right: '15%', size: 'w-32 h-32', delay: '900ms', rotate: '-15deg' },
  ];

  // Custom animation class for the shine effect
  const shineAnimation = {
    animation: 'shine 1.5s infinite linear',
  };

  return (
    <div 
      id="how-it-works-section" 
      className="relative container mx-auto px-4 py-16 bg-gradient-to-b from-white to-green-50 dark:from-slate-900 dark:to-slate-800 overflow-hidden rounded-xl"
    >
      {/* Decorative elements */}
      {decorElements.map((elem, idx) => (
        <div
          key={idx}
          className={`absolute ${elem.size} rounded-full bg-gradient-to-br from-green-100/30 to-teal-100/10 dark:from-green-900/20 dark:to-teal-900/5 backdrop-blur-md z-0`}
          style={{
            top: elem.top,
            left: elem.left,
            right: elem.right,
            transform: `rotate(${elem.rotate}) scale(${isVisible ? '1' : '0'})`,
            opacity: isVisible ? 0.7 : 0,
            transition: `all 1.2s ease-out ${elem.delay}`,
          }}
        />
      ))}

      {/* Connecting lines between steps */}
      <div className="absolute left-1/2 top-1/3 bottom-1/3 w-1 bg-gradient-to-b from-green-200 to-transparent transform -translate-x-1/2 z-0 opacity-50 hidden lg:block"></div>
      
      {/* Main content */}
      <div className={`relative z-10 text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6 relative inline-block">
          How This Site Works
          <div className={`absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent transition-all duration-1000 ${isVisible ? 'w-full' : 'w-0'}`}></div>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          EnFauna makes wildlife conservation accessible to everyone through our simple, interactive platform. Follow these steps to start making a difference today.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 relative z-10">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0' 
            }`}
            style={{ transitionDelay: `${200 + (index * 200)}ms` }}
            onMouseEnter={() => setHoverStep(index)}
            onMouseLeave={() => setHoverStep(null)}
          >
            {/* Card background with gradient border */}
            <div 
              className={`absolute inset-0 bg-white dark:bg-slate-800 rounded-2xl transition-all duration-500
              ${activeStep === index || hoverStep === index 
                ? 'scale-105 shadow-xl' 
                : 'scale-100 shadow-md'}`}
            ></div>
            
            {/* Gradient border effect */}
            <div 
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 transition-opacity duration-500 
              ${activeStep === index || hoverStep === index ? 'opacity-100' : ''}`} 
              style={{ padding: '2px' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-white dark:bg-slate-800"></div>
            </div>
            
            {/* Content wrapper */}
            <div className="relative p-6 flex flex-col items-center md:items-start md:flex-row gap-6">
              {/* Number/Icon Column */}
              <div className="flex flex-col items-center">
                {/* Number */}
                <div 
                  className={`text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br ${step.color} mb-4`}
                >
                  {step.number}
                </div>
                
                {/* Icon */}
                <div 
                  className={`p-4 rounded-full transition-all duration-500 
                  ${activeStep === index || hoverStep === index 
                    ? `bg-gradient-to-br ${step.color} text-white ${step.shadowColor} shadow-lg` 
                    : 'bg-green-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300'}`}
                >
                  {step.icon}
                </div>
              </div>
              
              {/* Content Column */}
              <div className="flex-1 text-center md:text-left">
                <h3 
                  className={`text-2xl font-semibold mb-4 transition-all duration-500 
                  ${activeStep === index || hoverStep === index 
                    ? `bg-clip-text text-transparent bg-gradient-to-r ${step.color}` 
                    : 'text-gray-800 dark:text-white'}`}
                >
                  {step.title}
                </h3>
                <ul className="space-y-3">
                  {step.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start transition-all duration-700"
                      style={{ 
                        transitionDelay: `${(index * 100) + (idx * 150)}ms`,
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(15px)' 
                      }}
                    >
                      <span 
                        className={`flex-shrink-0 inline-flex items-center justify-center w-5 h-5 mt-1 mr-2 rounded-full transition-all duration-300 
                        ${activeStep === index || hoverStep === index 
                          ? `bg-gradient-to-br ${step.color} scale-110` 
                          : 'bg-green-100 dark:bg-slate-700'}`}
                      >
                        <ChevronRight 
                          className={`w-3 h-3 transition-colors duration-300 
                          ${activeStep === index || hoverStep === index 
                            ? 'text-white' 
                            : 'text-green-600 dark:text-green-400'}`} 
                        />
                      </span>
                      <span className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* CTA Button */}
      <div 
        className={`relative z-10 mt-20 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`} 
        style={{ transitionDelay: '1000ms' }}
      >
        <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 overflow-hidden rounded-lg">
          {/* Button background with gradient */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 to-teal-500 group-hover:from-green-500 group-hover:to-teal-600"></div>
          
          {/* Shimmering effect - replacing custom animation with standard classes */}
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
          
          {/* Button text */}
          <span className="relative z-20 flex items-center">
            Get Started Today
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
      
      {/* Add global styles for any custom animations */}
      <style jsx global>{`
        @keyframes shine {
          from {
            transform: translateX(-100%) skewX(-12deg);
          }
          to {
            transform: translateX(200%) skewX(-12deg);
          }
        }
      `}</style>
    </div>
  );
};

export default HowEnFaunaWorks;