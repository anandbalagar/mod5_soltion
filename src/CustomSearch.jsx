import React, { useState, useEffect } from 'react';
import './Styles/CustomSearchStyles.css';
 
const CustomSearch = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
 
  useEffect(() => {
    
    const storedRecentSearches = localStorage.getItem('recentSearches');
    if (storedRecentSearches) {
      setRecentSearches(JSON.parse(storedRecentSearches));
    }
  }, []);
 
  const handleSearch = async () => {
    try {  
     
      const apiUrl = `https://featuremarketplacewebapi.azurewebsites.net/api/Feature/GetFilteredPersons/${selectedValue}/${searchQuery}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
 
      // Update the state with the fetched search results
      setSearchResults(data);
 
      
      const updatedRecentSearches = [
        { selectedValue, searchQuery },
        ...recentSearches.slice(0, 4) 
      ];
      setRecentSearches(updatedRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
 
  const handleRecentSearchClick = (search) => {
    setSelectedValue(search.selectedValue);
    setSearchQuery(search.searchQuery);
    handleSearch();
  };
 
  const renderTableHeader = () => {
    if (searchResults.length === 0) return null;
 
    const headers = Object.keys(searchResults[0]);
    return (
      <tr>
        {headers.map(
          (header) =>
            // Exclude specific fields from the table header
            !["approvalStatus", "adminComments", "userName"].includes(header) && (
              <th key={header}>{header}</th>
            )
        )}
      </tr>
    );
  };
 
  const renderTableRows = () => {
    return searchResults.map((result, index) => (
      <tr key={index}>
        {Object.entries(result).map(
          ([key, value]) =>
            // Exclude specific fields from the table rows
            !["approvalStatus", "adminComments", "userName"].includes(key) && (
              <td key={key}>{value}</td>
            )
        )}
      </tr>
    ));
  };
 
  return (
    <div className="search-bar-parent-container">
      <div className="search-bar-container">
        <select
          className="select-box"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <option value="">Select Option</option>
          <option value="EntityName">Entity</option>
          <option value="FeatureName">Feature</option>
          <option value="FeatureId">FeatureID</option>
          <option value="FeatureDataType">DataType</option>
        </select>
 
        <input
          className="search-input"
          type="text"
          placeholder="Enter search query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
 
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
 
      <div className="recent-searches-container">
        <h4>Recent Searches</h4>
        <ul>
          {recentSearches.map((search, index) => (
            <li key={index} onClick={() => handleRecentSearchClick(search)}>
              {search.selectedValue}: {search.searchQuery}
            </li>
          ))}
        </ul>
      </div>
 
      <div className="search-results-container" style={{paddingBottom:"80px"}}>
        {searchResults.length > 0 && (
          <table className="search-results-table">
            <thead>{renderTableHeader()}</thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        )}
      </div>
    </div>
  );
};
 
export default CustomSearch;
 