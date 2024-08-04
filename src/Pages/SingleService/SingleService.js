import React, { useState, useEffect } from 'react';
import image from "../../Assets/image.png";
import image1 from "../../Assets/image1.png";
import image2 from "../../Assets/image2.png";
import Product1 from "../../Assets/Rectangle13.png";
import Product4 from "../../Assets/Product4.png";
import Product5 from "../../Assets/Product5.png";
import Product6 from "../../Assets/Product6.png";
import Product7 from "../../Assets/Product7.png";
import Product8 from "../../Assets/Product8.png";
import Product9 from "../../Assets/Product9.png";

import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { IoShirtOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { LuArrowRightLeft } from "react-icons/lu";
import { useNavigate, useParams } from 'react-router-dom';
import { addcart, getServices } from '../../Services/Api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns'; 
import { toast } from 'react-toastify';
import Navbar from '../navbar/Navbar';
const images = [Product9, Product4, Product5, Product6, Product7, Product8];
const thumbnailImages = [image, image1, image2];

function SingleServices() {
  const [currentIndexes, setCurrentIndexes] = useState([0, 1, 2, 3]); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const {_id} = useParams();
  console.log(_id,useParams)
  const [data, setData] = useState();
const navigate = useNavigate()

  function addtocart(data){
   if(sessionStorage.getItem("email")){
    const payload ={
      date:selectedDate,
      time:selectedTime,
        serviceId:data,
userEmail:sessionStorage.getItem('email')
    }
    if(selectedDate&&selectedTime&&data&&sessionStorage.getItem('email')){
    addcart(payload)
    .then((res)=>{
        console.log(res)
        toast.success(res.data.message)
        navigate('/cart')
    }).catch((err)=>{
      if(err.response.status ==400){
      toast.info(err.response.data.message)
      }
        console.log(err)
    })
  }
    else{
      toast.error("Please fill all the required fields")
    }}else{
      toast.error("Please login to add to cart")
    }
   
}

  useEffect(()=>{
    const payload = `_id=${_id}`
    getServices(payload)
    .then((res)=>{
        console.log(res.data.lists[0], "res")
        setData(res.data.lists[0], "res")
    }).catch((err)=>{
        console.log(err)
    })
},[])
  return (
    <><Navbar/>
    <div className="container-fluid">
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-1 col-3 mt-5 ">
           
          </div>
          <div className="col-md-4 col-9 ms-md-5 ms-5">
            <img src={data?.image?data.image:Product1} alt="Additional" className="img-fluid custom-img-width" />
          </div>
          <div className="col-md-4 col-12  ms-5">
            {/* <div className="d-flex justify-content-between">
              <span>Shop</span>
              <span>Women</span>
              <span>Top</span>
            </div> */}
            <div className="" style={{ fontSize: "30px" }}>{data?.serviceName} - {data?.shopName}</div>
            
            {/* <div className="" style={{ fontSize: "20px" }}>{data?.description}</div> */}

            <div className="mt-4">Schedule Date <span className="ms-2" style={{ fontSize: "10px", color: "gray" }}></span>
  <DatePicker
    selected={selectedDate}
    onChange={(date) => setSelectedDate(date)}
    minDate={new Date()} 
    dateFormat="dd/MM/yyyy" 
    className="form-control mt-2"
  /></div>
            <div className="mt-4">Schedule Time  <DatePicker
    selected={selectedTime}
    onChange={(time) => setSelectedTime(time)}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={15}
    dateFormat="h:mm aa"
    className="form-control mt-2"
  /></div>
            {/* <div className="mt-4">Location</div> */}
            <button type="button" className="btn mt-5" style={{ backgroundColor: "#8A33FD", color: "white" }} onClick={()=>addtocart(_id)}>
              <FaCartShopping />
              <span className="ms-2 ">Add to cart</span>
            </button>
            <hr className='mt-5' />
            <div className="row">
              <div className="col-6">
                <MdOutlineDateRange />
                <span className="ms-2 mt-5" style={{ fontSize: "12px" }}>Schedule date : {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''}</span>
              </div>
              <div className="col-6">
                <IoShirtOutline />
                <span className="ms-2 mt-5" style={{ fontSize: "12px" }}>Schedule Time : {selectedTime ? format(selectedTime, 'h:mm aa') : ''}</span>
              </div>
            </div>
            <div className="mt-2" style={{ fontSize: "15px" }}>{data?.description}</div>
          </div>
        </div>
      </div>
    </div>
    <div class=" footerDiv">
<footer class="py-3 my-4 ">
<ul class="nav justify-content-center border-bottom pb-3 mb-3">
<li class="nav-item"><a href="/about" class="nav-link px-2 text-muted">About Us</a></li>
<li class="nav-item"><a href="/contact" class="nav-link px-2 text-muted">Contact Us</a></li>
</ul>
<p class="text-center text-muted">© 2024 He. All rights reserved.</p>
</footer>
</div>
    </>
  );
}

export default SingleServices;
