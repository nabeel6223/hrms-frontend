import React, { useEffect, useState } from "react";
import Summary from "../components/Summary";
import Timeline from "../components/Timeline";
import Employees from "../components/Employees";
import Requests from "../components/Requests";
import Holidays from "../components/Holidays";
import Leaves from "../components/Leaves";
import Birthdays from "../components/Birthdays";
import {
  KeyboardArrowDown,
  NotificationsNoneOutlined,
} from "@mui/icons-material";
import HeaderDashboard from "../../Header/HeaderDashboard";

function Dashboard() {
  return (
    <div className="light-bg w-full">
      <HeaderDashboard />
      <div className="flex flex-row gap-4 pt-[120px] px-10 max-lg:flex-col max-md:px-4">
        <div className="flex flex-col gap-4 w-2/3 max-lg:w-3/3">
          <Summary />
          <Timeline />
          <Employees />
          <Requests />
        </div>
        <div className="flex flex-col gap-4 w-1/3 max-lg:w-3/3">
          <Holidays />
          <Leaves />
          <Birthdays />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
