import React from "react";
import api from "./api/posts";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import "./form.css";

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
          // same shape as initial values
          const response = await RegisterUser({
            email,
            password,
            username,
            SignUpType: "email",
          });
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
