"use client";

import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketContext";
import WebcamStream from "@/components/WebcamStreamCapture";
import DrowningCard from "./DrowningCard";

const DrownDetection: React.FC = () => {
  const { socket } = useContext(SocketContext);
  const [isAlert, setIsAlert] = useState(false);
  const warningSound =
    typeof Audio !== "undefined" ? new Audio("/sounds/warning.wav") : null;

  useEffect(() => {
    if (socket) {
      socket.on("drowning_status", (data: any) => {
        console.log("Received drowning_status:", data);
        if (data.error) {
          console.error("Server error:", data.error);
        } else {
          setIsAlert(data.is_drowning);
        }
      });
    }

    // Cleanup on component unmount
    return () => {
      if (socket) {
        socket.off("drowning_status");
      }
    };
  }, [socket]);

  useEffect(() => {
    // Play warning sound when isAlert becomes true
    if (isAlert && warningSound) {
      warningSound.loop = true; // Loop the sound for continuous alert
      warningSound
        .play()
        .catch((error) => console.error("Failed to play sound:", error));
    } else if (warningSound) {
      // Pause the sound when the alert is canceled
      warningSound.pause();
      warningSound.currentTime = 0; // Reset sound to start
    }

    // Cleanup to stop the sound when component unmounts
    return () => {
      if (warningSound) {
        warningSound.pause();
        warningSound.currentTime = 0;
      }
    };
  }, [isAlert, warningSound]);

  const handleFrameCaptured = (base64Image: string) => {
    if (!socket || !socket.connected) {
      console.error("Socket not connected yet");
      return;
    }

    if (!base64Image) {
      console.error("Captured image is empty or undefined");
      return;
    }

    console.log(`Emitting frame of size: ${base64Image.length}`);
    socket.emit("frame", { frame: base64Image });
  };

  if (!socket) {
    return <div>Connecting to server...</div>; // Show a loading state while the socket is being initialized
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {!isAlert && (
        <div className="relative w-full max-w-xs h-[600px] bg-black rounded-xl overflow-hidden mb-12">
          <WebcamStream onFrameCaptured={handleFrameCaptured} />
          <div className="absolute top-0 left-0 right-0 text-center text-white p-4 mb-4 ">
            You are not drowning
          </div>
        </div>
      )}
      <DrowningCard />
    </div>
  );
};

export default DrownDetection;
