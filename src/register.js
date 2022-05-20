import React, { useState } from "react";
import api from "./api/journal-api";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import "./form.css";
import { useLocation, useNavigate } from "react-router-dom";

// same shape as initial values
// const response = await RegisterUser({
//   email,
//   password,
//   username,
//   SignUpType: "email",
// });
// console.log("submitted");
// console.log(email + "   " + username + password);
// localStorage.setItem("token", response["token"]);

// initiallizing register form and login form logic
const RegisterUser = async (credentials) => {
  api({
    method: "post",
    url: "/auth/signup",
    data: credentials,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((data) => {
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      data.json();
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
};

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";
  const [errMsg, setErrMsg] = useState("");
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
      <h1>Signup</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async ({ email, username, password }) => {
          try {
            const response = await api.post(
              "/auth/signup",
              { email, password, username, SignUpType: "email" },
              {
                headers: { "Content-Type": "multipart/form-data" },
                withCredientials: true,
              }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            console.log("====================================");
            console.log(accessToken);
            console.log(roles);
            console.log("====================================");
            navigate(from, { replace: true });
          } catch (err) {
            if (!err?.response) {
              setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
              setErrMsg("Missing Username or Password");
            } else if (err.response?.status === 401) {
              setErrMsg("Unauthorized");
            } else {
              setErrMsg("Login Failed");
            }
            //errRef.current.focus();
          }
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
