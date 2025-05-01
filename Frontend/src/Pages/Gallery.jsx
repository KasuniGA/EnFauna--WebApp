"use client"

import { useState, useEffect } from "react"
import { usePhotoStore } from "../store/photo.store.js"
import PhotoCard from "../components/PhotoCard.jsx"
import { Camera, Loader } from "lucide-react"
import Toast from "../Components/Toast.jsx"

function Gallery() {
  const [expandedIndex, setExpandedIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({
    title: "",
    description: "",
  })

  const { photos, fetchPhotos } = usePhotoStore()

  // Featured images for the carousel
  const panels = [
    { image: "https://i.pinimg.com/736x/51/42/0a/51420a6b221420a050296014484c6a93.jpg" },
    { image: "https://i.pinimg.com/736x/cc/3a/2b/cc3a2bb3103565fb5baf22e4b6f3e826.jpg" },
    { image: "https://i.pinimg.com/736x/22/36/25/223625ed84997c2ce796a3b16d8065de.jpg" },
    { image: "https://i.pinimg.com/474x/80/43/0f/80430fb51ee59f7afeb507a7c372d39c.jpg" },
    { image: "https://i.pinimg.com/474x/33/6a/1b/336a1bdab6de150cd941fa9a1b1bcc7f.jpg" },
    { image: "https://i.pinimg.com/474x/3b/4f/b4/3b4fb439c8f5b4746fef05bb6d3ec77d.jpg" },
    { image: "https://i.pinimg.com/474x/c3/16/2d/c3162d92b7ec860cd6c0f772b16f8792.jpg" },
    { image: "https://i.pinimg.com/474x/b0/42/52/b04252b36e913848b706961eb94f145e.jpg" },
  ]

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true)
      try {
        const result = await fetchPhotos()
        if (!result.success) {
          showToastMessage("Error", result.message || "Failed to load photos")
        }
      } catch (error) {
        console.error("Error loading photos:", error)
        showToastMessage("Error", "Failed to load photos")
      } finally {
        setLoading(false)
      }
    }

    loadPhotos()
  }, [fetchPhotos])

  const handleClick = (index) => {
    setExpandedIndex(index)
  }

  const showToastMessage = (title, description) => {
    setToastMessage({ title, description })
    setShowToast(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-white/0 dark:bg-black/80 backdrop-blur-sm p-4 pt-24">
        <h1 className="text-gray-900 dark:text-gray-100 text-2xl md:text-4xl font-bold text-center">Image Gallery</h1>
      </header>

      {/* Main Content */}
      <main className="pt-40 px-2 md:px-4 pb-4">
        {/* Background Image */}
        <div
          className="fixed inset-0 z-0 opacity-30 transition-all duration-500"
          style={{
            backgroundImage: `url(${panels[expandedIndex].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)",
          }}
        />

        {/* Gallery Grid */}
        <div className="relative z-10 mb-12">
          {/* Large Display - Expanded View */}
          <div className="hidden md:flex gap-2 h-[80vh] w-full">
            {panels.map((panel, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={`relative rounded-xl overflow-hidden cursor-pointer
                  transition-all duration-500 ease-in-out
                  ${expandedIndex === index ? "w-2/5" : "w-[8%] hover:w-[12%]"}`}
              >
                <img
                  src={panel.image || "/placeholder.svg"}
                  alt={`Panel ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Mobile View - Grid Layout */}
          <div className="grid grid-cols-2 md:hidden gap-2">
            {panels.map((panel, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={`relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer
                  transition-all duration-300
                  ${expandedIndex === index ? "col-span-2 row-span-2" : ""}`}
              >
                <img
                  src={panel.image || "/placeholder.svg"}
                  alt={`Panel ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                {expandedIndex === index && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Community Uploads Section */}
        <div className="relative z-10 mt-16">
          <div className="flex items-center gap-3 mb-6">
            <Camera className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">Community Uploads</h2>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading photos...</p>
            </div>
          ) : photos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <PhotoCard key={photo._id} photo={photo} />
              ))}
            </div>
          ) : (
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-8 text-center">
              <Camera className="w-16 h-16 mx-auto text-emerald-500 opacity-50 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">No Photos Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Be the first to share your wildlife photography with the community!
              </p>
              <a
                href="/upload"
                className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
              >
                Upload a Photo
              </a>
            </div>
          )}
        </div>

        {/* Toast Notification */}
        <Toast
          isVisible={showToast}
          message={toastMessage.title}
          description={toastMessage.description}
          onClose={() => setShowToast(false)}
        />
      </main>
    </div>
  )
}

export default Gallery
