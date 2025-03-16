import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "950px",
  height: "400px",
};

const initialCenter = {
  lat: 6.927079,
  lng: 79.861244,
};

const GMap = ({ onLocationUpdate }) => {
  const [markerPosition, setMarkerPosition] = useState(initialCenter);
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [inputLat, setInputLat] = useState("");
  const [inputLng, setInputLng] = useState("");
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Update parent component with initial location
    if (onLocationUpdate) {
      onLocationUpdate(initialCenter.lat, initialCenter.lng);
    }
  }, []);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // Update marker and center
    setMarkerPosition({ lat, lng });
    setMapCenter({ lat, lng });

    // Update input fields
    setInputLat(lat.toFixed(6));
    setInputLng(lng.toFixed(6));

    // Update parent component
    if (onLocationUpdate) {
      onLocationUpdate(lat, lng);
    }
  };

  const handleInputChange = (type, value) => {
    const numValue = parseFloat(value);

    if (type === "lat") {
      setInputLat(value);
      if (!isNaN(numValue) && numValue >= -90 && numValue <= 90) {
        const newPosition = { lat: numValue, lng: markerPosition.lng };
        setMarkerPosition(newPosition);
        setMapCenter(newPosition);
        if (onLocationUpdate) {
          onLocationUpdate(numValue, markerPosition.lng);
        }
      }
    } else if (type === "lng") {
      setInputLng(value);
      if (!isNaN(numValue) && numValue >= -180 && numValue <= 180) {
        const newPosition = { lat: markerPosition.lat, lng: numValue };
        setMarkerPosition(newPosition);
        setMapCenter(newPosition);
        if (onLocationUpdate) {
          onLocationUpdate(markerPosition.lat, numValue);
        }
      }
    }
  };

  const handleShowLocation = () => {
    const lat = parseFloat(inputLat);
    const lng = parseFloat(inputLng);

    if (
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    ) {
      const newPosition = { lat, lng };
      setMapCenter(newPosition);
      setMarkerPosition(newPosition);
      if (onLocationUpdate) {
        onLocationUpdate(lat, lng);
      }
      // Smoothly pan to the new location
      if (map) {
        map.panTo(newPosition);
      }
    } else {
      alert(
        "Please enter valid coordinates:\nLatitude: -90 to 90\nLongitude: -180 to 180"
      );
    }
  };

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  return (
    <div className="space-y-4">
      <div className="w-full border rounded-lg overflow-hidden">
        <LoadScript googleMapsApiKey="AIzaSyB9bggsG3MoaHqtDNkR28djxdNR0J-YNsQ">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={10}
            onClick={handleMapClick}
            onLoad={onLoad}
            options={{
              streetViewControl: false,
              mapTypeControl: true,
              fullscreenControl: true,
              zoomControl: true,
            }}
          >
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="flex-1 min-w-[200px]">
          <input
            type="number"
            value={inputLat}
            onChange={(e) => handleInputChange("lat", e.target.value)}
            placeholder="Enter Latitude"
            min="-90"
            max="90"
            step="0.000001"
            className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <input
            type="number"
            value={inputLng}
            onChange={(e) => handleInputChange("lng", e.target.value)}
            placeholder="Enter Longitude"
            min="-180"
            max="180"
            step="0.000001"
            className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <button
          onClick={handleShowLocation}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
        >
          Show Location
        </button>
      </div>
    </div>
  );
};

export default GMap;
