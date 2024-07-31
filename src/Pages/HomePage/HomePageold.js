import React, { useEffect, useState } from "react";
import "./Homepage.css";
import big from "../../Assets/bigimage.png";
import Product7 from "../../Assets/Product7.png";
import { FaPhone } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";
import { getbookings, getServices, UpdateService } from "../../Services/Api";
import { Link } from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { format } from 'date-fns';

import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const storedJson = sessionStorage.getItem("myObject");
  const storedObject = JSON.parse(storedJson);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [bookings, setBookings] = useState([]);
  const initialValue = {
    serviceName: "",
    description: "",
    price: 0,
    image:"",duration:"",
  };
  const [editItem, setEditItem] = useState(initialValue);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const storedValue = sessionStorage.getItem('isverified');
    if (storedValue !== null) {
      setIsVerified(storedValue === 'true');
    }
    getservicesApi();
    getBookingsApi();
  }, []);
  
  function getservicesApi() {
    getServices(sessionStorage.getItem("email"))
      .then((res) => {
        console.log(res.data.lists[0], "res");
        setData(res.data.lists, "res");
      })
      .catch(() => {});
  }

  function getBookingsApi(){
    getbookings(sessionStorage.getItem("email"))
    .then((res) => {
      console.log(res.data.lists, "res");

      setBookings(res.data.lists, "res");
    })
    .catch(() => {});
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem({
      ...editItem,
      [name]: value,
    });
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(editItem);

    setShowForm(false);
    UpdateService(editItem)
      .then((res) => {
        getservicesApi();
        console.log(res.data);
      })
      .catch((err) => {});
    setEditItem(initialValue);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      convertBase64(file);
    }
  };

  const convertBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setEditItem({
        ...editItem,
        image: reader.result,
      });
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };
  const navigate = useNavigate()
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a className="navbar-brand ms-5" href="#" style={{ fontSize: "30px" }}>
          HE
        </a>
        <span className='' style={{ fontSize: "15px" }}>Home <br /> Ease</span>
        <form className="d-flex ms-auto">
        {!isVerified&&
          <button type="button" class ="btn btn-primary me-3"onClick={()=>navigate("/registerSp")}>Verify</button>}
          <button type="button" className="btn btn-secondary me-3"onClick={()=>{sessionStorage.clear();navigate("/")}}>logout</button>
        </form>
      </nav>
      {storedJson&&
      <div className="image-container">
        <div className="split right mt-5">
          <div className="info-container mt-5 info-text">
            <div className="mt-5" style={{ marginTop: "50px", fontSize: "20px" }}>{storedObject?.shopName}</div>
            <div className="" style={{ textAlign: "left" }}><FaPhone /> <span className='ms-2'>{storedObject?.phoneNo}</span></div>
            <div className="" style={{ textAlign: "left" }}><CgMail /><span className='ms-2'>{storedObject?.shopEmail}</span></div>
            <div className="" style={{ textAlign: "left" }}><CiLocationOn /><span className='ms-2'>{storedObject?.address}</span></div>
          </div>
        </div>
      </div>
}
      <div className="search-bar-container mt-5">
        <div className="search-bar mt-5">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <i className="search-icon fas fa-search"></i>
          {isVerified &&
          <Link to="/serviceform">
            <button  className="add-more-btn ms-5 ">+Add</button>
          </Link>
}
        </div>

<div className="container">
        <Tabs 
          defaultActiveKey="services"
          id="uncontrolled-tab-example"
          className="  mb-3"
          onSelect={()=>{getBookingsApi();
            getservicesApi();
          }}
        >
          <Tab eventKey="services" title="Services">
            {showForm && (
              <div
                className=" mt-3 p-3"
                style={{ backgroundColor: "#F3F3F3", maxWidth: "80%" }}
              >
                <form onSubmit={handleFormSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <label>Service Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Service Name"
                        name="serviceName"
                        value={editItem.serviceName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <labe>Duration</labe>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Duration"
                        name="duration"
                        value={editItem.duration}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <label>Price</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Price"
                        name="price"
                        value={editItem.price}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <label>Description</label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        name="description"
                        value={editItem.description}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-3">
                    <label className="inputLabel">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleFileChange}
                />
                {editItem.image?
                <img className="img-fluid" src={editItem.image} alt="img"/>:null}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <p type="cancel" className="btn btn-primary" onClick={()=>setShowForm(false)}>
                    cancel
                  </p>
                </form>
              </div>
            )}
            <div className="single-tab">Services</div> 
            {isVerified}
            {isVerified?
            <div
              className="container mt-3 p-3"
              style={{ backgroundColor: "#F3F3F3", }}
            >
             
                <div className="row align-items-center mb-2" >
                  <div className="col">
                    <span className="col headings">
                      Image
                    </span>
                  </div>
                  <div className="col headings">
                    <span>Service Name</span>
                  </div>
                  <div className="col-3 headings">
                    <span className=" ">Description</span>
                  </div>
                  <div className="col headings">
                    <span className=" ">Price</span>
                  </div>
                  <div className="col headings">
                    <span className=" ">Duration</span>
                  </div>
                  <div className="col headings">
                    <span
                      className=" "
                     
                    >
                      Actions
                    </span>
                    
                  </div>
                </div>
                
              {data.map((item) => (
                <div className="row align-items-center mb-2" key={item.id}>
                  <div className="col">
                    <span className="image-wrapper">
                      <img src={item.image?item.image:Product7} className="img-fluid" alt="Square" />
                    </span>
                  </div>
                  <div className="col">
                    <span>{item.serviceName}</span>
                  </div>
                  <div className="col-3">
                    <span className=" ">{item.description}</span>
                  </div>
                  <div className="col">
                    <span className=" ">{item.price}</span>
                  </div>
                  <div className="col">
                    <span className=" ">{item.duration}</span>
                  </div>
                  <div className="col">
                    <span
                      className=" "
                      onClick={() => {
                        setEditItem(item);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </span>
                    {/* <span className="ms-2 ">Delete</span> */}
                  </div>
                </div>
              ))}
            </div>:<>Verify Your Profile Before Adding Services</>}
          </Tab>
          <Tab eventKey="bookings" title="Bookings">
            <div className=" mt-3 p-3" style={{ backgroundColor: "#F3F3F3",  }}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Booking ID</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Service</th>
                    {/* <th scope = "col">Venue</th> */}
                    <th scope="col">Date</th>
                    {/* <th scope="col">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((item,index)=>(
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td>{item.bookingId}</td>
                    <td>{item.userDetails.firstname}</td>
                    <td>
        {item.servicesBooked.map((service, i) => (
          
          <div key={i}>{service.service.serviceName}</div>

        ))}
      </td>
                   
                    <td> {item.servicesBooked.map((service, i) => (
          
          <div key={i}> {service.date ? format(service.date, 'MMM dd yyyy') : ''} {service.time ? format(service.time, 'h:mm aa') : ''}</div>

        ))}</td>
                    {/* <td>
                      <button className="btn btn-success btn-sm">Approve</button>
                      <button className="btn btn-danger btn-sm ms-2">Reject</button>
                    </td> */}
                  </tr>
                  ))
}
                </tbody>
              </table>
            </div>
          </Tab>
        </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
