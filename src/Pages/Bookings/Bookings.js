import React, { useEffect, useState } from 'react';
import "../CartPage/Cart.css";
import pic from "../../Assets/Cart/Rectangle 734.png";
import { FiMinus, FiPlus } from "react-icons/fi";
import { HiTrash } from "react-icons/hi2";
import { deleteCart, getcart ,getbookings } from '../../Services/Api';
import { toast } from 'react-toastify';
import { format, isToday } from 'date-fns';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Bookings() {            
  const headings = ['Booking ID', 'Service Provider Email','Services','Status', 'Date','Total'];
const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0)
  useEffect(() => {
    getcartApi();
  }, []);
  function getcartApi (){
    const query =`?userEmail=`+sessionStorage.getItem('email')
    getbookings(query)
        .then((res) => {
          console.log(res.data.lists);
          setData(res.data.lists);
          setTotal(res.data.totalPrice)
        })
        .catch((err) => {
          console.log(err);
        });
  }
  function getStatus(date) {
    const today = new Date();
    const bookingDate = new Date(date);
    return isToday(bookingDate) || bookingDate > today ? 'Active' : 'Inactive';
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
                 <td className='td'>
                    {item.servicesBooked.map((service, i) => (
                      <div key={i} style={{color:getStatus(service.date)==="Active"?"blue":"gray"}}>{getStatus(service.date)}</div>
                    ))}
                </td>
                <td className='td'> {item.servicesBooked.map((service, i) => (
                  <div key={i}>
                    {" "}
                    {service.date
                      ? format(service.date, "MMM dd yyyy")
                      : ""}{" "}
                    {service.time ? format(service.time, "h:mm aa") : ""}
                  </div>
                ))}</td>
                <td className='td'>{item.paymentDetails.amount+10}</td>
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
 <Footer/>
    </>
  );
}

export default Bookings;
