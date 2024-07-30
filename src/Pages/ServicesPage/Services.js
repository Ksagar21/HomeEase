import React, { useEffect, useState } from 'react'
// import "./services.css";
import Product from "../../Assets/Product1.png";
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
import serviceimg from "../../Assets/Product8.png";
import image from "../../Assets/Rectangle13.png"
import { useParams } from 'react-router-dom';
import {addcart, getServices} from "../../Services/Api"
import "../ServicesPage/Service.css"


const Services = () => {
    const {shopName} = useParams();
    console.log(shopName,useParams, "shopName")
    const [data,setData] = useState([])

    useEffect(()=>{
        getServices(shopName)
        .then((res)=>{
            console.log(res.data.lists[0], "res")
            setData(res.data.lists, "res")
        }).catch((err)=>{
            console.log(err)
        })
    },[])
  

    function addtocart(data){
        const payload ={
            serviceId:data._id,
  userEmail:sessionStorage.getItem('email')
        }
        addcart(payload)
        .then((res)=>{
            console.log(res)
            
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <a className="navbar-brand ms-5" href="#">
                    HE
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex ms-auto">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <input className='form-control me-5' type='text' disabled placeholder='Register for Ps' />
                        <img src={Com1} className="img-fluid me-1" alt="Component 1" />
                        <img src={Com2} className="img-fluid me-1" alt="Component 2" />
                        <img src={Com3} className="img-fluid me-5" alt="Component 3" />
                    </form>
                </div>
            </nav>
            {/* {Object.keys(imageMappings).map((category, index) => (
                <div key={index} className="row my-4 mar mt-5">
                    <div className="col">
                        <div className="d-flex justify-content-between align-items-center mt-5 ms-4">
                            <h4>{category}</h4> 
                            <span className="me-5" style={{ color: "#8A33FD" }}>New <span className='' style={{ color: "black" }}>Recommended</span></span>
                        </div>
                        <div className="row row-cols-1 row-cols-md-4 g-2 ms-3 container-fluid">
                            {imageMappings[category].map((image, idx) => (
                                <div key={idx} className="col d-flex justify-content-center align-items-center">
                                    <img src={serviceimg} alt={`Image ${idx}`} className="img-fluid" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))} */}
                <div className="row my-4 mar mt-5">
                    <div className="col">
                        <div className="d-flex justify-content-between align-items-center mt-5 ms-4">
                            <h4>Mens</h4> 
                            <span className="me-5" style={{ color: "#8A33FD" }}>New <span className='' style={{ color: "black" }}>Recommended</span></span>
                        </div>
                        <div className="row row-cols-1 row-cols-md-4 g-2 ms-3 container-fluid">
                            {data.map((item, idx) => (
                                <div key={idx} className="col d-flex justify-content-center align-items-center">
                                    <div>
                                    <img src={image} alt={`Image ${idx}`} className="img-fluid" style={{width:"282px" , height:"370px" , borderRadius:"5px"}}/>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='d-flex flex-column'>
                                        <span>{item.serviceName}</span>
                                        <span>{item.price}</span>
                                        </div>
                                        <div className='button' onClick={()=>addtocart(item)}>+</div>
                                    </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
        </div>
  )
}

export default Services