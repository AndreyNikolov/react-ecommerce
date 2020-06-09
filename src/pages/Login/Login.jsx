import React from "react";

import SignIn from "../../components/signin/SignIn";
import SignUp from "../../components/signUp/SignUp";
import "./Login.scss";

const Login = () => (
  <div className="sign-in-and-sign-up">
    <SignIn />
    <SignUp />
  </div>
);

export default Login;
