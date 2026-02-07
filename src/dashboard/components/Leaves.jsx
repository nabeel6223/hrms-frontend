import { CalendarToday, FreeBreakfast } from "@mui/icons-material";
import React from "react";
import EmployeeInfo from "./EmployeeInfo";
import { CardShimmer } from "../../Loader/CardShimmer";
import { fetchEmployeeLeaves } from "../../api/employee";
import { useQuery } from "@tanstack/react-query";
import { getDateRangeString } from "../../utils/helper";

function Leaves() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["leaves"],
    queryFn: fetchEmployeeLeaves,
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
            <FreeBreakfast className="h-4 w-4 text-gray-400" />
          </div>
          <p className="font-bold">On Leave</p>
        </div>
      </div>
      {data["today"] && data["today"].length > 0 && (
        <div>
          <hr className="border-t border-gray-100 mt-3 mb-4"></hr>
          <div>
            <p className="font-bold text-sm">Today</p>
            {data["today"].map((employee, index) => {
              return (
                <div className="flex flex-row mt-4 items-center justify-between">
                  <EmployeeInfo data={employee["employee_data"]} />
                  <p className="text-sm font-medium text-gray-300">
                    {getDateRangeString(
                      employee["start_date"],
                      employee["end_date"],
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <hr className="border-t border-gray-100 mt-3 mb-4"></hr>
      {data["this_week"] && data["this_week"].length > 0 && (
        <div>
          <hr className="border-t border-gray-100 mt-3 mb-4"></hr>
          <div>
            <p className="font-bold text-sm">This Week</p>
            {data["this_week"].map((employee, index) => {
              return (
                <div className="flex flex-row mt-4 items-center justify-between">
                  <EmployeeInfo data={employee["employee_data"]} />
                  <p className="text-sm font-medium text-gray-300">
                    {getDateRangeString(
                      employee["start_date"],
                      employee["end_date"],
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaves;
