import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Styles/MyFeaturesStyles.css';

export default function MyFeatures() {
  const [features, setFeatures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const featuresPerPage = 30;

  useEffect(() => {
    axios
      .get('https://featuremarketplacewebapi.azurewebsites.net/api/Feature/GetAllFeatures')
      .then((resp) => {
        setFeatures(resp.data);
      })
      .catch((err) => {
        
      });

    return () => {
     
    };
  }, []);

 
  const indexOfLastFeature = currentPage * featuresPerPage;
  const indexOfFirstFeature = indexOfLastFeature - featuresPerPage;
  const currentFeatures = features.slice(indexOfFirstFeature, indexOfLastFeature);


  const mapRows = currentFeatures.map((p) => (
    <tr key={p.id}>
      <td>{p.entityName}</td>
      <td>{p.featureName}</td>
      <td>{p.value}</td>
      <td>{p.featureDataType}</td>
      <td>{p.createdAt}</td>
    </tr>
  ));

  
  const totalPages = Math.ceil(features.length / featuresPerPage);


  const pageButtons = [];
  const maxPageButtons = 7;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);


  startPage = Math.max(1, endPage - maxPageButtons + 1);

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button
        key={i}
        className={`pagination-btn ${i === currentPage ? 'active' : ''}`}
        onClick={() => paginate(i)}
      >
        {i}
      </button>
    );
  }

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-container">
      <br />
      <h1>All Features</h1>
      <table className="custom-table">
        <thead>
          <tr >
            <th style={{backgroundColor:'#f6b743'}}>Entity Name</th>
            <th style={{backgroundColor:'#f6b743'}}>Feature Name</th>
            <th style={{backgroundColor:'#f6b743'}}>Feature Value</th>
            <th style={{backgroundColor:'#f6b743'}}>Feature Type</th>
            <th style={{backgroundColor:'#f6b743'}}>Timestamp</th>
          </tr>
        </thead>
        <tbody>{mapRows}</tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {/* Previous button */}
        <button
          className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </button>

        {/* Page buttons */}
        {pageButtons}

        {/* Next button */}
        <button
          className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
