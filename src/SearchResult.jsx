import React, { useState, useEffect } from 'react';
import './Styles/SearchResult.css'; 
import { Link } from 'react-router-dom';
import heartEmpty from './Images/Heart_icon_red_hollow.svg.png'; 
import heartFilled from './Images/A_perfect_SVG_heart.svg.png';

export default function SearchResult(props) {
    var results = [];

    for (var key in props) {
        results.push([key, props[key]]);
    }

    console.log(results);

    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

    useEffect(() => {
        // Update favorites state whenever local storage changes
        setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);
    }, []);
    

    let mappedResult = results.map((temp, index) => {
        const isFavorite = favorites.some(favorite => favorite.entityName === temp[1].entityName);

        return (
            <>
                <div className="result-card" key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{temp[1].entityName}</h5>
                        <p className="card-text">{temp[1].description}</p>
                        <button className="custom-btn" onClick={() => toggleFavorites(temp[1])}>
                            <img
                                src={isFavorite ? heartFilled : heartEmpty}
                                alt="Heart Icon"
                                className={`heart-icon ${isFavorite ? 'red' : ''}`}
                            />
                        </button>
                     
                        <Link to={`/featurehome/ViewEntity/${temp[1].entityName}`} className="explore-btn">

                                        Explore
                        </Link>
                    </div>
                </div>
            </>
        );
    });

    const toggleFavorites = (item) => {
        const isFavorite = favorites.some(favorite => favorite.entityName === item.entityName);

        if (isFavorite) {
            // Remove the item from favorites
            const updatedFavorites = favorites.filter(favorite => favorite.entityName !== item.entityName);
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            console.log('Removed from favorites:', updatedFavorites);
        } else {
            // Add the item to favorites
            const updatedFavorites = [...favorites, item];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            console.log('Added to favorites:', updatedFavorites);
        }
    };


    return (
        <>
            <br></br>
            <div>
                {mappedResult}
            </div>
        
        </>
    );
}
