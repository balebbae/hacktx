"use client";

import React, { useEffect, useState } from "react";
import DrownDetection from "@/components/DrownDetection";
import { SocketProvider } from "@/components/SocketContext";

const Camera = () => {
  const [location, setLocation] = useState<{
    latitude: string;
    longitude: string;
  } | null>(null);

  useEffect(() => {
    // Parse the query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const locationData = params.get("location"); // Get the 'location' query parameter
    if (locationData) {
      const [latitude, longitude] = locationData.split(","); // Split into latitude and longitude
      setLocation({ latitude, longitude });
    }
  }, []);
  return (
    <div>
      {location ? (
        <div className="w-full text-xl font-bold text-center ">
          NFC Tag Location: Latitude {location.latitude}, Longitude{" "}
          {location.longitude}
        </div>
      ) : (
        <div className="w-full text-xl font-bold text-center mb-[-20px] mt-">
          No location data found.
        </div>
      )}
      <SocketProvider>
        <DrownDetection />
      </SocketProvider>
    </div>
  );
};

export default Camera;
