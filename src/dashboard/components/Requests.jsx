import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchEmployeeRequests } from "../../api/employee";
import { CardShimmer } from "../../Loader/CardShimmer";
import EmployeeInfo from "./EmployeeInfo";
import { getDateRangeString } from "../../utils/helper";
import { MoreHoriz } from "@mui/icons-material";

function Requests() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchEmployeeRequests,
  });
  return isLoading ? (
    <CardShimmer />
  ) : error ? (
    <div className="text-red-500">Error loading data</div>
  ) : (
    <div className="bg-white rounded-lg border border-gray-100 flex flex-col py-4 px-5">
      <p className="font-bold">Requests</p>
      <p className="font-medium text-xs text-gray-400">
        Review, approve, or reject employee request for leave and
        reimbursements.es
      </p>
      {data["leaves"] && data["leaves"].length > 0 && (
        <>
          <hr className="border-t border-gray-100 mt-3 mb-4"></hr>
          <p className="font-bold mb-4">Leaves</p>
          <div className="flex flex-col gap-4">
            {data["leaves"].map((item, index) => {
              return (
                <div className="border border-gray-100 p-3 rounded-lg flex flex-row justify-between items-center max-md:flex-wrap">
                  <EmployeeInfo data={item["employee_data"]} />
                  <p className="text-sm font-medium text-gray-400">
                    {getDateRangeString(
                      item?.["payload"]?.["start_date"],
                      item?.["payload"]?.["end_date"],
                    )}
                  </p>
                  <p className="text-sm font-medium text-gray-400">
                    {item?.["payload"]?.["reason"] ?? "N/A"}
                  </p>
                  <MoreHoriz className="text-gray-500" />
                </div>
              );
            })}
          </div>
        </>
      )}
      {data["reimbursements"] && data["reimbursements"].length > 0 && (
        <>
          <hr className="border-t border-gray-100 mt-3 mb-4"></hr>
          <p className="font-bold mb-4">Reimbursements</p>
          <div className="flex flex-col gap-4">
            {data["reimbursements"].map((item, index) => {
              return (
                <div className="border border-gray-100 p-3 rounded-lg flex flex-row justify-between items-center max-md:flex-wrap">
                  <EmployeeInfo data={item["employee_data"]} />
                  <p className="text-sm font-medium text-gray-400">
                    {item?.["payload"]?.["amount"] ?? "N/A"}
                  </p>
                  <p className="text-sm font-medium text-gray-400">
                    {item?.["payload"]?.["category"] ?? "N/A"}
                  </p>
                  <div className="flex flex-row gap-2 max-md:mt-2">
                    <button className="light-bg px-1 px-4 font-bold primary-text rounded-lg">
                      Reject
                    </button>
                    <button className="primary-bg px-1 px-4 font-bold text-white rounded-lg">
                      Accept
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Requests;
