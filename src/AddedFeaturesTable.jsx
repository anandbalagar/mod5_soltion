import React from 'react';
 
function AddedFeaturesTable({ addedFeatures }) {
  return (
    <div >
      <h4>Recently Added Features</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Entity Name</th>
            <th>Feature Name</th>
            <th>Feature Value</th>
          </tr>
        </thead>
        <tbody>
          {addedFeatures.map(feature => (
            <tr key={feature.id}>
              <td>{feature.entityName}</td>
              <td>{feature.featureName}</td>
              <td>{feature.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default AddedFeaturesTable;