"use client";

import React, { useEffect, useRef, useState } from 'react';

interface Prediction {
  predictions: Array<{
    class: string;
    confidence: number;
    bbox: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }>;
}

const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((error) => console.error("Error accessing camera: ", error));

    const interval = setInterval(captureAndSendFrame, 5000);

    return () => clearInterval(interval);
  }, []);

  const captureAndSendFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Convert canvas to base64
    const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];

    sendImageToBackend(base64Image);
  };

  const sendImageToBackend = async (base64Image: string) => {
    try {
      console.log("Sending request to Flask...");
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });
      console.log("Received response:", response);

      if (response.ok) {
        const result: Prediction = await response.json();
        console.log("API response:", result);
        setPrediction(result);
      } else {
        console.error("Error from Flask API:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending image to Flask:", error);
    }
  };

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%", height: "auto" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} width={640} height={480} />

      {prediction && (
        <div>
          <h3>Prediction Results:</h3>
          <pre>{JSON.stringify(prediction, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CameraComponent;