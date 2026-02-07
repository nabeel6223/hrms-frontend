import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchEmployeeStats } from "../../api/employee";
import { CardShimmer } from "../../Loader/CardShimmer";

function Employees() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["employee-stats"],
    queryFn: fetchEmployeeStats,
  });
  return isLoading ? (
    <CardShimmer />
  ) : error ? (
    <div className="text-red-500">Error loading data</div>
  ) : (
    <div className="bg-white rounded-lg border border-gray-100 flex flex-col py-4 px-5">
      <p className="font-bold">Employee Status</p>
      <p className="font-medium text-xs text-gray-400">
        A quick overview of employees
      </p>
      <hr className="border-t border-gray-100 mt-3 mb-4"></hr>
      <div className="mt-4">
        <p className="text-sm font-bold text-gray-500">Total Employee</p>
        <p className="text-lg font-bold text-gray-700">{data["TOTAL"]}</p>
      </div>
      <div className="flex-row flex gap-4 mt-4 max-md:flex-col">
        <div className="p-2 border border-gray-100 rounded-lg w-full">
          <p className="text-sm font-medium text-gray-500">Active</p>
          <p className="text-sm font-bold text-gray-700">{data["ACTIVE"]}</p>
        </div>
        <div className="p-2 border border-gray-100 rounded-lg w-full">
          <p className="text-sm font-medium text-gray-500">Onboarding</p>
          <p className="text-sm font-bold text-gray-700">
            {data["ONBOARDING"]}
          </p>
        </div>{" "}
        <div className="p-2 border border-gray-100 rounded-lg w-full">
          <p className="text-sm font-medium text-gray-500">Yet to join</p>
          <p className="text-sm font-bold text-gray-700">
            {data["YET_TO_JOIN"]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Employees;
