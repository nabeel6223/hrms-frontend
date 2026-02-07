import React from "react";
import InfoContainer from "../components/InfoContainer";
import LoginForm from "../components/LoginForm";
import HeaderLogin from "../../Header/HeaderLogin";

function Login() {
  return (
    <>
      <div className="">
        <HeaderLogin />
        <div className="flex flex-row px-10  py-0 max-md:flex-col justify-center">
          <LoginForm />
          {/* <InfoContainer /> */}
        </div>
      </div>
    </>
  );
}

export default Login;
