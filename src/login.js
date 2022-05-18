import React, { useContext, useEffect, useRef, useState } from "react";
import api from "./api/posts";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import "./form.css";
import AuthContext from "./context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const { setAuth } = useContext(AuthContext);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // initiallizing register form and login form logic
  const RegisterUser = async (credentials) => {
    api({
      method: "post",
      url: "/auth/login",
      data: credentials,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((data) => {
        console.log("====================================");
        console.log(data);
        console.log(data.headers["access-control-allow-methods"]);
        console.log(data.headers["authorization"].slice(6, 100));
        console.log("====================================");
        data.json();
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else if (err.response?.status === 403) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          console.log("====================================");
          console.log(err.response?.data?.errors["authentication.error"]);

          console.log("====================================");
          setErrMsg(err.response?.data?.errors["authentication.error"]);
          //setErrMsg("Email or password is incorrect");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
      });
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <div>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async ({ email, username, password }) => {
          // same shape as initial values
          const response = await RegisterUser({
            email,
            password,
            username,
            SignUpType: "email",
          });
          navigate(from, { replace: true });
          console.log("submitted");

          console.log(email + "   " + username + password);
          localStorage.setItem("token", response["token"]);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="username" />
            {errors.username && touched.username ? (
              <div>{errors.username}</div>
            ) : null}
            <Field name="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
