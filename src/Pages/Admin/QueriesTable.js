import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Admin/Admin.css"
import { getcontacts } from '../../Services/Api';

const QueriesTable = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [contacts, setContacts] = useState()
  function getcontactsApi() {
    getcontacts()
      .then((res) => {
        console.log(res.data.lists, "res");

        setContacts(res.data.lists, "res");
      })
      .catch(() => {});
  }

  useEffect(() => {
    getcontactsApi()
  }, [])
  
  const headers = ["S.No", "Name", "Email", "Message", "Actions"];

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <>

<table className="table table-striped border">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} scope="col">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {contacts?.map((row, index) => (
          <tr key={index} onClick={() => handleRowClick(row)}>
            <td>{index+1}</td>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.message}</td>
            <td onClick={()=>window.location.href = 'mailto:'+row.email}>Reply</td>
          </tr>
        ))}
      </tbody>
    </table>

    {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Row Details</h2>
            <p><strong>S.No:</strong> {selectedRow.id}</p>
            <p><strong>Sp Name:</strong> {selectedRow.name}</p>
            <p><strong>Category:</strong> {selectedRow.category}</p>
            <p><strong>Actions:</strong> {selectedRow.actions}</p>
          </div>
        </div>
      )}

    </>
  
  );
};

export default QueriesTable;
