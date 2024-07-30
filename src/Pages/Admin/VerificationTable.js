import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Admin/Admin.css";
import { getProviders, verifyprovider } from "../../Services/Api";

import { toast } from 'react-toastify';

const VerificationTable = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headers = [
    "S.No",
    "Provider Name",
    " Provider Email",
    "Category",
    "Actions",
  ];

  useEffect(() => {
    getProvidersAPI();
  }, []);

  function getProvidersAPI() {
    const payload = `?isverified=false`;
    getProviders(payload)
      .then((res) => {
        console.log(res.data.providers, "res");

        setData(res.data.providers, "res");
      })
      .catch(() => {});
  }
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };
  const handleApprove = (item,isverified) => {
    const payload = {
      emailId: item.shopEmail,
      isverified:isverified,
    };
    verifyprovider(payload)
    .then((res) => {
      toast.success(res.data.message, "res");
      getProvidersAPI();
    })
    .catch(() => {});
  }

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
          {data.map((item, index) => (
            <tr key={index} onClick={() => handleRowClick(item)}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.shopEmail}</td>
              <td>{item.category}</td>

              <td>
                <button type="button" className="btn btn-primary" onClick={()=>handleApprove(item,true)}>
                  Approve
                </button>
                <button type="button" className="btn btn-secondary"onClick={()=>handleApprove(item,false)} >
                  Decline
                </button>
              </td>
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

export default VerificationTable;
