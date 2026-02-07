import { useEffect, useState } from "react";
import { DateFilterModal } from "../components/DateFilterModal";
import axios from "axios";
import TableShimmer from "../../employees/components/TableShimmer";
import { useNavigate } from "react-router-dom";

/* Utility: get first & last day of current month */
const getCurrentMonthRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    from: start.toISOString().split("T")[0],
    to: end.toISOString().split("T")[0],
  };
};

export default function AttendancePage() {
  const [dateRange, setDateRange] = useState(getCurrentMonthRange());
  const [showFilter, setShowFilter] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const basePath = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  /* Fetch attendance whenever date changes */
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);

        const resp = await axios.get(
          `${basePath}/attendance/summary?start_date=${dateRange.from}&end_date=${dateRange.to}`,
        );
        console.log(resp);
        if (resp.data.error == false) setData(resp.data.data);
        // setData([
        //   { id: "EMP-001", name: "Nabeel Khan", present: 18, absent: 2 },
        //   { id: "EMP-002", name: "Ayesha Patel", present: 20, absent: 0 },
        //   { id: "EMP-003", name: "Rohit Sharma", present: 15, absent: 5 },
        // ]);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, [dateRange]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Attendance Report
            </h2>
            <p className="text-sm text-gray-500">
              {dateRange.from} → {dateRange.to}
            </p>
          </div>

          <button
            onClick={() => setShowFilter(true)}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white
                       hover:bg-blue-700"
          >
            Filter Date
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Employee ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-center">Present</th>
                <th className="px-6 py-3 text-center">Absent</th>
                <th className="px-6 py-3 text-center">Attendance</th>
              </tr>
            </thead>
            {loading ? (
              <TableShimmer rows={6} columns={5} />
            ) : (
              <tbody className="divide-y">
                {data.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {row.employee_code}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className="px-3 py-1 rounded-full text-sm
                                     bg-green-100 text-green-700"
                      >
                        {row.present}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className="px-3 py-1 rounded-full text-sm
                                     bg-red-100 text-red-700"
                      >
                        {row.absent}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => navigate(`/attendance/${row.id}`)}
                        className="px-3 py-1 text-sm rounded-lg bg-indigo-600 text-white
               hover:bg-indigo-700"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}

                {data.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No attendance data found
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {/* Date Filter Modal */}
      {showFilter && (
        <DateFilterModal
          dateRange={dateRange}
          onClose={() => setShowFilter(false)}
          onApply={(range) => {
            setDateRange(range);
            setShowFilter(false);
          }}
        />
      )}
    </div>
  );
}
