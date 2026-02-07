import React from "react";
import { CardShimmer } from "../../Loader/CardShimmer";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployeeStats } from "../../api/employee";
import { fetchExpenseSummary } from "../../api/payroll";

function Summary() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["employee-stats"],
    queryFn: fetchEmployeeStats,
  });
  const {
    data: data2,
    isLoading: isLoading2,
    error: error2,
  } = useQuery({
    queryKey: ["expense"],
    queryFn: fetchExpenseSummary,
  });

  return isLoading && isLoading2 ? (
    <CardShimmer />
  ) : error ? (
    <div className="text-red-500">Error loading data</div>
  ) : (
    <div className="flex flex-row gap-4 max-md:flex-col">
      {isLoading ? (
        <CardShimmer />
      ) : error ? (
        <div className="text-red-500">Error loading data</div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-100 flex flex-col py-4 px-5 gap-2 w-full">
          <p className="text-sm font-bold">Active Employees</p>
          <p className="text-2xl font-bold">{data["ACTIVE"]}</p>
          <p className="text-xs font-medium text-green-400">
            +6 new hires this month
          </p>
        </div>
      )}
      {isLoading2 ? (
        <CardShimmer />
      ) : error2 ? (
        <div className="text-red-500">Error loading data</div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-100 flex flex-col py-4 px-5 gap-2 w-full">
          <p className="text-sm font-bold">Upcoming Payroll</p>
          <p className="text-2xl font-bold">{data2?.["payroll"] ?? "N/A"}</p>
          <p className="text-xs font-medium text-gray-400">
            Next run scheduled for Jan 26
          </p>
        </div>
      )}
      {isLoading2 ? (
        <CardShimmer />
      ) : error2 ? (
        <div className="text-red-500">Error loading data</div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-100 flex flex-col py-4 px-5 gap-2 w-full">
          <p className="text-sm font-bold">Pending Invoices</p>
          <p className="text-2xl font-bold">{data2?.["invoice"] ?? "N/A"}</p>
          <p className="text-xs font-medium text-gray-400">
            Pending invoice for this month
          </p>
        </div>
      )}
    </div>
  );
}

export default Summary;
