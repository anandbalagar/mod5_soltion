import React, { useState, useEffect } from "react";
import axios from "axios";
import SignalRService from "./SignalRService";
// eslint-disable-next-line
import { Link } from "react-router-dom";
import "./Styles/CSVFileUploader.css";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button } from "react-bootstrap";
import img from "./Images/sample2.PNG";
 
const CsvUploader = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadedData, setUploadedData] = useState([]);
  // eslint-disable-next-line
  const [selectedEntity, setSelectedEntity] = useState(null);
  // eslint-disable-next-line
  const [batchId, setBatchId] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileNames, setFileNames] = useState([]);
 
 // const UserName = "testuser";
 const storedUserObject = JSON.parse(sessionStorage.getItem('UserObj'));
  const username = storedUserObject.name;
 
  const url = "https://csvbatchprocessing20231215182142.azurewebsites.net/CSV/upload";
 
  useEffect(() => {
    SignalRService.connection.on("ReceiveProgress", (receivedProgress) => {
      setProgress(parseInt(receivedProgress));
    });
    return () => {
      SignalRService.connection.off("ReceiveProgress");
    };
  }, []);
 
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
 
    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
 
      if (fileSizeInMB > 10) {
        setErrorMessage(
          `File size exceeds 10MB. Please select a file less than 10MB.`
        );
        event.target.value = null;
      } else {
        setFile([...(file || []), selectedFile]);
      }
    }
    setFile([...(file || []), ...event.target.files]);
  };
 
  const handleRemoveFile = (index) => {
    const updatedFiles = [...file];
    updatedFiles.splice(index, 1);
    setFile(updatedFiles);
   
    document.getElementById("fileInput").value = "";
  };
 
  const [showModalData, setShowModalData] = useState({
    batchId: null,
    content: null,
  });
 
  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const timestamp = new Date();
 
 
      for (let i = 0; i < file.length; i++) {
        const formData = new FormData();
        formData.append("files", file[i]);
 
        await new Promise((resolve) => setTimeout(resolve, 1000));
 
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            UserName: username,
          },
        });
        setProgress(100);
 
        console.log(`File ${i + 1} uploaded successfully:`, response.data);
 
        const newBatchId = batchId + i;
 
        setUploadedData((prevData) => [
          ...prevData,
          {
            batchId: newBatchId,
            timestamp,
            content: response.data
              .map(
                (entity) =>
                  `${entity.entityName} - ${entity.description}- ${entity.featureName}- ${entity.featureDataType}- ${entity.value}`
              )
              .join("\n"),
          },
        ]);
        setFileNames((prevNames) => [...prevNames, file[i].name]);
 
      }
      setTimeout(() => {
        setProgress(0);
      }, 1000);
      setErrorMessage(null);
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading files:", error);
      setErrorMessage("Missing data or error during upload");
      setIsUploading(false);
    }
  };
 
  const handleViewClick = (entity) => {
    setSelectedEntity(entity);
    setShowModal(true);
    setShowModalData(entity || { batchId: null, content: null });
    setFile(null);
 
    console.log("Raw Content:", entity.content);
  };
 
  const handleCloseModal = () => {
    setShowModal(false);
  };
 
  return (
    <>
      
      <div class="main" className="container">
      <br/>
      <br />
        <div className="upload-section">
          <div className="grids">
            <h1>
              Upload your CSV files
              <img src={img} alt="My" style={{ marginLeft: '241px',marginBottom:'13px',border: '1px solid black', Align: 'right', width:"40%",height:"35%" }}/>
              
            </h1>
            <div className="grid-group">
              <div className="file-upload-container">
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  accept=".csv"
                  disabled={isUploading}
                  multiple
                />
                <br />
 
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: "30%",
                      backgroundColor: "#e0e0e0",
                      borderRadius: "5px",
                      alignContent: "center",
                    }}
                  >
                    <div
                      style={{
                        alignItems: "end",
                        width: `${progress}%`,
                        height: "20px",
                        backgroundColor: "orange",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <p style={{ marginLeft: "10px", fontSize: "17px" }}>
                    {progress}%
                  </p>
                </div>
              </div>
            </div>
            {file && file.length > 0 && (
              <div style={{ marginTop: "10px" }}>
                <h5 style={{ marginBottom: "5px" }}>Selected Files:</h5>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {file.map((selectedFile, index) => (
                    <div
                      key={index}
                      style={{ marginRight: "10px", marginBottom: "5px" }}
                    >
                      {selectedFile.name}
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveFile(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <br />
          <button className="upload-button" onClick={handleUpload}>
            Upload
          </button>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
 
        <div>
          <br />
          <center>
            <h4>STATISTICS</h4>
            <table
              className="table table-bordered table-hover m-3 variant=dark"
              style={{ maxWidth: "800px" }}
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Batch Id</th>
                  <th style={{ textAlign: "center" }}>File Name</th>
                  <th style={{ textAlign: "center" }}>Time</th>
                  <th style={{ textAlign: "center" }}>View</th>
                </tr>
              </thead>
              <tbody>
                {uploadedData.map((data, index) => (
                  <tr key={index + 1}>
                    <td style={{ textAlign: "center" }}>{data.batchId}</td>
                    <td style={{ textAlign: "center" }}>{fileNames[index]}</td>
                    <td style={{ textAlign: "center" }}>
                      {data.timestamp ? data.timestamp.toLocaleString() : "N/A"}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        className="btn btn-primary"
                        style={{
                          backgroundColor: "transparent",
                          border: "2px solid orange",
                          color: "orange",
                        }}
                        onClick={() => handleViewClick(data)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </center>
        </div>
 
        <Modal show={showModal} onHide={handleCloseModal} size="xl" centered>
          <Modal.Header closeButton>
            <Modal.Title>Data Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontWeight: "bold", fontSize: "1.2em" }}>
              Batch ID: {showModalData.batchId}
            </p>
            {showModalData.content && (
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                 
                      <th>Entity Name</th>
                      <th>Description</th>
                      <th>Feature Name</th>
                      <th>Feature Data Type</th>
                      <th>Feature Value</th>
                    </tr>
                  </thead>
                  <tbody>
                   
                    {showModalData.content.split("\n").map((row, index) => (
                      <tr key={index}>
                        {row.split("-").map((column, colIndex) => (
                          <td key={colIndex}>{column.trim()}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
 
export default CsvUploader;