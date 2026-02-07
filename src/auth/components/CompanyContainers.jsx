import React from "react";
// import Wieldy from "/src/icons/wieldy-logo.svg?react";

function CompanyContainers() {
  return (
    <>
      <div className="flex flex-row flex-wrap gap-2 justify-center">
        <div className="rounded-2xl p-5 flex flex-row items-center gap-2 text-xl font-bold bg-gradient-to-r from-white/0 to-white/100">
          <img src="/images/convincely-logo-removebg-preview.png" alt="" />
          Convincely
        </div>
        <div className="bg-white rounded-2xl p-5 flex flex-row items-center gap-2 text-xl font-bold">
          <img src="/images/youtrip-logo-removebg-preview.png" alt="" />
          Youtrip
        </div>
        <div
          className="rounded-2xl p-5 flex flex-row items-center gap-2 text-xl font-bold
        bg-gradient-to-r from-white/100 to-white/0
        "
        >
          <img src="/images/weildy-logo-Photoroom.png" alt="" />
          Wieldy.ai
        </div>
        <div className="bg-gradient-to-r from-white/0 to-white/100 rounded-2xl p-5 flex flex-row items-center gap-2 text-xl font-bold">
          <img src="/images/bgarage-logo-removebg-preview.png" alt="" />
          Beauty Garage
        </div>

        <div className="bg-gradient-to-r from-white/100 to-white/0 rounded-2xl p-5 flex flex-row items-center gap-2 text-xl font-bold">
          <img src="/images/leverage-logo-removebg-preview.png" alt="" />
          Leverage Companies
        </div>
      </div>
    </>
  );
}

export default CompanyContainers;
