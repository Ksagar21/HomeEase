import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import VerificationTable from "./VerificationTable";
import UsersTable from "./UsersTable";
import BookingsTable from "./BookingsTable";
import QueriesTable from "./QueriesTable";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../Assets/HE.png";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("verification");
  useEffect(() => {
    if (sessionStorage.getItem("role") != "admin") {
      toast.error("You are not authorized to access this page.");
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <Link to="/" className="nav-link">
           <div className="d-flex align-items-center">
           <img src={logo} className="logoHe" style={{width:"220px",height:"80px" }}></img>
           </div>
        </Link>
          <form className="d-flex ms-auto">
            {/* <button type="button" class ="btn btn-primary me-3">Verify</button> */}
            <button
              type="button"
              className="btn btn-secondary me-3"
              onClick={() => {
                sessionStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </button>
          </form>
        </nav>
      </div>
      <div className="container mt-5">
        <Tabs
          defaultActiveKey="verification"
          id="uncontrolled-tab-example"
          className="mb-5 d-flex "
          onSelect={(key) => setActiveTab(key)}
        >
          <Tab eventKey="verification" title="Verification SP">
            {activeTab === "verification" && <VerificationTable />}
          </Tab>
          {/* <Tab eventKey="users" title="Users">
          {activeTab === 'users' && <UsersTable />}
        </Tab> */}
          <Tab eventKey="bookings" title="Booking">
            {activeTab === "bookings" && <BookingsTable />}
          </Tab>
          <Tab eventKey="queries" title="Con/Queries">
            {activeTab === "queries" && <QueriesTable />}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
