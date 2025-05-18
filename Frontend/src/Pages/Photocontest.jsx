import React, { useState, useEffect } from "react";
import {
  Camera,
  Heart,
  Calendar,
  Award,
  ChevronDown,
  Trophy,
  Users,
  Eye,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { usePhotoStore } from "../store/photo.store.js";

const ContestBanner = ({ contest }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-400 to-orange-500  text-white p-8 mb-8 shadow-lg">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></div>
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-8 h-8 text-yellow-300" />
          <h2 className="text-3xl font-bold">
            Current Contest: {contest.title}
          </h2>
        </div>
        <div className="mb-6 space-y-2">
          <p className="text-xl text-white/90">{contest.description}</p>
          <p className="text-lg font-medium">
            1st three places will display on the website
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-2 mt-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Users className="w-5 h-5" />
              <span className="text-lg font-medium">Entries</span>
            </div>
            <span className="text-3xl font-bold">{contest.entries}</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Calendar className="w-5 h-5" />
              <span className="text-lg font-medium">Days Left</span>
            </div>
            <span className="text-3xl font-bold">{contest.daysLeft}</span>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
        <Award className="w-48 h-48 text-white/10" />
      </div>
    </div>
  );
};

const PhotoCard = ({ photo, rank, onViewDetails }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative">
        <img
          src={photo.image}
          alt={photo.title}
          className="w-full h-96 object-cover"
        />
        {rank && (
          <div className="absolute bottom-4 right-4 bg-yellow-400 dark:bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
            {rank}
          </div>
        )}
        <button className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Heart className="w-5 h-5 text-red-500" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
          {photo.title}
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <p>By {photo.photographer}</p>
          <p>Location: {photo.location}</p>
          <p>Species: {photo.species}</p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Heart className="w-4 h-4" />
            <span>{photo.votes} votes</span>
          </div>
          <button
            onClick={onViewDetails}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const PhotoPopup = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <div className="flex flex-col lg:flex-row">
          <img
            src={photo.image}
            alt={photo.title}
            className="w-full lg:w-1/2 object-cover"
          />
          <div className="p-6 flex-1">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {photo.title}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 space-y-2">
              <p>
                <strong>Photographer:</strong> {photo.photographer}
              </p>
              <p>
                <strong>Location:</strong> {photo.location}
              </p>
              <p>
                <strong>Species:</strong> {photo.species}
              </p>
              <p>
                <strong>Votes:</strong> {photo.votes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Photocontest = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [latestPhotos, setLatestPhotos] = useState([]);
  const { photos: allPhotos, fetchPhotos } = usePhotoStore();

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        if (allPhotos.length === 0) {
          await fetchPhotos();
        }

        // Transform photos to match PhotoCard's expected structure
        const transformedPhotos = allPhotos
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3)
          .map((photo) => ({
            // Map your store's photo structure to what PhotoCard expects
            id: photo._id,
            title: photo.title || "Untitled",
            photographer: photo.photographer || photo.name || "Anonymous",
            location: photo.location || "Unknown location",
            species: photo.species || "Unknown species",
            votes: photo.votes || photo.likes?.count || 0,
            image: photo.imageUrl || photo.url || "/placeholder.jpg",
            // Add any other fields your PhotoCard might need
            ...photo, // Spread the rest of the photo data
          }));

        setLatestPhotos(transformedPhotos);
      } catch (error) {
        console.error("Failed to load contest photos:", error);
        // Fallback data if needed
        setLatestPhotos([
          {
            id: "1",
            title: "Spotted friend",
            photographer: "Community",
            location: "Wasgamuwa",
            species: "Leopard",
            votes: 0,
            image: "/placeholder-leopard.jpg",
          },
          // Add more fallbacks if needed
        ]);
      }
    };

    loadPhotos();
  }, [allPhotos, fetchPhotos]);

  const activeContest = {
    title: "Wildlife in Action",
    description:
      "Capture the dynamic moments of Sri Lankan wildlife in their natural habitat.",
    entries: allPhotos.length, // Use actual photo count
    daysLeft: 7,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-green-700 dark:bg-green-800 text-white pt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Wildlife Photography</h1>
            <Link to="/photouploadform">
              <button className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Camera className="w-5 h-5" />
                Upload Photo
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ContestBanner contest={activeContest} />

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Photographs of the latest contest
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPhotos.map((photo, index) => (
              <div key={photo.id} className="h-full">
                <PhotoCard
                  photo={photo}
                  // rank={index + 1}
                  onViewDetails={() => setSelectedPhoto(photo)}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedPhoto && (
        <PhotoPopup
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
};

export default Photocontest;
