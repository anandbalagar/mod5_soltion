import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "./Styles/MyFeaturesStyles.css";

const EditFeature = () => {
    const { FeatureName } = useParams();
    const [featureData, setFeatureData] = useState({
        featureName: '',
        featureId: '',
        featureDataType: '',
        value: '',
        createdAt: '',
        approvalStatus: '',
        adminComments: '',
        userName: '',
        entityName: ''
    });
    const [showModal, setShowModal] = useState(false); 

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFeatureData({ ...featureData, [id]: value });
    };

    useEffect(() => {
        axios.get(`https://featuremarketplacewebapi.azurewebsites.net/api/Feature/GetFeatureByFeatureName/${FeatureName}`)
            .then(resp => {
                setFeatureData(resp.data);
            })
            .catch(err => {
                console.error('Error fetching feature data', err);
            });
    }, [FeatureName]);

    const handleEditFeature = () => {
        axios.put(`https://featuremarketplacewebapi.azurewebsites.net/api/Feature/UpdateFeature/${featureData.featureId}`, featureData)
            .then(resp => {
                console.log('Feature updated successfully', resp.data);
                setShowModal(true); 
            })
            .catch(err => {
                console.error('Error updating feature', err);
            });
    };

    const handleCloseModal = () => {
        setShowModal(false); 
    };

    return (
        <div className="container mt-4">
            <h2 style={{marginLeft:'-7px'}}>Edit Feature</h2>
            <div className="row">
                <div className="col-md-6" style={{ marginLeft: 0, textAlign: "left" }}>
                    <div className="form-group">
                        <label htmlFor="featureId">Feature ID:</label>
                        <input
                            type="text"
                            id="featureId"
                            className="form-control"
                            value={featureData.featureId}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="featureName">Feature Name:</label>
                        <input
                            type="text"
                            id="featureName"
                            className="form-control"
                            value={featureData.featureName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="featureDataType">Feature Data Type:</label>
                        <input
                            type="text"
                            id="featureDataType"
                            className="form-control"
                            value={featureData.featureDataType}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="value">Feature Value:</label>
                        <input
                            type="text"
                            id="value"
                            className="form-control"
                            value={featureData.value}
                            onChange={handleChange}
                        />
                    </div>
                   
                    <div className="text-left mt-4">
                        <button className="btn btn-primary" onClick={handleEditFeature}>Save Changes</button>
                    </div>
                </div>
            </div>

           
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    {/* <Modal.Title>Feature Updated Successfully</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    Your feature has been updated successfully.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditFeature;
