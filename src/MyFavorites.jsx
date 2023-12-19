import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function MyFavorites() {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

    // Function to handle removing a favorite
    const removeFavorite = (index) => {
        const updatedFavorites = [...favorites];
        updatedFavorites.splice(index, 1);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    useEffect(() => {
        // Update favorites state whenever local storage changes
        setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);
    }, []);

    return (
        <>
        
        <div className="container mt-5">
            <h2 className="text-center mb-4">My Favorites</h2>
            {favorites.length > 0 ? (
                <ul className="list-group">
                    {favorites.map((favorite, index) => (
                        <li key={index} className="list-group-item my-favorite-item">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0">{favorite.entityName}</h5>
                                    <p className="text-muted mb-0">{favorite.description}</p>
                                </div>
                                <div className="d-flex">
                                    <Link to={`/featurehome/viewentity/${favorite.entityName}`} className="btn btn-primary btn-sm me-2">
                                        Explore
                                    </Link>
                                    <button className="btn btn-danger btn-sm" onClick={() => removeFavorite(index)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">No favorites added yet.</p>
            )}
        </div>
        <br/>
        <br/>
        <br/>
        </>
    );
}
