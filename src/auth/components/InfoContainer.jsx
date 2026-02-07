import React from "react";
import CompanyContainers from "./CompanyContainers";

function InfoContainer() {
  return (
    <div className="relative w-3/5 max-md:hidden mt-[80px]">
      <div className="absolute secondary-bg blur-[500px] h-full w-full"></div>
      <div className="absolute flex flex-col p-12 z-10 items-center">
        <p className="text-4xl font-bold">
          Hire in India. Fast, Compliant, Fully Managed.
        </p>
        <p className="text-lg font-bold mt-16 mb-6">
          Trusted by 200+ Global Teams
        </p>
        <CompanyContainers />
        <div className="w-[424px]">
          <p className="mt-10 font-medium text-gray-500">
            “HRMS helped us tap into the vibrant and top-notch Indian talent
            market.”
          </p>
          <p className="mt-4 font-bold text-gray-700">Krishna Ramachandran</p>
          <p className="font-medium text-gray-500">Co-founder at Onform</p>
        </div>
        <div className="mt-10">
          <div className="flex flex-row">
            <img src="/images/soc.png" alt="" />
            <img src="/images/iso.png" alt="" />
          </div>
          <p className="text-lg font-bold text-gray-500">
            SOC 2 and ISO certified.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoContainer;
