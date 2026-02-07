import React, { useEffect, useState } from "react";
import HeaderDashboard from "../../Header/HeaderDashboard";
import AddEmployee from "../components/AddEmployee";
import axios from "axios";
import TableShimmer from "../components/TableShimmer";
import { showError, showSuccess } from "../../utils/toast";
import ConfirmModal from "../components/ConfirmModal";
import { useNavigate } from "react-router-dom";

function Employee() {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const basePath = import.meta.env.VITE_API_BASE_URL;

  const fetchEmployee = async () => {
    try {
      setLoading(true);

      const resp = await axios.get(`/api/employees`);
      if (resp.data.error == false) {
        setData(resp.data.data);
      } else setError(resp.data.message ?? "Failed to load Data");
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
    fetchEmployee();
  }, []);

  const handleAddEmployee = async (data) => {
    try {
      // console.log(data);
      const resp = await axios.post(`/api/employee`, data, {
        validateStatus: (status) => {
          return true; // Always resolve, even for failed status codes
        },
      });
      if (resp.data.error == false) {
        showSuccess("Employee added successfully!");
        // setData(resp.data.data);
        fetchEmployee();
        setOpen(false);
      } else {
        showError(resp.data.message);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDeleteModal(true);
  };

  const handleConfirm = async () => {
    try {
      setProcessing(true);
      console.log(selectedId);
      const resp = await axios.delete(`/api/employee/${selectedId}`, {
        validateStatus: (status) => {
          return true; // Always resolve, even for failed status codes
        },
      });
      if (resp.data.error == false) {
        showSuccess("Employee deleted");
        fetchEmployee();
      } else throw Error(resp.data.message);
    } catch {
      showError("Failed to delete employee");
    } finally {
      setOpenDeleteModal(false);
      setSelectedId(null);
      setProcessing(false);
    }
  };
  // const handleAddEmployee = async (data) => {
  //   console.log("Employee Data:", data);
  //   // call API here
  // };
  return (
    <div className="light-bg w-full">
      <HeaderDashboard />
      <div className="flex flex-row gap-4 pt-[120px] px-10 max-lg:flex-col max-md:px-4">
        <div class="p-6 bg-gray-50 min-h-screen">
          <div class="max-w-7xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
            <div class="px-6 py-4 border-b flex flex-row justify-between">
              <div>
                <h2 class="text-xl font-semibold text-gray-800">Employees</h2>
                <p class="text-sm text-gray-500">Manage employees records</p>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add Employee
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full border-collapse">
                <thead class="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                  <tr>
                    <th class="px-6 py-3 text-left">ID</th>
                    <th class="px-6 py-3 text-left">Name</th>
                    <th class="px-6 py-3 text-left">Email</th>
                    <th class="px-6 py-3 text-left">Department</th>
                    <th class="px-6 py-3 text-center">Manage</th>
                  </tr>
                </thead>
                {loading ? (
                  <TableShimmer rows={6} columns={5} />
                ) : (
                  <tbody class="divide-y">
                    {data && data.length > 0 ? (
                      data.map((item, index) => {
                        return (
                          <tr class="hover:bg-gray-50 transition">
                            <td class="px-6 py-4 text-sm text-gray-700">
                              {item.employee_code ?? "N/A"}
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900">
                              {item.name ?? "N/A"}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-600">
                              {item.email ?? "N/A"}
                            </td>
                            <td class="px-6 py-4">
                              <span class="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                                {item.department ?? "N/A"}
                              </span>
                            </td>
                            <td class="px-6 py-4 text-center flex flex-row gap-2">
                              <button
                                class="px-4 py-2 text-sm font-medium rounded-lg
                       bg-green-600 text-white
                       hover:bg-green-700
                       focus:outline-none focus:ring-2 focus:ring-green-400"
                                onClick={() => {
                                  navigate(`/attendance/${item.id}`);
                                }}
                              >
                                Attendance
                              </button>
                              <button
                                class="px-4 py-2 text-sm font-medium rounded-lg
                       bg-red-600 text-white
                       hover:bg-red-700
                       focus:outline-none focus:ring-2 focus:ring-red-400"
                                onClick={() => {
                                  handleDeleteClick(item.id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <>{error}</>
                    )}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
      <AddEmployee
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddEmployee}
      />
      <ConfirmModal
        open={openDeleteModal}
        title="Delete Employee"
        message="Are you sure you want to delete this employee?"
        onConfirm={handleConfirm}
        processing={processing}
        onCancel={() => setOpenDeleteModal(false)}
      />
    </div>
  );
}

export default Employee;
