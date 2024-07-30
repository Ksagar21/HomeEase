import React, { useEffect, useState } from "react";
import "../navbar/Navbar.css";
import { FaRegHeart } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { IoCart } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { getcart } from "../../Services/Api";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(props.cart);
  const [cartlength, setcartlength] = useState(props.cart);
  useEffect(() => {
    getcartApi();
  }, []);

  const email = sessionStorage.getItem("email");

  const handleLoginLogout = () => {
    if (email) {
      sessionStorage.clear();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  function getcartApi() {
    getcart(sessionStorage.getItem("email"))
      .then((res) => {
        setcartlength(res.data.cartItems.length);
        console.log(res.data.cartItems.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
        <Link to="/" className="nav-link">
          <div className="d-flex align-items-center">
            <div className="navbar-brand">HE</div>
            <div className="row">
              <span className="brand-name ">Home</span>
              <span className="brand-name ">Ease</span>
            </div>
          </div>
          </Link>

          <form className="d-flex">
            <Link to="/services">
              <button className="btn btn-outline-success">Services</button>
            </Link>
            {/* <Link to ="http://localhost:3001/"> */}
            {sessionStorage.getItem("role") === "user" ? (
              ""
            ) : (
              
              <button className="btn btn-outline-success">
                Register for Service Provider
              </button>
            )}
            {/* </Link> */}
            <button
              className="btn btn-outline-success"
              onClick={handleLoginLogout}
            >
              {email ? "Logout" : "Login/SignUp"}
            </button>

            <div className="iconsDiv">
              {location.pathname !== "/" && (
                <Link to="/bookings">
                  <div className="user-select-none ">Bookings</div>
                </Link>
              )}
              <Link to="/Contact" className="nav-link">
                <div className="user-select-none  ">Contact Us</div>
              </Link>
              <div className="icons ">Help</div>
              <div className="icons cart-icon">
                <Link to="/cart">
                  <span className="cart-number">
                    {props.cart ? props.cart : cartlength}
                  </span>
                  <IoCart />
                </Link>
              </div>
            </div>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
