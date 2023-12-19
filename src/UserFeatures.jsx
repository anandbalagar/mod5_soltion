import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyEntities from './MyEntities';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PieChartComponent from './Components/PieChartComponent';

import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function UserFeatures() {
  const [features, setFeatures] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletedFeatureName, setDeletedFeatureName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const featuresPerPage = 15;

  const storedUserObject = JSON.parse(sessionStorage.getItem('UserObj'));
  const username = storedUserObject.name;
  let Navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://featuremarketplacewebapi.azurewebsites.net/api/Feature/GetFeaturesByUserName/${username}`)
      .then((resp) => {
        setFeatures(resp.data);
        console.log(resp.data);
      })
      .catch((err) => {
        
      });

    return () => {
     
    };
  }, [username]);

  
  const indexOfLastFeature = currentPage * featuresPerPage;
  const indexOfFirstFeature = indexOfLastFeature - featuresPerPage;
  const currentFeatures = features.slice(indexOfFirstFeature, indexOfLastFeature);

  const handleDeleteClick = (featureId, featureName) => {
    const shouldDelete = window.confirm(`Delete the feature "${featureName}"?`);

    if (shouldDelete) {
      axios
        .delete(`https://featuremarketplacewebapi.azurewebsites.net/api/Feature/DeleteFeature/${featureId}`)
        .then(() => {
          setDeletedFeatureName(featureName);
          setShowDeleteModal(true);
          setFeatures((prevFeatures) => prevFeatures.filter((feature) => feature.id !== featureId));
        })
        .catch((err) => {
        
          console.error('Error deleting feature', err);
        });
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    Navigate('/featurehome/UserFeatures');
  };

  const maprows = currentFeatures.map((p) => (
    <tr key={p.id}>
      <td className="text-nowrap text-center ">{p.entityName}</td>
      <td className="text-nowrap text-center ">{p.featureName}</td>
      <td className="text-nowrap text-center ">{p.value}</td>
      <td className="text-nowrap text-center ">{p.featureDataType}</td>
      <td className="text-nowrap text-center ">{p.createdAt}</td>
      <td className="text-nowrap text-center ">
        <Link
          className="btn btn-primary"
          to={{
            pathname: `/featurehome/editfeature/${p.featureName}`,
            state: { featureDetails: p },
          }}
        >
          Edit
        </Link>
      </td>
      <td className="text-nowrap text-center ">
        <button
          className="btn btn-danger"
          onClick={() => handleDeleteClick(p.featureId, p.featureName)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

 
  const totalPages = Math.ceil(features.length / featuresPerPage);

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <MyEntities />
      <br />
      <PieChartComponent></PieChartComponent>
      <br />

      <h2 className="text-left">My Features</h2>

      
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Feature Deleted Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Feature "${deletedFeatureName}" has been deleted successfully.`}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover" style={{ border: '1px solid black' }}>
            <thead>
              <tr>
                <th className="text-nowrap text-center ">Entity Name</th>
                <th className="text-nowrap text-center ">Feature Name</th>
                <th className="text-nowrap text-center ">Feature Value</th>
                <th className="text-nowrap text-center ">Feature Type</th>
                <th className="text-nowrap text-center ">Timestamp</th>
                <th className="text-nowrap text-center ">Edit</th>
                <th className="text-nowrap text-center ">Delete</th>
              </tr>
            </thead>
            <tbody>{maprows}</tbody>
          </table>
        </div>
      </div>

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
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`pagination-btn ${index + 1 === currentPage ? 'active' : ''}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        {/* Next button */}
        <button
          className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
