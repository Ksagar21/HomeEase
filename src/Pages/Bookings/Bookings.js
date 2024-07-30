import React, { useEffect, useState } from 'react';
import "../CartPage/Cart.css";
import pic from "../../Assets/Cart/Rectangle 734.png";
import { FiMinus, FiPlus } from "react-icons/fi";
import { HiTrash } from "react-icons/hi2";
import { deleteCart, getcart ,getbookings } from '../../Services/Api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';

function Bookings() {            
  const headings = ['Booking ID', 'Service Provider Email','Services', 'Date','Total'];
const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0)
  useEffect(() => {
    getcartApi();
  }, []);
  function getcartApi (){
    getbookings(sessionStorage.getItem('email'))
        .then((res) => {
          console.log(res.data.lists);
          setData(res.data.lists);
          setTotal(res.data.totalPrice)
        })
        .catch((err) => {
          console.log(err);
        });
  }
  function deleteCartApi(data){
    console.log(data)
    deleteCart(data)
    .then((res) => {
     toast.success(res.data.message)
     getcartApi()
    })
    .catch((err) => {
      console.log(err);
    });
  }
  return (
    <>
    <Navbar/>
    <div className="cart-container">
      <div className='container-fluid firstDiv mt-5 mx-5'>
        <div className= 'mt-5'>Home  > <span>Bookings</span> </div>
        {/* <div className='TopPadding'></div>
        <div>
          <span>Already registered? </span>
          <span className='Logintxt'>Please login here</span>
        </div> */}
      </div>

      <div className="table-responsive">
        <table className="full-width-table mt-5">
          <thead>
            <tr>
              {headings.map((heading, index) => (
                <th key={index}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className='tableRow'>
                <td className='td'>
                  <div className='d-flex align-items-center'>
                    {/* <img src={pic} alt="Product" className="product-image"/> */}
                    <div>
                    <span className='row mx-4'>  {item.bookingId}</span>
                    {/* <span className='row mx-4'> Date: {item.date}</span> */}
                    </div>
                  </div>
                </td>
                <td className='td'>          {item.servicesBooked.map((service, i) => (
                  <div key={i}>{service.service.shopEmail}</div>
                ))}</td>
                <td className='td'>          {item.servicesBooked.map((service, i) => (
                  <div key={i}>{service.service.serviceName}</div>
                ))}</td>
                {/* <td className='td'>
                  <div className='quantity'>
                    <FiMinus className=''/>
                    <span>{item.quantity}</span>
                    <FiPlus className=''/>
                  </div>
                </td> */}
                <td className='td'> {item.servicesBooked.map((service, i) => (
                  <div key={i}>
                    {" "}
                    {service.date
                      ? format(service.date, "MMM dd yyyy")
                      : ""}{" "}
                    {service.time ? format(service.time, "h:mm aa") : ""}
                  </div>
                ))}</td>
                <td className='td'>{item.paymentDetails.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </div>
      <div className='TotalDiv'>
  {/* <div className='item'>
    <span className='label'>Sub Total</span>
    <span className='value'>€{total}</span>
  </div> */}
  {/* <div className='item'>
    <span className='label'>Tips</span>
    <span className='value'>€5.00</span>
  </div> */}
  {/* {total?
  <button className='checkOutBtn' onClick={()=>navigate('/checkout')}>Proceed To Checkout</button>:null} */}
</div>

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
}

export default Bookings;
