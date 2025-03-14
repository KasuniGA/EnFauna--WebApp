import React, { useState } from 'react';
import { Upload, X, Check, Camera } from 'lucide-react';

const CustomAlert = ({ variant = 'default', children }) => {
  const styles = {
    default: 'bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700',
    error: 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800',
    success: 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800'
  };

  return (
    <div className={`flex items-center gap-2 p-4 rounded-lg border ${styles[variant]}`}>
      {children}
    </div>
  );
};

const PhotoUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    species: '',
    customSpecies: '',
    location: '',
    customLocation: ''
  });

  const speciesList = [
    "Sri Lankan Elephant",
    "Sri Lankan Leopard",
    "Purple-faced Langur",
    "Toque Macaque",
    "Other"
  ];

  const locationsList = [
    "Yala National Park",
    "Udawalawe National Park",
    "Sinharaja Forest",
    "Wilpattu National Park",
    "Other"
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError(null);
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file (JPG, PNG)');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select an image to upload');
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedFile(null);
        setPreview(null);
        setFormData({
          name: '',
          title: '',
          description: '',
          species: '',
          customSpecies: '',
          location: '',
          customLocation: ''
        });
      }, 2000);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-green-200 dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-800 pt-28 pb-12">
      <div className="flex items-center gap-2 mb-6">
        <Camera className="w-6 h-6 text-green-600 dark:text-green-500" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Upload Wildlife Photo</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload Area */}
        <div className="relative">
          {!preview ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-green-500 dark:hover:border-green-500 transition-colors">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
              <p className="text-gray-600 dark:text-gray-300">Drag and drop your photo here or click to browse</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Maximum file size: 10MB (JPG, PNG)</p>
            </div>
          ) : (
            <div className="relative">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreview(null);
                }}
                className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-4 h-4 dark:text-gray-300" />
              </button>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg bg-green-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Give your photo a title"
              className="w-full px-4 py-2 border rounded-lg bg-green-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Tell us about your photo"
              rows="3"
              className="w-full px-4 py-2 border rounded-lg bg-green-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Species
              </label>
              <select
                value={formData.species}
                onChange={(e) => setFormData({...formData, species: e.target.value, customSpecies: ''})}
                className="w-full px-4 py-2 border rounded-lg bg-green-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Species</option>
                {speciesList.map((species) => (
                  <option key={species} value={species}>{species}</option>
                ))}
              </select>
              {formData.species === 'Other' && (
                <input
                  type="text"
                  value={formData.customSpecies}
                  onChange={(e) => setFormData({...formData, customSpecies: e.target.value})}
                  placeholder="Enter species name"
                  className="w-full px-4 py-2 border rounded-lg bg-green-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 dark:placeholder-gray-500"
                />
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Location
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value, customLocation: ''})}
                className="w-full px-4 py-2 border rounded-lg bg-green-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Location</option>
                {locationsList.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              {formData.location === 'Other' && (
                <input
                  type="text"
                  value={formData.customLocation}
                  onChange={(e) => setFormData({...formData, customLocation: e.target.value})}
                  placeholder="Enter location name"
                  className="w-full px-4 py-2 border rounded-lg bg-green-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 dark:placeholder-gray-500"
                />
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <CustomAlert variant="error">
            <X className="w-4 h-4" />
            <span>{error}</span>
          </CustomAlert>
        )}

        {/* Success Message */}
        {success && (
          <CustomAlert variant="success">
            <Check className="w-4 h-4" />
            <span>Photo uploaded successfully!</span>
          </CustomAlert>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !selectedFile}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2
            ${loading || !selectedFile 
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
              : 'bg-green-600 dark:bg-green-600 hover:bg-green-700 dark:hover:bg-green-700'}`}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Upload Photo
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PhotoUploadForm;