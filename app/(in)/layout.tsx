// app/layout.tsx

import React from "react";
import BottomNavBar from "@/components/BottomNavbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Main content area */}
      <main className="flex-grow overflow-y-auto">{children}</main>

      {/* Bottom Navbar */}
      <BottomNavBar />
    </div>
  );
};

export default Layout;
