import React , { useState } from 'react';
import "./Home.css";
import Com1 from "../../Assets/Component 1.png";
import Com2 from "../../Assets/Component 2.png";
import Com3 from "../../Assets/Component 3.png";
import Product7 from "../../Assets/Product7.png";
import { FaPhone } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";



const Homepage = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Women spa - Face tan remove and pac", duration: "1 hr", price: "350", image: Product7, description: "nice facial" },
  ]);

  const [orders, setOrders] = useState([
    { id: 1, orderId: 1001, customer: "kanthan", service: "Full Body Massage", date: "25 jan 2024" },
    { id: 2, orderId: 1002, customer: "John Smith", service: "Facial Treatment", date: "10 Aug 2024" }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", duration: "", price: "", image: "", description: "" });
  const [imagePreview, setImagePreview] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("services");

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result );
        setNewItem({ ...newItem, image: reader.result  });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedItems = [...items, { ...newItem, id: items.length + 1 }];
    setItems(updatedItems);
    setShowForm(false);
    setNewItem({ name: "", duration: "", price: "", image: "", description: "" });
    setImagePreview("");
    console.log('Updated Items:', updatedItems);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = () => {
    setActiveTab("order");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a className="navbar-brand ms-5" href="#" style={{ fontSize: "30px" }}>
          HE
        </a>
        <span className='' style={{ fontSize: "15px" }}>Home <br /> Ease</span>
          <form className="d-flex ms-auto">
            <button type="button" className="btn btn-secondary me-3">logout</button>
          </form>
      </nav>

    
      <div className="image-container">
        <div className="split right mt-5">
          <div className="info-container mt-5 info-text">
            <div className="mt-5" style={{ marginTop: "50px", fontSize: "20px" }}>Annies Women Spa</div>
            <div className="" style={{ textAlign: "left" }}><FaPhone /> <span className='ms-2'>35645646465456</span></div>
            <div className="" style={{ textAlign: "left" }}><CgMail /><span className='ms-2'>gmail.com</span></div>
            <div className="" style={{ textAlign: "left" }}><CiLocationOn /><span className='ms-2'>73, Panchali Amman Kovil Street</span></div>
          </div>
        </div>
      </div>

      <div className="search-bar-container">
        <div className="container">
          <div className="row w-80">
            <div className="col-md-4 d-flex align-items-center">
              <ul className="nav me-auto ms-5">
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === "services" ? "active" : ""}`}
                    href="#"
                    onClick={() => setActiveTab("services")}
                  >
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === "order" ? "active" : ""}`}
                    href="#"
                    onClick={() => setActiveTab("order")}
                  >
                    Booking
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-end">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="btn btn-primary ms-2" onClick={handleAddClick}>+Add</button>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="container mt-3 p-3" style={{ backgroundColor: "#F3F3F3", maxWidth: "80%" }}>
            <form onSubmit={handleFormSubmit}>
              <div className="row mb-3">
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Service Name"
                    name="name"
                    value={newItem.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    value={newItem.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Duration"
                    name="duration"
                    value={newItem.duration}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                    name="price"
                    value={newItem.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <img src={imagePreview} className="img-fluid mt-2" alt="Preview" />
                  )}
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        )}

        {activeTab === "services" && (
          <div className="container mt-3 p-3">
            <div className="row ms-5">
              <div className="col-12">
                <div className="single-tab mb-3">Services</div>
              </div>
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered" style={{ width: '88%' }}>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map(item => (
                        <tr key={item.id} onClick={() => setActiveTab("services")}>
                          <td>
                            <img src={item.image} className="img-fluid" alt="Service" style={{ width: '50px', height: '50px' }} />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>{item.duration}</td>
                          <td>{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "order" && (
          <div className="container mt-3 p-3" style={{ backgroundColor: "#F3F3F3", maxWidth: "80%" }}>
            <table className="table table-striped table-responsive">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Booking ID</th>
                  <th>User Name</th>
                  <th>Service Name</th>
                  <th>Date Time</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} onClick={() => handleRowClick()}>
                    <td>{order.id}</td>
                    <td>{order.orderId}</td>
                    <td>{order.customer}</td>
                    <td>{order.service}</td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <footer className="footer bg-light text-center text-lg-start  mt-5 " >
        <div className="container p-4" style={{marginTop:"100px"}}>
        </div>
        <div className="text-center p-3 bg-dark text-light">
          © 2024 HE Home Ease | All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
