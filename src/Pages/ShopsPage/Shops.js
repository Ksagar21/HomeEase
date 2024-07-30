
import React, { useEffect, useState } from 'react';
import './Shops.css';
import Product from "../../Assets/Product.png";
import Product1 from "../../Assets/Product1.png";
import Product2 from "../../Assets/Product2.png";
import Product4 from "../../Assets/Product4.png";
import Product5 from "../../Assets/Product5.png";
import Product6 from "../../Assets/Product6.png";
import Product7 from "../../Assets/Product7.png";
import Product8 from "../../Assets/Product8.png";
import Product9 from "../../Assets/Product9.png";
import Com1 from "../../Assets/Component 1.png";
import Com2 from "../../Assets/Component 2.png";
import Com3 from "../../Assets/Component 3.png";
import Shop from "../../Assets/Rectangle13.png"
import { IoIosArrowForward } from "react-icons/io";
import { addcart, getServices, GetShops } from "../../Services/Api"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const imageMappings = {
  'mens-saloon': [Product, Product1, Product2],
  'Womens Spa': [Product1, Product2, Product, Product4, Product5, Product6, Product7, Product8, Product9],
  'painter': [Product1, Product2, Product],
  'carwash': [Product4, Product5, Product6],
  'dryclean': [Product7, Product8, Product9],
  'House Clean': [Product, Product1, Product2],
  'Electrician': [Product4, Product5],
  'Ac Service': [Product6, Product7, Product8],
  'Corpenter': [Product9, Product, Product1],
  'price': [Product2, Product4],
  'Location': [Product5, Product6, Product7],
  'Day': [Product8, Product9, Product],
  'Time': [Product1, Product2]
};
const categories = {
  'Mens Saloon': 'menssaloon',
  'Womens Spa': 'womensspa',
  'Painter': 'painting',
  'Plumbing': 'plumbing',
  'Electrician': 'electrical',
  'Ac Service': 'acservice',
  'Home Services': 'homeservices'
}

function Shops() {
  const [selectedFilter, setSelectedFilter] = useState("menssaloon");
  const [images, setImages] = useState(imageMappings['mens-saloon']);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedFilter) {
      getServices(selectedFilter)
        .then((res) => {
          console.log(res.data.lists);
          setData(res.data.lists);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(data)
  }, [selectedFilter]);

  const handleFilterClick = (filter) => {
    const categoryValue = categories[filter];
    setSelectedFilter(categoryValue);
  };

  const navigateService = (email) => {
    navigate(`/services/${email}`);
  }
  function addtocart(data){
    const payload ={
        serviceId:data._id,
userEmail:sessionStorage.getItem('email')
    }
    addcart(payload)
    .then((res)=>{
        console.log(res)
        toast.success(res.data.message)
        
    }).catch((err)=>{
      if(err.response.status ==400){
      toast.info(err.response.data.message)
      }
        console.log(err)
    })
}
  return (
    <div className="container-fluid">
      <div className="row mt-4 pt-5">
        <div className="col-md-3 col-lg-2 sidebar border fixed-sidebar desktop-sidebar" style={{ backgroundColor: '#FFFFFF', height: '100vh', overflowY: 'auto' }}>
          <div className="position-sticky">
            <ul className="nav flex-column mt-3">
              <li className="nav-item mt">
                <span className="nav-link" style={{ cursor: 'pointer', color: '#000000' }} onClick={() => handleFilterClick('')}>
                  Category
                </span>
              </li>
              <hr />
              {Object.keys(categories).map((filterKey) => (
                <li key={filterKey} className="nav-item" onClick={() => handleFilterClick(filterKey)}>
                  <span className="nav-link d-flex justify-content-between align-items-center" style={{ cursor: 'pointer', color: '#000000' }}>
                    <span className="d-none d-md-inline">{filterKey}</span>
                    <IoIosArrowForward />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="offcanvas offcanvas-start mobile-sidebar" tabIndex={-1} id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasSidebarLabel">Categories</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="nav flex-column mt-3">
              <li className="nav-item mt">
                <span className="nav-link" style={{ cursor: 'pointer', color: '#000000' }} onClick={() => handleFilterClick('')}>
                  Category
                </span>
              </li>
              <hr />
              {Object.keys(imageMappings).map((filterKey) => (
                <li key={filterKey} className="nav-item" onClick={() => handleFilterClick(filterKey)}>
                  <span className="nav-link d-flex justify-content-between align-items-center" style={{ cursor: 'pointer', color: '#000000' }}>
                    <span>{filterKey}</span>
                    <IoIosArrowForward />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4>{Object.keys(categories).find(key => categories[key] === selectedFilter)}</h4>
            <span className="me-5" style={{ color: "#8A33FD" }}>New <span className='' style={{ color: "black" }}>Recommended</span></span>
          </div>
          <div className="col-md-12 mt-3">
            <div className="row justify-content-center">
            {data.map((item, idx) => (
                                <div key={idx} className="col d-flex justify-content-center align-items-center">
                                    <div>
                                    <img src={Shop} alt={`Image ${idx}`} className="img-fluid" style={{width:"282px" , height:"370px" , borderRadius:"5px"}}/>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='d-flex flex-column'>
                                        <span>{item.serviceName}</span>
                                        <span>{item.price}</span>
                                        </div>
                                        <div className='button'onClick={()=>addtocart(item)} >+</div>
                                    </div>

                                    </div>
                                </div>
                            ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Shops;
