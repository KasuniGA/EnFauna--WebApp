import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Search, FileText, Info, HelpCircle } from 'lucide-react';

const FAQs = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "How do I report a wildlife sighting?",
      answer: "To report a wildlife sighting, follow these steps: Go to the Report Wildlife Sighting section on our platform. Fill in the required details, including the location, species (if known), and any additional notes. Optionally, upload a photo for better identification."
    },
    {
      question: "What is EnFauna's mission?", 
      answer: "EnFauna is dedicated to the conservation of Sri Lanka's wildlife through awareness, reporting, and community-driven initiatives. Our goal is to protect endangered species and their habitats while fostering public engagement."
    },
    {
      question: "Can I volunteer or contribute to EnFauna's projects?",
      answer: "Yes, we welcome support from volunteers and contributors! Visit our Get Involved page to learn more about ongoing initiatives and how you can help."
    },
    {
      question: "How are my contributions used?",
      answer: "Funds and resources collected through EnFauna are directly allocated to wildlife conservation projects, awareness campaigns, and supporting local conservation organizations."
    },
    {
      question: "Who can access my reported data?",
      answer: "We prioritize user privacy. Reported data is shared only with relevant conservation authorities and researchers to ensure it is used responsibly."
    }
  ];

  const resources = [
    {
      title: "How to Report a Wildlife Sighting",
      description: "A step-by-step guide on identifying, documenting, and reporting wildlife sightings.",
      steps: [
        "Open the \"Report a Sighting\" page.",
        "Provide the location (using GPS if possible).",
        "Describe the wildlife species or features.",
        "Upload an image or video (optional).",
        "Submit the report."
      ]
    },
    {
      title: "Learn About Conservation",
      description: "Discover actionable ways to protect Sri Lanka's rich biodiversity.",
      sections: [
        "Educational Articles: Read about local species and ecosystems.",
        "Events and Campaigns: Join ongoing conservation events.",
        "Tips for Sustainable Living: Learn how small changes in daily life can contribute to wildlife protection."
      ]
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-200 dark:bg-gray-900 p-6 pt-24">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 dark:text-white mb-4">FAQs and Resources</h1>
          <p className="text-green-600 dark:text-gray-300 max-w-xl mx-auto">
            Welcome to our FAQs and Resources page! Here, you'll find answers to common questions and helpful guides to make the most of your EnFauna experience.
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <input 
            type="text" 
            placeholder="Search FAQs and Resources" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 border border-green-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300"
          />
          <Search className="absolute left-3 top-3.5 text-green-500 dark:text-green-400" />
        </div>

        {/* FAQs Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-white mb-6 flex items-center">
            <HelpCircle className="mr-3 text-green-600 dark:text-green-400" /> 
            Frequently Asked Questions
          </h2>
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="mb-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
              <div 
                onClick={() => setActiveSection(activeSection === index ? null : index)}
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-green-50 dark:hover:bg-gray-700 transition"
              >
                <h3 className="font-medium text-green-800 dark:text-gray-300">{faq.question}</h3>
                {activeSection === index ? <ChevronDown className="text-green-600 dark:text-green-400" /> : <ChevronRight className="text-green-600 dark:text-green-400" />}
              </div>
              {activeSection === index && (
                <div className="p-4 pt-0 text-green-700 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Resources Section */}
        <section>
          <h2 className="text-2xl font-semibold text-green-700 dark:text-white mb-6 flex items-center">
            <FileText className="mr-3 text-green-600 dark:text-green-400" /> 
            Helpful Resources
          </h2>
          {resources.map((resource, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-green-800 dark:text-gray-300 mb-4">{resource.title}</h3>
              <p className="text-green-600 dark:text-gray-300 mb-4">{resource.description}</p>
              {resource.steps && (
                <div>
                  <h4 className="font-medium text-green-700 dark:text-gray-400 mb-2">Quick Steps:</h4>
                  <ol className="list-decimal list-inside text-green-700 dark:text-gray-400">
                    {resource.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="mb-1">{step}</li>
                    ))}
                  </ol>
                </div>
              )}
              {resource.sections && (
                <ul className="list-disc list-inside text-green-700 dark:text-gray-400">
                  {resource.sections.map((section, sectionIndex) => (
                    <li key={sectionIndex} className="mb-1">{section}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        {/* Contact Section */}
        <section className="text-center bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-green-800 dark:text-white mb-4">
            <Info className="inline-block mr-3 text-green-600 dark:text-green-400" />
            Can't find what you're looking for?
          </h2>
          <p className="text-green-600 dark:text-gray-300 mb-6">
            If your question isn't answered here, feel free to contact us for personalized assistance.
          </p>
          <Link to="/contact">
            <button className="bg-green-600 dark:bg-green-500 text-white px-6 py-3 rounded-3xl hover:bg-green-700 dark:hover:bg-green-600 transition">
              Contact Us
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default FAQs;
