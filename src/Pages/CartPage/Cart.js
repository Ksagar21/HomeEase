import React, { useEffect, useState } from 'react';
import "./Cart.css";
import pic from "../../Assets/Cart/Rectangle 734.png";
import { FiMinus, FiPlus } from "react-icons/fi";
import { HiTrash } from "react-icons/hi2";
import { deleteCart, getcart } from '../../Services/Api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Cart() {
  const headings = ['Service Details', 'Date and Time','Price', 'Subtotal', 'Actions'];
const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0)
  useEffect(() => {
    getcartApi();
  }, []);
  function getcartApi (){
    getcart(sessionStorage.getItem('email'))
        .then((res) => {
          console.log(res.data.cartItems);
          setData(res.data.cartItems);
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
    <Navbar cart={data.length}/>
    <div className="cart-container">
      <div className='container-fluid firstDiv mt-5 mx-5'>
        <div className= 'mt-5'>Home  > <span>Add To Cart</span> </div>
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
            {data.map((item, index) => (
              <tr key={index} className='tableRow'>
                <td className='td'>
                  <div className='d-flex align-items-center'>
                    {/* <img src={pic} alt="Product" className="product-image"/> */}
                    <div>
                    <span className='row mx-4'>  {item.service.serviceName}</span>
                    {/* <span className='row mx-4'> Date: {item.date}</span> */}
                    </div>
                  </div>
                </td>
                <td className='td'> {item.date ? format(item.date, 'MMM dd yyyy') : ''} {item.time ? format(item.time, 'h:mm aa') : ''}</td>
                <td className='td'>€{item.service.price}</td>
                {/* <td className='td'>
                  <div className='quantity'>
                    <FiMinus className=''/>
                    <span>{item.quantity}</span>
                    <FiPlus className=''/>
                  </div>
                </td> */}
                {/* <td className='td'>€----</td> */}
                <td className='td'>€{item.service.price}</td>
                <td className='td' onClick={()=>deleteCartApi(item.cartId)}>
                  <HiTrash />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </div>
      <div className='TotalDiv'>
      <div className='item'>
    <span className='label'>Platform Fee</span>
    <span className='value'>€10.00</span>
  </div>
  <div className='item'>
    <span className='label'>Sub Total</span>
    <span className='value'>€{total+10}</span>
  </div>
   {total?
  <button className='checkOutBtn' onClick={()=>navigate('/checkout')}>Proceed To Checkout</button>:null}
</div>

    </div>
   <Footer/>
    </>
  );
}

export default Cart;
