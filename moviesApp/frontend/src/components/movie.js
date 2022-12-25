import "./movie.css";
import React, { useState } from 'react';
import Axios from "axios";



const Movie = ( {poster, title, year, rating, setListOfFavorites, listOfFavorites } ) => {

  const [favoriteButtom, setFavoriteButton] = useState(`Add to Favorites`);


// Add movie to favorites
const createFavorite = () => {
  // Check if movie is already in the list
  const movieExists = listOfFavorites.find(favorite => favorite.title === title);
  if (movieExists) {
    // Display message indicating that movie is already in the list
    alert(`${title} is already in the list of favorites!`);
    return;
  }
  setFavoriteButton("Added to Favorites");
  fetch("http://localhost:3001/createFavorite", {
    method: "POST",
    body: JSON.stringify({
      poster,
      title,
      year,
      rating,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // update the list of favorites in the parent component
      setListOfFavorites([
        ...listOfFavorites,
        {
          title,
          poster,
          year,
          rating,
        },
      ]);

      // fetch the updated list of favorite movies from the database
      Axios.get("http://localhost:3001/getFavorites").then((response) => {
        setListOfFavorites(response.data);
      });
    });
};
  
  return (
      <div className="card">
          <img  src={poster} alt="Poster" className='card-img-top' />
          <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{year}</p>
          </div>
          <button onClick={createFavorite}>{favoriteButtom}</button>
      </div>
  );
};


export default Movie;
