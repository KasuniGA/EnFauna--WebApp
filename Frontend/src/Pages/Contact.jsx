import React, { useState, useRef } from 'react';
import bgImage from '../assets/bird.jpg'; 
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    attachment: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const form = useRef();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill out all required fields');
      return;
    }

    emailjs
    .sendForm('service_dcm96j1', 'template_v94pd2m', form.current, 'ilcUJ_-bR8Diz7qzH')
    .then(
      () => {
        console.log('SUCCESS!');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: '', email: '', subject: '', message: '', attachment: null });
      },
      (error) => {
        console.error('FAILED...', error); // Log full error object
      }
    );
  
  };

  return (
    <div className="relative bg-gradient-to-br from-green-100 via-green-700 to-white \
                    dark:from-blue-900 dark:via-gray-900 dark:to-grey-800 \
                    min-h-screen text-gray-900 dark:text-gray-100 \
                    transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8 pt-24">
      {/* Hero Section */}
      <div
        className="relative bg-black bg-opacity-70 text-white text-center py-24 mb-8 shadow-md rounded-xl overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-10 dark:bg-opacity-50 backdrop-blur-0"></div>
        <h1 className="relative text-4xl font-bold">Contact Us</h1>
      </div>

      {/* Main Content */}
      <div className="relative max-w mx-auto bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden">
        <div className="p-8 space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-green-600 dark:text-green-500">
              Get in Touch with EnFauna
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              We'd love to hear from you! Whether you're here to report a problem, 
              share your feedback, or ask a question, we're here to help.
            </p>
          </div>

          {submitted ? (
            <div
              className="bg-green-100 dark:bg-green-200 border border-green-400 text-green-700 dark:text-green-800 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">Thank you for your message! We'll respond within 48 hours.</span>
            </div>
          ) : (
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300"
                    placeholder="Your Email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  rows={4}
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300"
                >
                  <option value="">Select a Subject</option>
                  <option value="Report a problem">Report a problem</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Feedback/Suggestion">Feedback/Suggestion</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="attachment"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Attachment (Optional)
                </label>
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  onChange={handleInputChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-gray-700 dark:file:text-gray-200 dark:hover:file:bg-gray-600"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-green-600 dark:bg-green-500 text-white py-2 px-6 rounded-3xl hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
                >
                  Submit Message
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400">We'll respond within 48 hours</p>
              </div>
            </form>
          )}

          {/* Contact Information Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 space-y-8">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-green-700 dark:text-white">Contact Information</h2>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Mail className="mr-2 text-green-600 dark:text-green-400" size={20} />
                  <span>enfauna.project24@gmail.com</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Phone className="mr-2 text-green-600 dark:text-green-400" size={20} />
                    <span>+94 11 2 345 678</span>
                  </div>
              </div>

              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-600 transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-blue-400 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                  <Twitter size={24} />
                </a>
              </div>
            </div>

            {/* Hotlines Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-green-700 dark:text-white">Hotlines</h2>
              
              {/* First Department */}
              <div className="space-y-3">
                <h3 className="text-gray-600 dark:text-gray-300 font-extralight">
                  Department of Wildlife Conservation
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Mail className="mr-2 text-green-600 dark:text-green-400" size={20} />
                    <span>dg@dwc.gov.lk</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Phone className="mr-2 text-green-600 dark:text-green-400" size={20} />
                    <span>1992</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Phone className="mr-2 text-green-600 dark:text-green-400" size={20} />
                    <span>+94 11 2 888 585</span>
                  </div>
                </div>
              </div>

              {/* Second Department */}
              <div className="space-y-3">
                <h3 className="text-gray-600 dark:text-gray-300 font-extralight">
                Ministry of Wildlife and Forest Resources Conservation
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Mail className="mr-2 text-green-600 dark:text-green-400" size={20} />
                    <span>info@mwfc.gov.lk</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Phone className="mr-2 text-green-600 dark:text-green-400" size={20} />
                    <span>+94 11 367 1490</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-green-700 dark:text-white">FAQs</h2>
              <div className="flex space-x-4 text-sm">
                <a href="/faqs" className="text-green-600 dark:text-green-400 hover:underline">
                  How to Report a Wildlife Sighting
                </a>
                <a href="/faqs" className="text-green-600 dark:text-green-400 hover:underline">
                  Learn About Conservation Efforts
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="mt-8 mx-auto max-w relative text-center">
        <div className="absolute inset-0 bg-red-100 dark:bg-red-700/50 backdrop-blur-sm rounded-lg"></div>
        <p className="relative z-10 text-red-600 dark:text-red-400 p-4 text-sm font-semibold">
          For urgent wildlife-related emergencies, please contact local wildlife authorities immediately.
        </p>
      </div>
    </div>
  );
};

export default Contact;