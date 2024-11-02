"use client";

import React, { useEffect, useState } from "react";

const SOS = () => {
  const [location, setLocation] = useState<{
    latitude: string;
    longitude: string;
  } | null>(null);

  useEffect(() => {
    // Check if there's a location hash in the URL
    const hash = window.location.hash;
    if (hash.startsWith("#location=")) {
      const locationData = hash.replace("#location=", ""); // Get the coordinates string
      const [latitude, longitude] = locationData.split(","); // Split into latitude and longitude

      setLocation({ latitude, longitude });
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Drowning Detection App</h1>
      {location ? (
        <p>
          NFC Tag Location: Latitude {location.latitude}, Longitude{" "}
          {location.longitude}
        </p>
      ) : (
        <p>No location data found.</p>
      )}
    </div>
  );
};

export default SOS;
