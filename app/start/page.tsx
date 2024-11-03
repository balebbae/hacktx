"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Watch from "@/assets/watch.svg";
import Looker from "@/assets/looking.svg";
import Alerter from "@/assets/alertdraw.svg";
export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-12 bg-next text-center">
      {currentStep === 1 && (
        <div className="flex flex-col items-center mb-20">
          <Watch className="h-60 w-60 mb-10 mt-20" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-4">
            What is Aqua Sentry?
          </h2>
          <p className="text-gray-700">
            Aqua Sentry is a safety app designed to monitor. We are another pair
            or eyes.
          </p>
        </div>
      )}

      {currentStep === 2 && (
        <div className="flex flex-col items-center mb-20">
          <Looker className="h-60 w-60 mb-10 mt-20" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-4">Set Up</h2>
          <p className="text-gray-700">
            Mount your phone to face the water and start monitoring.
          </p>
        </div>
      )}

      {currentStep === 3 && (
        <div className="flex flex-col items-center mb-20">
          <Alerter className="h-60 w-60 mb-10 mt-20" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Emergency Contact
          </h2>
          <p className="text-gray-700">
            In case of emergencies, it&apos;s crucial to set up an emergency
            contact. We will contact both{" "}
            <a href="tel:911" className="text-red-400 font-bold underline">
              911
            </a>{" "}
            and <span className="font-bold">YOUR emergency contact</span>.
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="w-full max-w-xs absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col space-y-4">
          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              className="w-full py-5 bg-main text-white rounded-full font-bold focus:bg-main hover:bg-main active:bg-main"
            >
              Next
            </Button>
          ) : (
            <Link href="/camera">
              <Button className="w-full py-5 bg-main text-white rounded-full font-bold focus:bg-main hover:bg-main active:bg-main">
                Get Started
              </Button>
            </Link>
          )}
          {currentStep > 1 && (
            <Button
              onClick={handlePrevious}
              className="w-full py-5 bg-white text-gray-900 border border-gray-300 rounded-full font-bold focus:bg-white hover:bg-white active:bg-white"
            >
              Previous
            </Button>
          )}
          {currentStep == 1 && (
            <Link href="/">
              <Button className="w-full py-5 bg-white text-gray-900 border border-gray-300 rounded-full font-bold focus:bg-white hover:bg-white active:bg-white">
                Previous
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
