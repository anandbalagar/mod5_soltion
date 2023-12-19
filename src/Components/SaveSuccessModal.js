// SaveSuccessModal.js
import React from 'react';

const SaveSuccessModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="save-success-modal-overlay">
      <div className="save-success-modal-box">
        <p>Saved successfully!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SaveSuccessModal;
