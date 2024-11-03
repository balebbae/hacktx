import { Button } from "@/components/ui/button";
import CameraComponent from "@/components/CameraComponent";
import Link from "next/link";
import Sos from "@/assets/sos.svg";
import Pool from "@/assets/pool.svg";
import Swim from "@/assets/swimming.svg";
import Alert from "@/assets/alert-circle.svg";

export default function GetStartedPage() {
  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-12  text-center bg-next">
      <Swim className="mb-6 text-prev" />

      <h1 className="text-2xl font-bold text-gray-900">
        Welcome to <span className="text-main">Aqua Sentry</span>
      </h1>
      <Sos className="mt-8 text-red-400" />
      <p className="mt-2 text-gray-700">
        In case of emergency, users should{" "}
        <span className="font-bold">IMMEDIATELY</span> call{" "}
        <a href="tel:911" className="text-red-400 font-bold underline">
          911
        </a>
        .
      </p>
      <Pool className="mt-8 text-blue-400" />
      <p className="mt-4 text-gray-700">
        The app uses <span className="font-bold">camera</span> and{" "}
        <span className="font-bold">location</span> data to detect signs of
        drowning and alert authorities if needed
      </p>
      <Alert className="mt-8 text-yellow-500" />
      <p className="mt-4 text-gray-700">
        This appplication <span className="font-bold">WILL NOTIFY </span>
        authorities with the tag&apos;s coordinates if drowning is detected
      </p>

      <div className="my-10"></div>

      <div className="w-full max-w-xs absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Link href={"/start"}>
          <Button className="w-2/4 py-5 bg-main text-white rounded-full font-bold">
            Get Started
          </Button>
        </Link>
      </div>
      <div>
        <CameraComponent></CameraComponent>
      </div>
    </div>
  );
}
