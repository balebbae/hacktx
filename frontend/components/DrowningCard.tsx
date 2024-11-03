// components/DrowningCard.tsx

"use client";

import React, { useEffect, useState } from "react";
import Alert from "@/assets/alert-circle.svg"; // Replace with your icon path or import from an icon library

const DrowningCard = () => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      // Make a POST request to the server-side endpoint to initiate the call
      fetch("/api/makeCall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include any necessary authentication headers here
        },
        body: JSON.stringify({
          // Include any necessary data here
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Call initiated successfully");
          } else {
            console.error("Failed to initiate call");
          }
        })
        .catch((error) => {
          console.error("Error initiating call:", error);
        });
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleCancel = () => {
    console.log("Alert canceled.");
    setCountdown(10);
    // Optionally, you can redirect or perform other actions here
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-red-400 text-white p-4">
      <div className="max-w-md w-full bg-white text-red-700 rounded-lg shadow-lg p-6 flex flex-col items-center">
        {/* Warning Icon */}
        <div className="flex items-center justify-center bg-red-500 text-white rounded-full w-16 h-16 mb-4">
          <Alert className="h-8 w-8" />
        </div>

        {/* Alert Message */}
        <h2 className="text-2xl font-bold mb-2">Alert! Drowning Detected!</h2>
        <p className="text-center mb-4">
          We will contact the authorities in{" "}
          <span className="font-bold">{countdown}</span> seconds if you do not
          cancel.
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-200 text-red-700 rounded-full font-semibold hover:bg-gray-300 transition"
          >
            Cancel Alert
          </button>

          {/* Call 911 Button */}
          <a
            href="tel:911"
            className="px-6 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition"
          >
            Call 911
          </a>
        </div>
      </div>
    </div>
  );
};

export default DrowningCard;
