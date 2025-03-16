import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import logo from '../assets/jaguar.png';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 py-6 border-t">
      <div className="container mx-auto text-center">
        <img src={logo} alt="EnFauna Logo" className="h-32 w-32 mx-auto mb-4 " />  {/* Centered logo */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="/about-us" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">About</a>
          <a href="/faqs" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">FAQs</a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Blog</a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Accessibility</a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Partners</a>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-600">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-600">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-600">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <p className="text-gray-600 dark:text-gray-300">© 2024 EnFauna, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
