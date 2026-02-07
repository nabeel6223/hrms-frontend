import React from "react";
import "./styles.css";
import {
  AttachMoney,
  CalendarToday,
  Close,
  DonutSmall,
  HomeOutlined,
  Logout,
  PeopleOutlined,
  RequestQuoteOutlined,
  ShieldOutlined,
} from "@mui/icons-material";
import { useSidebar } from "../context/SidebarContext";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const { isOpen, closeSidebar } = useSidebar();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      {/* Backdrop (mobile only) */}
      {isOpen && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          sidebar fixed top-0 left-0 z-50 h-screen w-[250px] py-8 px-6
          bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:block
        `}
      >
        {/* Logo + Close */}
        <div className="flex flex-row items-end justify-between">
          {/* <img
            src="/images/wisemonk-logo-full.png"
            alt="logo"
            className="w-[150px]"
          /> */}

          {/* Close button (mobile only) */}
          <button onClick={closeSidebar} className="lg:hidden">
            <Close />
          </button>
        </div>

        {/* Menu */}
        <div className="flex flex-col h-full">
          {/* Scrollable Menu */}
          <div className="flex-1 overflow-y-auto mt-10 pr-2">
            <p className="text-sm font-light">WORKSPACE</p>

            <div className="mt-2 flex flex-col gap-2">
              <MenuItem icon={<HomeOutlined />} label="Home" />
              <MenuItem
                icon={<DonutSmall />}
                label="Employees"
                onClick={() => {
                  navigate("/employees");
                }}
              />
              <MenuItem
                icon={<PeopleOutlined />}
                label="Attendance"
                onClick={() => {
                  navigate("/attendance");
                }}
              />
              <MenuItem icon={<ShieldOutlined />} label="Compliance" />
              <MenuItem icon={<CalendarToday />} label="Time" />
            </div>

            <p className="text-sm font-light mt-6">FINANCE</p>

            <div className="mt-2 flex flex-col gap-2">
              <MenuItem icon={<AttachMoney />} label="Payroll" />
              <MenuItem icon={<RequestQuoteOutlined />} label="Billings" />
            </div>
          </div>

          {/* Sticky Footer */}
          <button
            onClick={logout}
            className="bg-white py-4 flex items-center gap-2 text-red-600 hover:bg-red-50"
          >
            <Logout />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}

/* Small reusable item */
const MenuItem = ({ icon, label, onClick }) => (
  <div
    className="flex flex-row gap-3 items-center cursor-pointer hover:bg-gray-100 rounded px-2 py-1"
    onClick={onClick}
  >
    <span className="text-gray-500">{icon}</span>
    <p className="font-medium">{label}</p>
  </div>
);

export default Sidebar;
