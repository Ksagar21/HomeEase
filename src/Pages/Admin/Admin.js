

import React, { useState,useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import VerificationTable from './VerificationTable';
import UsersTable from './UsersTable';
import BookingsTable from './BookingsTable';
import QueriesTable from './QueriesTable';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Admin = () => {
  const navigate= useNavigate()
  const [activeTab, setActiveTab] = useState('verification');
  useEffect(() => {
   if(sessionStorage.getItem("role")!= "admin"){
    toast.error("You are not authorized to access this page.");
navigate('/login')
   }
  }, [])
  
  return (
    <div>
    <div className='container'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a className="navbar-brand ms-5" href="#" style={{ fontSize: "30px" }}>
          HE
        </a>
        <span className='' style={{ fontSize: "15px" }}>Home <br /> Ease</span>
        <form className="d-flex ms-auto">
          {/* <button type="button" class ="btn btn-primary me-3">Verify</button> */}
          <button type="button" className="btn btn-secondary me-3"onClick={()=>{sessionStorage.clear();navigate("/")}}>logout</button>
        </form>
      </nav>
    
    </div>
    <div className='container mt-5'>
        <Tabs
        defaultActiveKey="verification"
        id="uncontrolled-tab-example"
        className="mb-5 d-flex "
        onSelect={(key) => setActiveTab(key)}
      >
        <Tab eventKey="verification" title="Verification SP">
          {activeTab === 'verification' && <VerificationTable />}
        </Tab>
        {/* <Tab eventKey="users" title="Users">
          {activeTab === 'users' && <UsersTable />}
        </Tab> */}
        <Tab eventKey="bookings" title="Booking">
          {activeTab === 'bookings' && <BookingsTable />}
        </Tab>
      <Tab eventKey="queries" title="Con/Queries">
          {activeTab === 'queries' && <QueriesTable />}
        </Tab> 
      </Tabs>
    </div></div>
  );
};

export default Admin;
