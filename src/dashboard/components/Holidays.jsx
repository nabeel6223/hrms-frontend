import { CalendarToday } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchHolidays } from "../../api/holidays";
import { CardShimmer } from "../../Loader/CardShimmer";

function Holidays() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["holidays"],
    queryFn: fetchHolidays,
  });
  return isLoading ? (
    <CardShimmer />
  ) : error ? (
    <div className="text-red-500">Error loading data</div>
  ) : (
    <div className="bg-white rounded-lg border border-gray-100 flex flex-col py-4 px-5">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <div className="border border-gray-100 rounded-lg p-2">
            <CalendarToday className="h-4 w-4 text-gray-400" />
          </div>
          <p className="font-bold">Upcoming Holidays</p>
        </div>
        <p className="font-medium text-sm primary-text">View All</p>
      </div>
      <hr className="border-t border-gray-100 mt-3 mb-4"></hr>
      <div className="flex flex-col gap-3">
        {data.map((holiday, index) => {
          return (
            <>
              <div className="flex flex-row gap-2">
                <div className="rounded border border-gray-100 px-2">
                  <p className="font-medium text-sm text-center">
                    {new Date(holiday["date"]).toLocaleString("default", {
                      month: "short",
                    })}
                  </p>
                  <p className="font-bold text-center">
                    {new Date(holiday["date"]).getDate()}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-sm ">
                    {holiday["name"] ?? "N/A"}
                  </p>
                  <p className="font-medium text-sm ">
                    {holiday["type"] ?? "N/A"}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Holidays;
