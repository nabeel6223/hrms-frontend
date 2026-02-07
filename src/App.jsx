import { Fragment, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./auth/pages/Login";
import Dashboard from "./dashboard/pages/Dashboard";
import DashboardLayout from "./dashboard/components/DashboardLayout";
import CryptoJS from "crypto-js";
import Loader from "../src/Loader/Loader";
import Employee from "./employees/pages/Employee";
import AttendancePage from "./attendance/pages/Attendance";
import EmployeeAttendancePage from "./attendance/pages/EmployeeAttendance";
import { Toaster } from "react-hot-toast";
function App() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedEncryptedToken = localStorage.getItem("token");
    const SecretKey = import.meta.env.VITE_REACT_APP_SECRET_KEY;
    if (storedEncryptedToken) {
      const { encryptedToken, expirationTimestamp } =
        JSON.parse(storedEncryptedToken);
      if (new Date().getTime() <= expirationTimestamp) {
        const decryptedTokenBytes = CryptoJS.AES.decrypt(
          encryptedToken,
          SecretKey,
        );
        const token = decryptedTokenBytes.toString(CryptoJS.enc.Utf8);
        // if (token) {
        //   navigate("/dashboard");
        // }
        setLoading(false);
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
      setLoading(false);
    } else {
      localStorage.removeItem("token");
      setLoading(false);
      navigate("/login");
    }
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Routes>
            <Route
              path="/"
              element={
                <DashboardLayout>
                  <Employee />
                </DashboardLayout>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/employees"
              element={
                <DashboardLayout>
                  <Employee />
                </DashboardLayout>
              }
            />
            <Route
              path="/attendance"
              element={
                <DashboardLayout>
                  <AttendancePage />
                </DashboardLayout>
              }
            />
            <Route
              path="/attendance/:id"
              element={
                <DashboardLayout>
                  <EmployeeAttendancePage />
                </DashboardLayout>
              }
            />
          </Routes>
        </Fragment>
      )}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default App;
