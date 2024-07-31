
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import loginimg from "../../../src/Assets/LoginPageAssets/Loginimage.png";
import signupimage from "../../Assets/LoginPageAssets/SignupImage.png"
import "./Signup.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { signUpApi } from '../../Services/Api';
import { useNavigate } from 'react-router-dom';
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
});

function SignUp() {
const [passwordVisble , SetPasswordVisible] = useState(false)
const navigate = useNavigate()
  const signUp = (values) => {
    console.log(values);
    signUpApi(values).then((res)=>{
      console.log(res.data.message)
      toast.success(res.data.message)
      navigate("/login")
    }).catch((err)=>{console.log(err)})
  }

  const TogglePassword =()=>{
    SetPasswordVisible(!passwordVisble)
  }

  return (
    <>
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img src={signupimage}
              alt="Login image" className="w-100 vh-100" style={{objectFit: "cover", objectPosition: "left"}} />
          </div>
          <div className='col-sm-6 d-flex flex-column align-items-center justify-content-center logindiv'>
            <Formik
              initialValues={{ email: '', password: '' , name:'',role:"provider"}}
              validationSchema={validationSchema}
              onSubmit={signUp}
            >
              {({ errors, touched }) => (
                <Form className="w-100 d-flex flex-column align-items-center">
 <div className="provLog">PROVIDERS SIGNUP </div>
                  <div className="form-outline mb-4 col-lg-8">
                      <label className="form-label inputLabels mb-3" htmlFor="name">User name</label>
                      <Field type="text" id="username" name="username" className={`form-control form-control-lg col-lg-12 col-md-12 inputFieldsLogin ${touched.username && errors.username ? 'is-invalid' : ''}`} />
                      <ErrorMessage name="username" component="div" className="invalid-feedback" />
                    </div>

                  <div className="form-outline mb-4 col-lg-8">
                    <label className="form-label inputLabels mb-3" htmlFor="email"> Email address</label>
                    <Field type="email" id="email" name="email" className={`form-control form-control-lg col-lg-12 col-md-12 inputFieldsLogin ${touched.email && errors.email ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>

                  <div className="form-outline mb-3 col-lg-8">
                    <div className='d-flex justify-content-between'>
                      <label className="form-label inputLabels" htmlFor="password">Password</label>
                      <span className='inputLabels' onClick={TogglePassword}>{passwordVisble ? <span><BiHide/>Hide</span> :<span><BiShow/> Show</span>}</span>
                    </div>
                    <Field type={passwordVisble ?"text" : "password"} id="password" name="password" className={`form-control form-control-lg inputFieldsLogin ${touched.password && errors.password ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                  </div>

                  <div className="col-lg-8 d-flex ">
                    <p className='greyTexts'>Use 6 or more characters with a mix of letters, numbers & symbols</p>
                  </div>

                  <div className="col-lg-8 d-flex flex-column">
                    {/* <p>Agree to our Terms of use and Privacy Policy </p>
                    <p>Subscribe to our monthly newsletter </p> */}
                    <div>
                      <input type='checkbox' />
                      <span className='mx-2 greyTexts '>Agree to our <span className='underline greyTexts'>Terms of use</span> and <span className='underline'>Privacy Policy</span></span>
                    </div>
                    <div>
                      <input type='checkbox' />
                      <span className='mx-2 greyTexts'>Subscribe to our monthly newsletter</span>
                    </div>
                  </div>

                  <div className="col-lg-8 text-lg-start mt-4 pt-2">
                    <button type="submit" className="btn submitBtn btn-lg" style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Sign up</button>
                    <p className="small mt-2 pt-1 mb-0 inputLabels ">Already have an account? <a href="login" className="link-danger">Login</a></p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
   </>
  );
}

export default SignUp;
