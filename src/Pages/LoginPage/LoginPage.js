import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import loginimg from "../../../src/Assets/LoginPageAssets/Loginimage.png";
import "../LoginPage/LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginApi } from "../../Services/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

function LoginPage() {
  const [passwordVisble, SetPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const Login = (values) => {
    console.log(values);
    LoginApi(values)
      .then((res) => {
        console.log(res);
        if (res.data.message) {
          toast.error(res.data.message);
        } else {
          sessionStorage.setItem('role',res.data.role);
          sessionStorage.setItem("username", res.data.username);
          sessionStorage.setItem("email", res.data.email);
          toast.success("Logged in Successfully");
          if (res.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const TogglePassword = () => {
    SetPasswordVisible(!passwordVisble);
  };

  const onSuccess = (response) => {
    console.log('Login Success:', response);
    const decoded = jwtDecode(response.credential);
    console.log(decoded);
    sessionStorage.setItem('role','user');
    sessionStorage.setItem("username",decoded.name);
    sessionStorage.setItem("email", decoded.email);
    toast.success("Logged in Successfully");
    
      navigate("/");
    
  };

  const onFailure = (error) => {
    console.error('Login Failure:', error);
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
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={Login}
            >
              {({ errors, touched }) => (
                <Form className="w-100 d-flex flex-column align-items-center">
                  <div className="form-outline mb-4 col-lg-8">
                    <label className="form-label inputLabels" htmlFor="email">
                      User name or email address
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

                  <div className="col-lg-8 d-flex justify-content-end">
                  <Link to="/updatePassword" className="nav-link">
                    <a href="" className="text-body inputLabels">Update Your password</a>
                    </Link>
                  </div>

                  <div className="col-lg-8 text-lg-start mt-4 pt-2">
                    <button
                      type="submit"
                      className="btn submitBtn btn-lg"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    >
                      Login
                    </button>
                    <p className="small mt-2 pt-1 mb-0 inputLabels">
                      Don't have an account?{" "}
                      <Link to="/signup">
                      <a href="" className="link-danger">
                        Sign up
                      </a>
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
            <span className="">Or</span>
            <GoogleLogin
        buttonText="Login with Google"
        className="w-100"
        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
          </div>
        </div>
      </div>
    </section>
   
  );
}

export default LoginPage;
