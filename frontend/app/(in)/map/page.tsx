"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

const SOS = () => {
  const [nfcLocation, setNfcLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [deviceLocation, setDeviceLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    // Parse the query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const locationData = params.get("location"); // Get the 'location' query parameter
    if (locationData) {
      const [latStr, lngStr] = locationData.split(","); // Split into latitude and longitude
      const latitude = parseFloat(latStr);
      const longitude = parseFloat(lngStr);
      setNfcLocation({ latitude, longitude });
    }
  }, []);

  useEffect(() => {
    // Get the device's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDeviceLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting device location:", error);
          // Handle the error as needed
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Content Area */}
      <div className="flex-grow overflow-auto">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Drowning Detection App</h1>
          {nfcLocation ? (
            <p>
              NFC Tag Location: Latitude {nfcLocation.latitude}, Longitude{" "}
              {nfcLocation.longitude}
            </p>
          ) : (
            <p>No NFC location data found.</p>
          )}

          <div className="relative flex justify-center items-center w-full max-w-xs mx-auto h-[700px] bg-gray-300 rounded-xl overflow-hidden mt-4">
            {deviceLocation ? (
              <DynamicMap deviceLocation={deviceLocation} />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <p className="text-gray-700">Location not available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="h-16 bg-gray-800 text-white flex items-center justify-around">
        {/* Navbar content goes here */}
        <button className="focus:outline-none">
          {/* Icon or text for Home */}
          Home
        </button>
        <button className="focus:outline-none">
          {/* Icon or text for Settings */}
          Settings
        </button>
        <button className="focus:outline-none">
          {/* Icon or text for Profile */}
          Profile
        </button>
      </div>
    </div>
  );
};

export default SOS;
