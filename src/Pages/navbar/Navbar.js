import React, { useEffect, useState } from "react";
import "../navbar/Navbar.css";
import { FaRegHeart } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { IoCart } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { getcart } from "../../Services/Api";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/HE.png"
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
  const openRegisterPage = () => {
  window.open("https://home-ease-6bj9.onrender.com/", "_blank");
 };
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
       <Link to="/" className="nav-link">
           <div className="d-flex align-items-center">
           <img src={logo} className="logoHe" style={{width:"220px",height:"80px" }}></img>
           </div>
        </Link>
    <a class="navbar-brand" href="#"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-md-auto gap-2">
        
        <li class="nav-item rounded">
        {sessionStorage.getItem("role") === "user" ? (
              ""
            ) : (
              <button className="btn btn-outline-success" onClick={openRegisterPage}>
                Register for Professionalls
              </button>
            )}
        </li>
        <li class="nav-item rounded">
          <Link to="/services">
              <button className="btn btn-outline-success">Services</button>
            </Link>
        </li>
        <li class="nav-item rounded">
        <button
              className="btn btn-outline-success"
              onClick={handleLoginLogout}
            >
              {email ? "Logout" : "Login/SignUp"}
            </button>
        </li>
        <li class="nav-item  rounded">
              {email  && (
                 <Link to="/bookings" className="">
                <button
              className="btn btn-outline-success">
               
                  <div className="user-select-none ">Bookings</div>
                
                </button>
                </Link>
              )}
              </li>
              <li class="nav-item  rounded">
              <div className="icons cart-icon" style={{marginTop:'15px'}}>
                <Link to="/cart">
                  <span className="cart-number">
                    {props.cart ? props.cart : cartlength}
                  </span>
                  <IoCart />
                </Link>
              </div>
         </li>
      
      </ul>
    </div>
  </div>
</nav>
    </>

  );
};

export default Navbar;
