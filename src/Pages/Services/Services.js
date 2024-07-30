import React, { useEffect, useState } from "react";
import firstimg from "../../Assets/HomePage/High coziness.png";
import { Modal, Button } from "react-bootstrap";
import { getServices } from "../../Services/Api";
import Shop from "../../Assets/Rectangle13.png";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import "./Services.css";
import Carousel from "react-bootstrap/Carousel";
import Mens from "../../Assets/saloon.png";
import Navbar from "../navbar/Navbar";

const Services = () => {
  const navigate = useNavigate();
  const services = [
    {
      serviceName: "Mens Saloon",
      value: "menssaloon",
      categories: ["HairCut", "Massage"],
      image: "",
    },
    {
      serviceName: "Female",
      value: "female",
      categories: ["Saloon", "Spa", "Makeup & Styling", "Hair Studio"],
      image: "",
    },
    {
      serviceName: "Appliance Repair & Service",
      value: "service",
      categories: [
        "AC & Cooler",
        "Chimney Repar/GasStove",
        "Geyser & Boiler",
        "Inverter",
        "Microwave & Oven",
        "Refrigerator",
        "Television",
        "Washing Machine",
      ],
      image: "",
    },
    {
      serviceName: "Cleaning & Pest Control",
      value: "cleaning",
      categories: ["Bathroom & Kitchen", "Full Home","Sofa & Carpet","Jermit Control","Pest Control"],
      image: "",
    },
    {
      serviceName: "Home Repair & Installation",
      value: "homerepair",
      categories: ["Electrician", "Plumber","Carpenter","JKEA installation","Furniture Assembly"],
      image: "",
    },
    {
      serviceName: "Painting & Water Profing",
      value: "menssaloon",
      categories: ["Full Home", "Few Rooms","Wall Panel"],
      image: "",
    },
  ];
  const categories = {
    "Mens Saloon": "menssaloon",
    "Womens Spa ": "womensspa",
    Painting: "painting",
    // 'Plumb': 'plumbing',
    Electrician: "electrical",
    "AC Service": "acservice",
    //'Home ': 'homeservices'
  };

  const carouselData = [
    "https://naturals.in/wp-content/uploads/2024/06/Untitled-design.png",
    "https://naturals.in/wp-content/uploads/2022/04/sc-4.jpg.webp",
    "https://naturals.in/wp-content/uploads/2022/04/sc-2.jpg.webp",
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedData, setselectedData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState([]);

  const handleModalOpen = (data) => {
    setselectedData(data)
    setSelectedCategory(data.value);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCategory("");
  };

  useEffect(() => {
    if (selectedCategory) {
      const payload = `category=${selectedCategory}`;
      getServices(payload)
        .then((res) => {
          console.log(res.data.lists);
          setData(res.data.lists);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(data);
  }, [selectedCategory]);

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([
    { label: "Mens Saloon", value: "menssaloon" },
    { label: "Womens Spa", value: "womensspa" },
    { label: "AC Service", value: "acservice" },
    { label: "Painting", value: "painting" },
  ]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleChange = (selectedOption) => {
    setInputValue(selectedOption ? selectedOption.label : "");
    handleModalOpen(selectedOption.label);
  };

  const customComponents = {
    DropdownIndicator: null,
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="d-flex flex-column flex-md-column justify-content-around align-items-center">
          <div className="col-9 mt-5">
            <span className="welcomeTag gradient-text">Welcome to He! {sessionStorage.getItem('username')?sessionStorage.getItem('username'):""}</span>
            <Select
              components={customComponents}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              onChange={handleChange}
              options={options}
              isClearable
              isSearchable
              placeholder="Search for Services"
              noOptionsMessage={() => "Type to add new value"}
              className="selectBar"
            />
            <div className="d-flex justify-content-between mt-2">
              {services.map((item,index) => (
                <div
                  className="d-flex flex-row align-items-center ServiceBorder"
                  key={index}
                  onClick={() => handleModalOpen(item)}
                >
                  <img src={Mens} alt="" style={{ maxWidth: "56px" }} />
                  <p style={{ cursor: "pointer" }}>{item.serviceName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Carousel data-bs-theme="dark" className="container col-9 mt-4">
          {carouselData.map((imageUrl, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 custom-carousel-image"
                src={imageUrl}
                alt={`Slide ${index + 1}`}
              />
              <Carousel.Caption>
                <h5 className="text-light">Offers {index + 1}</h5>
                <p className="text-light">Summer Combo Offer lets Book .</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Selected Category: {selectedCategory}
          <div className="col-md-12 mt-3">
            <div className="row justify-content-center">
              {data.map((item, idx) => (
                <div key={idx} className="d-flex flex-column">
                  <Link to={`/singleServices/${item._id}`} >
                  <div className='d-flex flex-row justify-content-between mx-5 my-2 '>
                      <div><img src={Shop} alt={`Image ${idx}`} className="img-fluid" style={{ width: "120px", height: "120px", borderRadius: "5px" }} /></div>
                      <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-flex flex-column'>
                          <span >{item.serviceName}</span>
                          <span>{item.serviceType}</span>
                          <span>{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal> */}

        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedData.serviceName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Selected Category: {selectedData.serviceName}
            <div className="col-md-12 mt-3">
              <div className="row justify-content-center">
                {data.map((item, idx) => (
                  <div
                    key={idx}
                    className="d-flex flex-column mb-5 container-fluid "
                    onClick={() => navigate(`/singleServices/${item._id}`)}
                  >
                    <div className="  d-flex flex-row align-items-center mx-5 ">
                      <div>
                        <img
                          src={item.image?item.image:Shop}
                          alt={`Image ${idx}`}
                          className="img-fluid"
                          style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                      <div
                        className="d-flex flex-column justify-content-center ms-5"
                        style={{ flex: 1 }}
                      >
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                          {" "}
                          {item.serviceName}
                        </span>
                        <span style={{ fontSize: "14px", color: "grey" }}>
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div class=" footerDiv">
<footer class="py-3 my-4 ">
<ul class="nav justify-content-center border-bottom pb-3 mb-3">
<li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About Us</a></li>
<li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Contact Us</a></li>
</ul>
<p class="text-center text-muted">© 2024 He. All rights reserved.</p>
</footer>
</div>
    </>
  );
};

export default Services;
