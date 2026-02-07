import React from "react";

function HeaderLogin() {
  return (
    <div className={`bg-white fixed pt-4 w-full h-[80px] z-50`}>
      <div className="flex flex-row justify-end w-full">
        {/* <img
          src="/images/wisemonk-logo-full.png"
          alt="logo"
          className="w-[200px] mx-8 object-fit"
        /> */}
        <button className="border border-gray-500 rounded-lg font-bold mx-14 px-4 py-2 text-gray-500 max-sm:hidden">
          Sign Up
        </button>
        {/* <div className="flex flex-row gap-2 items-center max-md:hidden">
          <NotificationsNoneOutlined />
          <div className="rounded-full primary-bg p-2 font-semibold text-xs h-fit text-white">
            SJ
          </div>
          <p className="font-semibold">Sarah Johnson</p>
          <KeyboardArrowDown className="text-gray-500" />
        </div> */}
      </div>
    </div>
  );
}

export default HeaderLogin;
