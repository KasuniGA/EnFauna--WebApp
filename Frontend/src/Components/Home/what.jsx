import React from 'react';
import { TreePine, Camera, Globe, Users } from 'lucide-react';

const EnFaunaLanding = () => {
  const objectives = [
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "Wildlife Awareness & Engagement",
      description: "Educating about endangered species, habitats, and conservation challenges"
    },
    {
      icon: <Camera className="w-8 h-8 text-blue-600" />,
      title: "Crowdsourced Wildlife Reporting",
      description: "Real-time reporting of wildlife sightings and environmental threats"
    },
    {
      icon: <TreePine className="w-8 h-8 text-emerald-600" />,
      title: "Conservation-Focused Fundraising",
      description: "Connecting donors and organizations with conservation projects"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Community Involvement",
      description: "Engaging travelers, students, and nature enthusiasts"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center bg-white dark:bg-slate-900">
      {/* Text Section */}
      <div>
        <h2 className="text-4xl font-bold  text-gray-800 dark:text-white mb-6">What is EnFauna?</h2>
        <p className="text-gray-600  dark:text-gray-400 mb-8 leading-relaxed">
          EnFauna is an integrated wildlife conservation platform dedicated to protecting 
          Sri Lanka's endangered species through awareness, reporting, and fundraising initiatives. 
          This platform bridges the gap between conservationists, researchers, wildlife authorities, 
          and the general public, enabling collaborative efforts to safeguard biodiversity.
        </p>

        {/* Objectives Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {objectives.map((obj, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all group"
            >
              <div className="flex items-center mb-3">
                {obj.icon}
                <h3 className="ml-3 font-semibold text-gray-800 dark:text-white group-hover:text-green-600 transition-colors">
                  {obj.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{obj.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Image Section - Mimicking Reference Design */}
      <div className="relative">
        <div className="bg-orange-100/50 rounded-full w-full h-[500px] absolute top-0 left-0 -z-10"></div>
        <img 
          src="https://images.pexels.com/photos/751689/pexels-photo-751689.jpeg?auto=compress&cs=tinysrgb&w=600" 
          alt="Wildlife Conservation" 
          className="rounded-3xl shadow-2xl object-cover w-full h-[500px]"
        />
      </div>
    </div>
  );
};

export default EnFaunaLanding;