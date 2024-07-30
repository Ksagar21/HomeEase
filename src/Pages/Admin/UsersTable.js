import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Admin/Admin.css"

const UsersTable = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchUsersData = async () => {
//       const response = await axios.get('/api/users');
//       setData(response.data);
//     };
//     fetchUsersData();
//   }, []);

  const headers = ["S.No","Sp Name", "Category"];

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
        {data.map((row, index) => (
          <tr key={index} onClick={() => handleRowClick(row)}>
            <td>{row.name}</td>
            <td>{row.category}</td>
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

export default UsersTable;
