import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import loginimg from "../../../src/Assets/LoginPageAssets/Loginimage.png";
import "./Forgotpassword.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Forgotpassword, LoginApi } from "../../Services/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
    oldPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

function ForgotPassword() {
  const [passwordVisble, SetPasswordVisible] = useState(false);
  const [oldpasswordVisble, SetOldPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const Login = (values ,{ resetForm }) => {
    console.log(values);
    Forgotpassword(values)
      .then((res) => {
        console.log(res);
       toast.success(res.data.message)
      resetForm();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const TogglePassword = () => {
    SetPasswordVisible(!passwordVisble);
  };

  const ToggleOldPassword = () => {
    SetOldPasswordVisible(!oldpasswordVisble);
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src={loginimg}
              alt="Login image"
              className="w-100 vh-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </div>
          <div className="col-sm-6 d-flex flex-column align-items-center justify-content-center logindiv">
            <Formik
              initialValues={{ email: "", password: "",oldPassword:"" }}
              validationSchema={validationSchema}
              onSubmit={Login}
            >
              {({ errors, touched }) => (
                <Form className="w-100 d-flex flex-column align-items-center">
                  <div className="form-outline mb-4 col-lg-8">
                    <label className="form-label inputLabels" htmlFor="email">
                      Email address
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control form-control-lg col-lg-12 col-md-12 inputFieldsLogin ${
                        touched.email && errors.email ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                 
                  <div className="form-outline mb-3 col-lg-8">
                    <div className="d-flex justify-content-between">
                      <label
                        className="form-label inputLabels"
                        htmlFor="oldPassword"
                      >
                    Old Password
                      </label>
                      <span className="inputLabels" onClick={ToggleOldPassword}>
                        {oldpasswordVisble ? (
                          <span>
                            <BiHide />
                            Hide
                          </span>
                        ) : (
                          <span>
                            <BiShow /> Show
                          </span>
                        )}
                      </span>
                    </div>
                    <Field
                      type={oldpasswordVisble ? "text" : "password"}
                      id="oldPassword"
                      name="oldPassword"
                      className={`form-control form-control-lg inputFieldsLogin ${
                        touched.oldPassword && errors.oldPassword ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="oldPassword"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-outline mb-3 col-lg-8">
                    <div className="d-flex justify-content-between">
                      <label
                        className="form-label inputLabels"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <span className="inputLabels" onClick={TogglePassword}>
                        {passwordVisble ? (
                          <span>
                            <BiHide />
                            Hide
                          </span>
                        ) : (
                          <span>
                            <BiShow /> Show
                          </span>
                        )}
                      </span>
                    </div>
                    <Field
                      type={passwordVisble ? "text" : "password"}
                      id="password"
                      name="password"
                      className={`form-control form-control-lg inputFieldsLogin ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  {/* <div className="col-lg-8 d-flex justify-content-end">
                    <a href="#!" className="text-body inputLabels">Forgot Your password</a>
                  </div> */}

                  <div className="col-lg-8 text-lg-start mt-4 pt-2">
                    <button
                      type="submit"
                      className="btn submitBtn btn-lg"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    >
                      Update Password
                    </button>
                    <p className="small mt-2 pt-1 mb-0 inputLabels">
                    Already have an account? {" "}
                      <a href="/login" className="link-danger">
                       Login
                      </a>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
           
          </div>
        </div>
      </div>
    </section>
   
  );
}

export default ForgotPassword;
