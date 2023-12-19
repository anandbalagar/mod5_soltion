import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Styles/FeatureHome.css';
import './Styles/ViewEntity.css';
import React, { useState, useEffect } from 'react';

export default function ViewEntity(props) {
  const { id } = useParams(); 

  const [entityDetails, setEntityDetails] = useState({});
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    // Fetch entity details
    axios.get(`https://featuremarketplacewebapi.azurewebsites.net/api/Entity/GetEntityByEntityName/${id}`)
      .then(resp => {
        setEntityDetails(resp.data);
        console.log(resp.data);
      })
      .catch(err => {
        console.error('API Error:', err);
      });

    // Fetch features based on the entity name
    axios.get(`https://featuremarketplacewebapi.azurewebsites.net/api/Feature/GetFeaturesByEntityName/${id}`)
      .then(resp => {
        setFeatures(resp.data);
        console.log(resp.data);
      })
      .catch(err => {
        console.error('API Error:', err);
      });

    return () => {
      
    };
  }, [id]);

  let maptitle = (
    <div>
      <h2>{entityDetails.entityName}</h2>
      <p style={{marginLeft:'15px'}}>{entityDetails.description}</p>
    </div>
  );

  let maprows = features.map(p => (
    <tr key={p.featureName}>
      <td className="text-nowrap text-center ">{p.featureName}</td>
      <td className="text-nowrap text-center ">{p.value}</td>
      <td className="text-nowrap text-center ">{p.featureDataType}</td>
      <td className="text-nowrap text-center ">{p.createdAt}</td>
    </tr>
  ));

  return (
    <>
      <div className='.container view-entity'>
        <br/>
        {maptitle}
      
     <br></br>
      
      <h4>Features listed in this Entity.</h4>
      
      
      <div className="landing-page">
      
        <div className="table-container">
        <div className='table-responsive'>
        <table className='table table-striped table-bordered table-hover' style={{ border: "1px solid black" }}>
          <thead>
            <tr>
              <th className="text-nowrap text-center ">Feature Name</th>
              <th className="text-nowrap text-center ">Feature Value</th>
              <th className="text-nowrap text-center ">Feature Type</th>
              <th className="text-nowrap text-center ">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {maprows}
          </tbody>
        </table>
      </div>
          
        </div>
      </div>
      </div>
    </>
  );
}
