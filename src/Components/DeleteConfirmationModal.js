// DeleteConfirmationModal.js
import React from 'react';
import '../Styles/DeleteConfirmationModal.css'

const DeleteConfirmationModal = ({ show, onCancel, onConfirm }) => {
    if (!show) {
      return null;
    }
  
    return (
      <div className="delete-modal-overlay">
        <div className="delete-modal-box">
          <p>Are you sure you want to delete this entity?</p>
          <div className="button-container">
            <button className="cancel-button" onClick={onCancel}>Cancel</button>
            <button className="confirm-button" onClick={onConfirm}>Confirm Delete</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteConfirmationModal;
