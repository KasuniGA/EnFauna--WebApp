import React from 'react';
import jaguarIconLight from '../assets/jaguar-b.png'; // 

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-bl from-green-100 via-green-300 to-green-200 ">
      {/* Use the SVG as an image */}
      <img src={jaguarIconLight } alt="Loading" className="h-48 w-48 animate-pulse" />
      <h1 className="text-4xl font-semibold text-gray-800 ">EnFauna</h1>
      <h2 className=''></h2>
      <p className="mt-4 text-lg text-gray-700">Loading...</p>
    </div>
  );
};

export default Loading;
