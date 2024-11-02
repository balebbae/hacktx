import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GetStartedPage() {
  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-12 bg-gray-50 text-center">
      {/* Hero Logo */}
      <div className="mb-6">
        <img src="your-logo-url.png" alt="Logo" className="h-12" />
      </div>

      {/* Welcome Text */}
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome to <span className="text-indigo-600">Momotaro UI Kit</span>
      </h1>
      <p className="mt-2 text-gray-600">
        The best UI Kit for your next health and fitness project!
      </p>

      {/* Illustration or Image */}
      <div className="my-10">
        <img
          src="your-illustration-url.png"
          alt="Illustration"
          className="w-full max-w-sm mx-auto"
        />
      </div>

      {/* Get Started Button */}
      <div className="w-full max-w-xs">
        <Button className="w-full py-3 bg-indigo-600 text-white hover:bg-indigo-700">
          Get Started
        </Button>
      </div>

      {/* Sign In Link */}
      <p className="mt-6 text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-indigo-600 font-medium underline hover:text-indigo-500"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
