import React, { useState } from "react";
import GoogleIcon from "/src/icons/Google.svg?react";
import { useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const headers = { apikey: apiKey };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (loading) return;
      setLoading(true);
      const resp = await axios.post(`${baseUrl}/login`, data, {
        headers: headers,
      });
      if (resp.data.error) {
        setError(
          "password",
          {
            type: "manual",
            message: resp.data.message || "Login Failed. Try Again!",
          },
          { shouldFocus: true },
        ); // Optionally focus the input
      } else {
        const token = resp.data.token;

        const SecretKey = import.meta.env.VITE_REACT_APP_SECRET_KEY;
        const encryptedToken = CryptoJS.AES.encrypt(
          token,
          SecretKey,
        ).toString();
        const expirationMs = 24 * 60 * 60 * 1000;
        const expirationTimestamp = new Date().getTime() + expirationMs;

        localStorage.setItem(
          "token",
          JSON.stringify({ encryptedToken, expirationTimestamp }),
        );
        navigate("/employees");
      }
    } catch (e) {
      setError(
        "password",
        {
          type: "manual",
          message: "Email or password is incorrect!",
        },
        { shouldFocus: true },
      );
    } finally {
      setLoading(false);
    }
  };
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="p-10 flex flex-col justify-start w-2/5 max-md:w-5/5 max-md:p-4 mt-[80px]">
        <p className="text-[2rem] font-bold">Welcome back to HRMS</p>
        <p className="mt-2 font-medium text-gray-700 text-left">
          Sign in to manage your team, payroll, and compliance.
        </p>
        <button className="mt-10 border border-gray-200 rounded-xl py-[14px] px-[20px] font-bold flex flex-row justify-center gap-2">
          <GoogleIcon />
          <span> Sign in with Google</span>
        </button>
        <div className="flex-row flex my-6 gap-4 items-center">
          <hr class="border-t border-gray-200 w-full"></hr>
          <div className="py-1 px-2 w-full text-gray-400">or continue with</div>
          <hr class="border-t border-gray-200 w-full"></hr>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="relative">
            <input
              type="email"
              placeholder=" "
              {...register("email", { required: true })}
              className="peer w-full border border-gray-200 rounded-lg px-3 pt-5 pb-2 focus:outline-none"
            />
            <label
              className="absolute left-3 top-2 text-gray-300 font-medium text-sm transition-all
peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
peer-focus:top-2 peer-focus:text-sm"
            >
              Work Email*
            </label>
          </div>
          {errors.email && (
            <span className="text-red-700">{errors.email.message}</span>
          )}
          {/* Password */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder=" "
              {...register("password", { required: true })}
              className="peer w-full border border-gray-200 rounded-lg px-3 pt-5 pb-2 focus:outline-none"
            />
            <label
              className="absolute left-3 top-2 text-gray-300 font-medium text-sm transition-all
peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
peer-focus:top-2 peer-focus:text-sm"
            >
              Password*
            </label>
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-4 text-gray-300"
            >
              {show ? (
                <VisibilityIcon className="text-gray-300" />
              ) : (
                <VisibilityOff />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-700">{errors.password.message}</span>
          )}

          <button className="primary-bg text-white py-4 font-bold rounded-lg">
            {loading ? "Submitting..." : "Sign in"}
          </button>
        </form>
        <div className="flex flex-row justify-between mt-5 text-xs">
          <div>
            Don’t have an account yet?{" "}
            <span className="underline underline-offset-2">
              Create your workspace
            </span>
          </div>
          <div className="primary-text">Forgot Password?</div>
        </div>
        <div className="mt-16 text-xs text-gray-500 font-medium">
          By continuing, you agree to HRMS’s{" "}
          <span className="underline underline-offset-2">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="underline underline-offset-2">Privacy Policy.</span>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
