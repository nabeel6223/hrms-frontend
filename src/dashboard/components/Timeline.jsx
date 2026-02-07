import { Done, HourglassEmpty, PriorityHigh } from "@mui/icons-material";
import React from "react";
import { CardShimmer } from "../../Loader/CardShimmer";
import { fetchPayrollTimeline } from "../../api/payroll.js";
import { useQuery } from "@tanstack/react-query";
import { getDateRangeString } from "../../utils/helper.js";

function Timeline() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["payroll_timeline"],
    queryFn: fetchPayrollTimeline,
  });
  return isLoading ? (
    <CardShimmer />
  ) : error ? (
    <div className="text-red-500">Error loading data</div>
  ) : (
    <div className="bg-white rounded-lg border border-gray-100 flex flex-col py-4 px-5">
      <p className="font-bold">Payroll and Compliance Timeline</p>
      <p className="font-medium text-xs text-gray-400">
        Key deadlines and milestones for the current month.
      </p>
      <hr className="border-t border-gray-100 mt-3 mb-4"></hr>
      <div className="flex flex-col gap-1">
        {data.map((item, index) => {
          return (
            <>
              <div className="flex flex-row justify-between items-center max-md:flex-col max-md:items-baseline">
                <div className="flex flex-row gap-4 items-center">
                  {item["status"] === "completed" ? (
                    <div className="light-bg rounded-full p-2">
                      <Done className="primary-text" />
                    </div>
                  ) : new Date(item["date"]) > new Date() ? (
                    <div className="bg-gray-100 rounded-full p-2">
                      <HourglassEmpty className="text-gray-200" />
                    </div>
                  ) : (
                    <div className="bg-gray-300 rounded-full p-2">
                      <PriorityHigh className="text-white" />
                    </div>
                  )}

                  <p className="text-gray-400 font-bold text-sm">
                    {getDateRangeString(item["date"], null)}
                  </p>
                  <p className="text-gray-700 font-bold text-sm">
                    {item["type"]}
                  </p>
                </div>
                {item["status"] === "completed" && (
                  <div className="light-bg h-fit rounded-2xl px-4 py-1 font-medium text-sm primary-text">
                    by HRMS
                  </div>
                )}
              </div>
              <div className="w-px h-4 bg-gray-200 ml-5"></div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Timeline;
