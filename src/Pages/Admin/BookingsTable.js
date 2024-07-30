import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Admin/Admin.css";
import {format} from "date-fns"
import { getbookings } from "../../Services/Api";
const BookingsTable = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [bookings, setBookings] = useState([]);

function getBookingsApi() {
    getbookings()
      .then((res) => {
        console.log(res.data.lists, "res");

        setBookings(res.data.lists, "res");
      })
      .catch(() => {});
  }
  const headers = [
    "S.No",
    "Booking Id",
    "User Name",
    "Service Provider",
    "Date",
    "Price"
  ];

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

useEffect(() => {
  getBookingsApi()
}, [])

  return (
    <>
      <table className="table table-striped border">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* {data.map((row, index) => (
          <tr key={index} onClick={() => handleRowClick(row)}>
            <td>{row.name}</td>
            <td>{row.category}</td>
          </tr>
        ))} */}
        {bookings.map((item, index) => (
            <tr key={index} onClick={() => handleRowClick(item)}>
              <th scope="row">{index + 1}</th>
              <td>{item.bookingId}</td>
              <td>{item.userDetails.firstname}</td>
              <td>
                {item.servicesBooked.map((service, i) => (
                  <div key={i}>{service.service.serviceName}</div>
                ))}
              </td>

              <td>
                {" "}
                {item.servicesBooked.map((service, i) => (
                  <div key={i}>
                    {" "}
                    {service.date
                      ? format(service.date, "MMM dd yyyy")
                      : ""}{" "}
                    {service.time ? format(service.time, "h:mm aa") : ""}
                  </div>
                ))}
              </td>
              <td>{item.paymentDetails.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Row Details</h2>
            <p>
              <strong>S.No:</strong> {selectedRow.id}
            </p>
            <p>
              <strong>Sp Name:</strong> {selectedRow.name}
            </p>
            <p>
              <strong>Category:</strong> {selectedRow.category}
            </p>
            <p>
              <strong>Actions:</strong> {selectedRow.actions}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingsTable;
