import { useState } from "react";
import React from "react";
import axios from "axios";
import { AddService } from "../../Services/Api";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';

const ServiceForm = () => {
  const storedJson = sessionStorage.getItem("myObject");
  const storedObject = JSON.parse(storedJson);
  console.log(storedObject);
  const navigate = useNavigate()

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

  const initialFormState = {
    category: sessionStorage.getItem("category"),
    //shopName: storedObject.shopName,
    shopEmail: sessionStorage.getItem("email"),
    serviceName: "",
    phoneNo: "",
    description: "",

    serviceType: "Facial",
    price: "",
    image: "",
    postalCode: false,
  };

  const [formValue, setFormValue] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    serviceName: Yup.string().required("Service Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Price is required"),
    serviceType: Yup.string().required("Sub Category is required"),
    duration: Yup.number()
      .typeError("Duration must be a number")
      .positive("Duration must be positive")
      .required("Duration is required"),
  });

  const toggleSubmit = (e) => {
    e.preventDefault();

    validationSchema
      .validate(formValue, { abortEarly: false })
      .then(() => {
        console.log("Form is valid:", formValue);
        // Call your API function (AddService) here
        AddService(formValue)
          .then((res) => {
            console.log(res);
            setFormValue(initialFormState);
            toast.success(res.data.message)
            navigate("/home")
          })
          .catch((err) => {
            console.log("Error:", err);
          });
      })
      .catch((err) => {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
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
      setFormValue({
        ...formValue,
        image: reader.result,
      });
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const toggleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <>
      <div className="container">
        <form>
          <div className="d-flex flex-column">
            <div className="row">
              <span className=" heading">Service</span>
              <span className="fillEv">Fill everything*</span>
            </div>

            <div className="d-flex flex-wrap formStarts">
              {/* <div className="input-pair">
                <label className="inputLabel">Shop name*</label>
                <input
                  placeholder="shopName"
                  className="inputBox"
                  name="shopName"
                  value={formValue.shopName}
                  onChange={toggleChange}
                  disabled
                />
              </div> */}
              <div className="input-pair">
                <label className="inputLabel">Service Name*</label>
                <input
                  placeholder="Name"
                  name="serviceName"
                  className="inputBox"
                  value={formValue.serviceName}
                  onChange={toggleChange}
                />
                {errors.serviceName && (
                  <p className="error">{errors.serviceName}</p>
                )}
              </div>
            </div>

            <div className="d-flex flex-wrap inputFields">
              <div className="input-pair">
                <label className="inputLabel">Category</label>
                <input
                  placeholder="Category"
                  className="inputBox"
                  name="category"
                  value={formValue.category}
                  disabled
                />
              </div>

              {formValue.category && (
                <div className="input-pair">
                  <label className="inputLabel">Sub Category*</label>
                  <select
                    className="inputBox"
                    name="serviceType"
                    value={formValue.serviceType}
                    onChange={toggleChange}
                  >
                    <option value="">Select Sub Category</option>
                    {services
                      .find((service) => service.value === formValue.category)
                      ?.categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                  {errors.serviceType && (
                    <p className="error">{errors.serviceType}</p>
                  )}
                </div>
              )}
            </div>

            <div className="d-flex flex-wrap inputFields">
              <div className="input-pair">
                <label className="inputLabel">Description*</label>
                <input
                  type="textBox"
                  placeholder="Description"
                  name="description"
                  className="inputBox"
                  value={formValue.description}
                  onChange={toggleChange}
                />
                {errors.description && (
                  <p className="error">{errors.description}</p>
                )}
              </div>
              <div className="input-pair">
                <label className="inputLabel">Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  className="inputBox"
                  name="price"
                  value={formValue.price}
                  onChange={toggleChange}
                />
                {errors.price && <p className="error">{errors.price}</p>}
              </div>
            </div>

            <div className="d-flex flex-wrap inputFields">
              <div className="input-pair">
                <label className="inputLabel">Duration* hrs</label>
                <input
                  type="number"
                  placeholder="Duration"
                  name="duration"
                  className="inputBox"
                  value={formValue.duration}
                  onChange={toggleChange}
                />
                {errors.duration && (
                  <p className="error">{errors.duration}</p>
                )}
              </div>
            </div>

            <div>
              <div className="input-pair">
                <label className="inputLabel">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div>
              <button type="submit" className="btn" onClick={toggleSubmit}>
                Save
              </button>
              <button type="reset" className="btn">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ServiceForm;
