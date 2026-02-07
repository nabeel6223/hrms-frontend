import {
  KeyboardArrowDown,
  Menu,
  NotificationsNoneOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSidebar } from "../context/SidebarContext";

function HeaderDashboard() {
  const [scrolled, setScrolled] = useState(false);
  const { openSidebar, isOpen } = useSidebar();
  useEffect(() => {
    const container = document.getElementById("page-scroll");
    if (!container) return;

    const onScroll = () => {
      setScrolled(container.scrollTop > 10);
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`fixed lg:left-[250px] h-[100px] w-[calc(100%)] lg:w-[calc(100%-250px)]  px-10 pt-4 max-md:px-4
          ${scrolled ? "bg-white" : "bg-transparent"}
          `}
    >
      <div className="flex flex-row justify-between w-full">
        <div>
          <div className="flex flex-row gap-4 items-center">
            {!isOpen && (
              <div className="block lg:hidden" onClick={openSidebar}>
                <Menu />
              </div>
            )}
            <div>
              <p className="text-2xl font-bold text-gray-700 max-md:text-xl">
                Good Morning, Admin!
              </p>
              <p className="text-sm font-bold text-gray-400 max-md:text-xs">
                Here’s how your organization looks this month.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center max-md:hidden">
          <NotificationsNoneOutlined />
          <div className="rounded-full primary-bg p-2 font-semibold text-xs h-fit text-white">
            SJ
          </div>
          <p className="font-semibold">Admin</p>
          <KeyboardArrowDown className="text-gray-500" />
        </div>
      </div>
    </div>
  );
}

export default HeaderDashboard;
