// app/layout.tsx

import React from "react";
import BottomNavBar from "@/components/BottomNavbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-next">
      <main className="flex-grow overflow-y-auto">{children}</main>

      <BottomNavBar />
    </div>
  );
};

export default Layout;
