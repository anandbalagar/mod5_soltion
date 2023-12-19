import React, { useState, useEffect } from 'react';
import "./EditEntity";
import { useNavigate } from 'react-router-dom';

const MyEntities = () => {
  const [entities, setEntities] = useState(new Set());
  const [cards, setCards] = useState([]);

  const storedUserObject = JSON.parse(sessionStorage.getItem('UserObj'));
  const username = storedUserObject.name;
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const entitiesPerPage = 9;
  

  useEffect(() => {
    // Fetch entities by user name
    fetch(`https://featuremarketplacewebapi.azurewebsites.net/api/Entity/GetEntitiesByUserName/${username}`)
      .then(response => response.json())
      .then(data => setEntities(new Set(data)))
      .catch(error => console.error('Error fetching entities:', error));
  }, [username]);


  useEffect(() => {
    // Fetch entity details for each entity
    const fetchEntityDetails = async () => {
      const entityCards = await Promise.all(
        [...entities].map(async (entityName) => {
          const response = await fetch(`https://featuremarketplacewebapi.azurewebsites.net/api/Entity/GetEntityByEntityName/${entityName}`);
          const data = await response.json();
          return data;
        })
      );
      setCards(entityCards);
    };

    if (entities.size > 0) {
      fetchEntityDetails();
    }
  }, [entities]);

  // Get current entities based on pagination
  const indexOfLastEntity = currentPage * entitiesPerPage;
  const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;
  const currentEntities = cards.slice(indexOfFirstEntity, indexOfLastEntity);
  

  const handleExplore = (entityName) => {
    // window.location.href = `/featurehome/EditEntity/${entityName}`;
    navigate(`/featurehome/EditEntity/${encodeURIComponent(entityName)}`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  const totalPages = Math.ceil(cards.length / entitiesPerPage);
  const visiblePages = Math.min(3, totalPages);

  return (
    <div>
    <section>
      <div className="entity-container">
        <h1>My Entities</h1>
          <div>
            <div className="entitycards">
              {currentEntities.map((card, i) => (
                <div key={i} className="entitycard">
                  <h3>{card.entityName}</h3>
                  <p>{card.description}</p>
                  <button className="exbtn" onClick={() => handleExplore(card.entityName)}>
                    Explore
                  </button>
                </div>
              ))}
            </div>
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
        
      </div>
    </section>
  </div>
  );
};

export default MyEntities;
