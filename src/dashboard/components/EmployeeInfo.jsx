import React from "react";

function EmployeeInfo(props) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <img
        className="w-8 h-8 rounded-full object-cover"
        src="https://i.ibb.co/Vc3659bJ/773412b4f7fa6da9cc80529de6db2e12fc158b5e.png"
        alt=""
      />
      <div>
        <p className="text-sm font-bold">{props?.data?.["name"] ?? "N/A"}</p>
        <p className="text-sm font-light">
          {props?.data?.["position"] ?? "N/A"}
        </p>
      </div>
    </div>
  );
}

export default EmployeeInfo;
