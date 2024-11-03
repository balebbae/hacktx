"use client";

// components/WebcamStream.tsx
import React, { useEffect, useRef } from "react";

interface WebcamStreamProps {
  onFrameCaptured: (base64Image: string) => void;
}

const WebcamStream: React.FC<WebcamStreamProps> = ({ onFrameCaptured }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch((error) => {
              console.error("Error playing video:", error);
            });
          };
          startVideoProcessing();
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startVideoProcessing = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const captureFrame = () => {
        if (video.paused || video.ended) return;

        canvas.width = 320;
        canvas.height = 240;

        const context = canvas.getContext("2d");

        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          const dataURL = canvas.toDataURL("image/jpeg", 0.5);
          const base64Image = dataURL.split(",")[1];

          onFrameCaptured(base64Image);
        }
      };

      intervalRef.current = setInterval(captureFrame, 500);
    }
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default WebcamStream;
