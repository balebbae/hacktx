// components/BottomNavBar.tsx

"use client";

import React from "react";
import Link from "next/link";
import MapIcon from "@/assets/map-pin.svg";
import CameraIcon from "@/assets/camera.svg";
import Sos from "@/assets/sos.svg";

const BottomNavBar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-next border-t border-gray-200 shadow-md">
      <div className="flex justify-around py-2 pt-3">
        <Link href="/map">
          <div className="flex flex-col items-center text-prev hover:text-main">
            <MapIcon className="size-8" />
          </div>
        </Link>

        <Link href="/camera">
          <div className="flex flex-col items-center text-prev hover:text-main">
            {" "}
            <CameraIcon className="size-8" />
          </div>
        </Link>

        {/* Contact */}
        <Link href="/call">
          <div className="flex flex-col items-center text-prev hover:text-main">
            {" "}
            <Sos className="size-8" />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavBar;
