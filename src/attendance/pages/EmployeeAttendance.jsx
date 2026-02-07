import { useEffect, useState } from "react";
import { generateMonthDays, mergeAttendance } from "../../utils/helper";
import AttendanceCalendar from "../components/AttendanceCalendar";
import EditAttendanceModal from "../components/EditAttendance";
import { useParams } from "react-router-dom";
import axios from "axios";
import { showError, showSuccess } from "../../utils/toast";

export default function EmployeeAttendancePage() {
  const [monthOffset, setMonthOffset] = useState(0);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const baseDate = new Date();
  const params = useParams();
  const basePath = import.meta.env.VITE_API_BASE_URL;

  const current = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth() + monthOffset,
    1,
  );

  const year = current.getFullYear();
  const month = current.getMonth();
  const fetchAttendance = async () => {
    try {
      setLoading(true);

      const resp = await axios.get(
        `/api/attendance/${params.id}?year=${year}&month=${month + 1}`,
      );
      console.log(resp);

      //   setRows(merged);
      if (resp.data.error == false) {
        const data = resp.data.data;
        const monthDays = generateMonthDays(year, month);
        const merged = mergeAttendance(monthDays, data);
        setRows(merged);
      }
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
  useEffect(() => {
    // const loadAttendance = async () => {
    //   // 🔗 API → GET /attendance/:empId?month=YYYY-MM
    //   const apiData = [
    //     { date: "2026-02-01", status: "present" },
    //     { date: "2026-02-02", status: "absent" },
    //     { date: "2026-02-05", status: "present" },
    //   ];

    //   const monthDays = generateMonthDays(year, month);
    //   const merged = mergeAttendance(monthDays, apiData);

    //   setRows(merged);
    // };

    fetchAttendance();
  }, [monthOffset]);

  const EditAttendance = async (status) => {
    try {
      const data = {
        status: status ? "present" : "absent",
        date: selected.date,
      };
      // setLoading(true);

      const resp = await axios.post(`/api/attendance/${params.id}`, data);
      if (resp.status == 200) {
        showSuccess("Attendance edited successfully!");
        fetchAttendance();
      } else showError("Attendance edit failed!");

      // //   setRows(merged);
      // if (resp.data.error == false) {
      //   const data = resp.data.data;
      //   const monthDays = generateMonthDays(year, month);
      //   const merged = mergeAttendance(monthDays, data);
      //   setRows(merged);
      // }
      // setData([
      //   { id: "EMP-001", name: "Nabeel Khan", present: 18, absent: 2 },
      //   { id: "EMP-002", name: "Ayesha Patel", present: 20, absent: 0 },
      //   { id: "EMP-003", name: "Rohit Sharma", present: 15, absent: 5 },
      // ]);
    } catch (e) {
      showError("Attendance edit failed!");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Employee Attendance</h2>

        {/* Calendar */}
        <AttendanceCalendar
          data={rows}
          year={year}
          month={month}
          onPrev={() => setMonthOffset((v) => v - 1)}
          onNext={() => setMonthOffset((v) => v + 1)}
        />

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-sm uppercase">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-center">Edit</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {rows.map((row) => {
                const isWeekend = row.weekDay === 0 || row.weekDay === 6;

                return (
                  <tr key={row.date} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {row.date}
                      {isWeekend && (
                        <span className="ml-2 text-xs text-gray-500">
                          (Weekend)
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {isWeekend ? (
                        <span className="text-gray-400">—</span>
                      ) : row.status ? (
                        <span
                          className={`px-3 py-1 rounded-full text-sm
                            ${
                              row.status === "present"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                        >
                          {row.status}
                        </span>
                      ) : (
                        <span className="text-gray-400">Not marked</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {!isWeekend && (
                        <button
                          onClick={() => setSelected(row)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {selected && (
          <EditAttendanceModal
            onSubmit={EditAttendance}
            data={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </div>
  );
}
