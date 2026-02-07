import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex flex-row h-[100vh]">
      <Sidebar />
      <main
        id="page-scroll"
        className="lg:ml-[250px] overflow-y-auto h-screen w-full "
      >
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
