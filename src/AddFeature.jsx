import axios from 'axios';
import React, { useState } from 'react';
import AddedFeaturesTable from './AddedFeaturesTable';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function AddFeature(props) {
  const storedUserObject = JSON.parse(sessionStorage.getItem('UserObj'));
  const uname = storedUserObject.name;

  const [features, setFeatures] = useState({
    entityName: '',
    description: '',
    featureName: '',
    featureDataType: '',
    value: '',
    username: '',
  });

  const [addedFeatures, setAddedFeatures] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const url = 'https://featuremarketplacewebapi.azurewebsites.net/api/Feature/AddFeature';

  const [errorMessages, setErrorMessages] = useState({
    entityName: '',
    description: '',
    featureName: '',
    featureDataType: '',
    value: '',
  });

  const setErrorMessage = (field, message) => {
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [field]: message,
    }));
  };

  const handleChange = (evt) => {
    const { id, value } = evt.target;

    setFeatures({
      ...features,
      [id]: value,
      featureDataType: id === 'featureDataType' ? value : features.featureDataType,
      username: id === 'value' ? uname : features.username,
    });

    const validation = validateField(id, value);
    setErrorMessage(id, validation.message);
  };

const validations = {
  entityName: {
    condition: (value) => value !== undefined && value.length >= 3,
    message: 'Entity Name should have at least 3 characters',
  },
  description: {
    condition: (value) => value && value.split(' ').length >= 3,
    message: 'Entity Description should have at least 3 words',
  },
  featureName: {
    condition: (value) => value.length >= 3,
    message: 'Feature Name should have at least 3 characters',
  },
  featureDataType: {
    condition: (value) => value !== '',
    message: 'Please select a Feature Type',
  },
  value: {
    condition: (value) => {
      switch (features.featureDataType) {
        case 'int':
          return /^\d+$/.test(value);
        case 'long':
          return /^\d+$/.test(value);
        case 'float':
          return /^\d+(\.\d+)?$/.test(value);
        case 'string':
          return value.trim() !== '';
        case 'double':
          return /^\d+(\.\d+)?$/.test(value);
        case 'character':
          return /^.$/.test(value); 
        case 'boolean':
          return /^(true|false)$/i.test(value);
        case 'byte':
          return /^[0-255]$/.test(value); 
        case 'bit':
          return /^[01]$/.test(value); 
        default:
          return true;
      }
    },
    message: 'Feature Value is invalid',
  },
};

  const validateField = (field, value) => {
    const validation = validations[field];
    const isValid = validation.condition(value);
    return {
      isValid,
      message: isValid ? '' : validation.message,
    };
  };

  const validateForm = () => {
    let isFormValid = true;

    // eslint-disable-next-line
    for (const [field, validation] of Object.entries(validations)) {
      const { isValid, message } = validateField(field, features[field]);
      if (!isValid) {
        setErrorMessage(field, message);
        isFormValid = false;
      }
    }

    return isFormValid;
  };

  const handleClick = () => {
    if (!validateForm()) {
      return;
    }
    setAddedFeatures([...addedFeatures, { ...features }]);

    setFeatures({
      entityName: features.entityName,
      description: features.description,
      featureName: '',
      featureDataType: '',
      value: '',
      username: uname,
    });
  };

  const handleUpdateAll = async () => {
    if (addedFeatures == null || addedFeatures.length === 0) {
      setShowErrorModal(true);
      return;
    }

    try {
      for (const feature of addedFeatures) {
        await axios.post(url, feature);
      }

      setShowSuccessModal(true);
      setAddedFeatures([]);
    } catch (error) {
      console.error(error);
      setShowErrorModal(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <>
      <div className='h4 m-4 px-3 font-weight-bold'>Add New Feature</div>
      <div className='add-container display row'>
        <div className='col-md-6 px-5'>
          <div className='add-row'>
            <div className='form-group'>
              <label htmlFor='entityName'>Entity Name</label>
              <input
                type='text'
                className={`form-control ${errorMessages.entityName && 'is-invalid'}`}
                id='entityName'
                maxLength='50'
                onChange={handleChange}
                value={features.entityName}
              />
              {errorMessages.entityName && (
                <div className='invalid-feedback'>{errorMessages.entityName}</div>
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Entity Description</label>
              <input
                type='text'
                className={`form-control ${errorMessages.description && 'is-invalid'}`}
                id='description'
                maxLength='200'
                onChange={handleChange}
                value={features.description}
              />
              {errorMessages.description && (
                <div className='invalid-feedback'>{errorMessages.description}</div>
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='featureName'>Feature Name</label>
              <input
                type='text'
                className={`form-control ${errorMessages.featureName && 'is-invalid'}`}
                id='featureName'
                maxLength='50'
                onChange={handleChange}
                value={features.featureName}
              />
              {errorMessages.featureName && (
                <div className='invalid-feedback'>{errorMessages.featureName}</div>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='featureDataType'>Feature Type</label>
              <select
                className={`form-control ${errorMessages.featureDataType && 'is-invalid'}`}
                id='featureDataType'
                onChange={handleChange}
                value={features.featureDataType}
              >
                <option value=''>Select Feature Type</option>
                <option value='int'>int</option>
                <option value='long'>long</option>
                <option value='float'>float</option>
                <option value='string'>string</option>
                <option value='double'>double</option>
                <option value='character'>character</option>
                <option value='boolean'>boolean</option>
                <option value='byte'>byte</option>
                <option value='bit'>bit</option>
              </select>
              {errorMessages.featureDataType && (
                <div className='invalid-feedback'>{errorMessages.featureDataType}</div>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='value'>Feature Value</label>
              <input
                type='text'
                className={`form-control ${errorMessages.value && 'is-invalid'}`}
                id='value'
                maxLength='50'
                onChange={handleChange}
                value={features.value}
              />
              {errorMessages.value && (
                <div className='invalid-feedback'>{errorMessages.value}</div>
              )}
            </div>
            <div className='row mt-4 mb-4 m-2'>
              <button
                style={{ backgroundColor: '#6c757d' }}
                type='button'
                className='btn btn-primary'
                onClick={handleClick}
              >
                Add Feature
              </button>
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <AddedFeaturesTable addedFeatures={addedFeatures} />
          <div className='row mt-4 mb-4 m-2 justify-content-center'>
            <button
              style={{ backgroundColor: '#6c757d', width: '150px' }}
              type='button'
              className='btn btn-success ml-2'
              onClick={handleUpdateAll}
            >
              Update All
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>All features added successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Error updating features. Please add at least one feature.</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleCloseErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
