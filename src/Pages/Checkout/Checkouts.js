import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import "./CheckOut.css";
import checkout1 from "../../Assets/checkout/Frame 440.png";
import checkout2 from "../../Assets/checkout/Frame 441.png";
import checkout3 from "../../Assets/checkout/Frame 442.png";
import checkout4 from "../../Assets/checkout/Frame 440.png";
import { checkout, getcart } from "../../Services/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CheckOut = () => {
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardSecurityCode: "",
  });
  const navigate = useNavigate();
  const [services, setservices] = useState([]);
  const [total, setTotal] = useState();
  const [errors, setErrors] = useState({});

  const toggleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const toggleSubmit = (e) => {
    console.log(e);
    console.log(formValue)
    e.preventDefault();
    validationSchema
      .validate(formValue)
      .then(() => {
        console.log("object");
        const payload = {
          userDetails: {
            firstname: formValue.firstName,
            lastname: formValue.lastName,
            phoneNo: formValue.phone,
            userEmail: sessionStorage.getItem("email"),
            address: formValue.address,
            city: formValue.city,
            state: formValue.state,
            postalCode: formValue.postalCode,
          },
          paymentDetails: {
            cardNumber: formValue.cardNumber,
            cardHolderName: formValue.cardName,
            expiryDate: formValue.cardExpiry,
            cvv: formValue.cardSecurityCode,
            amount: total,
          },
          servicesBooked: services,
        };
        console.log(payload);
        checkout(payload)
          .then((res) => {
            console.log(res);
            toast.success(res.data.message);
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
        console.log("Form submitted successfully", formValue, services);
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          console.log(error, "ggg");
          validationErrors[error.path] = error.message;
        });
        console.log(validationErrors);
        setErrors(validationErrors);
      });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    address: Yup.string().required("Street address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    postalCode: Yup.string().required("Postal code is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    cardNumber: Yup.string().required("Card Number is required"),
    cardName: Yup.string().required("Name on Card is required"),
    cardExpiry: Yup.string().required("Expiration Date is required"),
    cardSecurityCode: Yup.string().required("Security Code is required"),
  });

  function getcartApi() {
    getcart(sessionStorage.getItem("email"))
      .then((res) => {
        console.log(res.data.cartItems);
        setservices(res.data.cartItems);
        setTotal(res.data.totalPrice);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getcartApi();
  }, []);

  const transactionApps = [checkout1, checkout2, checkout3, checkout4];

  return (
    <>
      <div className="container-fluid">
        {/* <span>Home > My Account > Check Out </span>
                <span>Check Out</span> */}
        <div className="d-flex flex-column flex-md-row align-items-center">
          <div className="form col-md-8 mx-md-5 mb-4 mb-md-0">
            {/* <span>Billing Details</span> */}
            <form>
              <div className="d-flex flex-column">
                <div className="row">
                  <span className="heading">Check Out</span>
                  <span className="fillEv">Fill everything*</span>
                </div>
                <div className="d-flex flex-wrap formStarts">
                  <div className="input-pair">
                    <label className="inputLabel">First name*</label>
                    <input
                      placeholder="First Name"
                      className="inputBox"
                      name="firstName"
                      value={formValue.firstName}
                      onChange={toggleChange}
                    />
                    {errors.firstName && (
                      <p className="error">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="input-pair">
                    <label className="inputLabel">Last Name*</label>
                    <input
                      placeholder="Last Name"
                      name="lastName"
                      className="inputBox"
                      value={formValue.lastName}
                      onChange={toggleChange}
                    />
                    {errors.lastName && (
                      <p className="error">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="d-flex flex-wrap inputFields">
                  <div className="input-pair">
                    <label className="inputLabel">Street Address*</label>
                    <input
                      placeholder="Street Address"
                      className="inputBox"
                      name="address"
                      value={formValue.address}
                      onChange={toggleChange}
                    />
                    {errors.address && (
                      <p className="error">{errors.address}</p>
                    )}
                  </div>
                  <div className="input-pair">
                    <label className="inputLabel">Phone*</label>
                    <input
                      placeholder="Phone"
                      className="inputBox"
                      value={formValue.phone}
                      name="phone"
                      onChange={toggleChange}
                    />
                    {errors.phone && <p className="error">{errors.phone}</p>}
                  </div>
                </div>
                <div className="d-flex flex-wrap inputFields">
                  <div className="input-pair">
                    <label className="inputLabel">City*</label>
                    <input
                      placeholder="City"
                      className="inputBox"
                      value={formValue.city}
                      name="city"
                      onChange={toggleChange}
                    />
                    {errors.city && <p className="error">{errors.city}</p>}
                  </div>
                  <div className="input-pair">
                    <label className="inputLabel">State*</label>
                    <input
                      placeholder="State"
                      className="inputBox"
                      value={formValue.state}
                      name="state"
                      onChange={toggleChange}
                    />
                    {errors.state && <p className="error">{errors.state}</p>}
                  </div>
                </div>
                <div className="d-flex flex-wrap inputFields">
                  <div className="input-pair">
                    <label className="inputLabel">Postal Code*</label>
                    <input
                      placeholder="Postal Code"
                      className="inputBox"
                      value={formValue.postalCode}
                      name="postalCode"
                      onChange={toggleChange}
                    />
                    {errors.postalCode && (
                      <p className="error">{errors.postalCode}</p>
                    )}
                  </div>
                </div>
                <div>
                  {/* <button type='submit' className='btn'>Continue To Delivery</button> */}
                </div>
              </div>
            </form>
          </div>
          <div className="col-12  col-md-3 orderSummary">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Order Summary</th>
                </tr>
              </thead>
              <tbody>
                {services.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.service.image}
                        alt={`Item ${index + 1}`}
                        className="img-thumbnail"
                        style={{ width: "80px" }}
                      />{" "}
                      {item.service.price}
                    </td>
                  </tr>
                ))}
              </tbody>
              {total}
            </table>
          </div>
        </div>
        <div>
          <span className="row mx-5 mt-4 mb-2">Payment Method</span>
          <span className="row mx-5 mb-4">
            All transactions are secure and encrypted.
          </span>
          <div className="paymentDiv col-md-8 mx-5">
            <div>
              <span>We accept all major credit cards.</span>
            </div>
            <div className="row">
              {transactionApps.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  style={{ width: "100px" }}
                  className="mx-2 mt-4"
                  alt={`Payment method ${index + 1}`}
                />
              ))}
            </div>
            <div className="d-flex flex-wrap inputFields">
              <div className="input-pair">
                <input
                  placeholder="Card Number"
                  className="inputBox border border-secondary rounded"
                  name="cardNumber"
                  value={formValue.cardNumber}
                  onChange={toggleChange}
                />
                {errors.cardNumber && (
                  <p className="error">{errors.cardNumber}</p>
                )}
              </div>
              <div className="input-pair">
                <input
                  placeholder="Name on Card"
                  className="inputBox border border-secondary rounded"
                  name="cardName"
                  value={formValue.cardName}
                  onChange={toggleChange}
                />
                {errors.cardName && <p className="error">{errors.cardName}</p>}
              </div>
              <div className="input-pair">
                <input
                  placeholder="Expiration Date (MM/YY)"
                  className="inputBox border border-secondary rounded"
                  name="cardExpiry"
                  value={formValue.cardExpiry}
                  onChange={toggleChange}
                />
                {errors.cardExpiry && (
                  <p className="error">{errors.cardExpiry}</p>
                )}
              </div>
              <div className="input-pair">
                <input
                  placeholder="Security Code"
                  className="inputBox border border-secondary rounded"
                  name="cardSecurityCode"
                  value={formValue.cardSecurityCode}
                  onChange={toggleChange}
                />
                {errors.cardSecurityCode && (
                  <p className="error">{errors.cardSecurityCode}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mx-5 mt-1">
            <button type="submit" className="btn" onClick={toggleSubmit}>
              Submit Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
