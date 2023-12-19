import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../ViewEntity";
import "../Styles/EntityGridStyles.css";

function EntityGrid() {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entitiesPerPage = 9;
  

  useEffect(() => {
    axios.get("https://featuremarketplacewebapi.azurewebsites.net/api/Entity/getallentities")
      .then((resp) => {
        // Assuming the API response contains an array of entities
        setCards(resp.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []); 

  // Get current entities based on pagination
  const indexOfLastEntity = currentPage * entitiesPerPage;
  const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;
  const currentEntities = cards.slice(indexOfFirstEntity, indexOfLastEntity);
  const navigate = useNavigate();

  const handleExplore = (entityName) => {
    // Use window.location.href to navigate in the current tab
    // window.location.href = `/featurehome/ViewEntity/${entityName}`;
     navigate(`/featurehome/ViewEntity/${encodeURIComponent(entityName)}`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  const totalPages = Math.ceil(cards.length / entitiesPerPage);
  const visiblePages = Math.min(3, totalPages);

  return (
    <div>
      <section>
        <div className="entity-container">
          <h1>Popular Entities</h1>
            <div className="entitycards">
              {currentEntities.map((card, i) => (
                  <div key={i} className="entitycard">
                    <h3>{card.entityName}</h3>
                    <p>{card.description}</p>
                    <button className="exbtn" onClick={() => handleExplore(card.entityName)}>
                      Explore
                    </button>
                  </div>
                ))
              }
            </div>
          {/* Pagination */}
          <ul className="pagination">
            {/* Previous button */}
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                Previous
              </button>
            </li>

            {/* Page buttons */}
            {Array.from({ length: visiblePages }, (_, index) => (
              <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}

            {/* Next button */}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default EntityGrid;
