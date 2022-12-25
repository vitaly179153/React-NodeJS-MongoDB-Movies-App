import "./favorite.css";
import Axios from "axios";
import { useState } from "react"



const Favorite = ({ poster, title, year, id, rating, setListOfFavorites, }) => {

    
    const [userRating, setUserRating] = useState(rating);

    const deleteFavorite = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
          // Remove the deleted item from the listOfFavorites state
          setListOfFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite._id !== id));
        });
      };

      const rateMovie = event => {
        setUserRating(event.target.value);
        updateRating(title, event.target.value);
      };
    
      const updateRating = (title, rating) => {
        fetch("http://localhost:3001/updateRating", {
          method: "POST",
          body: JSON.stringify({
            title: title,
            rating: rating,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // do something with the response data if needed
          });
      };



  
  return (
      <div className="card">
          <img  src={poster} alt="Poster" className='card-img-top' />
          <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{year}</p>
          </div>
          <div className="card-body">
              <label for="rating">Your Rating: </label>
              <select id="rating" value={userRating} onChange={rateMovie}>
                <option hidden></option>
                <option>Bad</option>
                <option>Alright</option>
                <option>Good</option>
                <option>Very Good</option>
              </select>
          </div>
          <button onClick={() => {deleteFavorite(id)}}>Remove from Favorites</button>
      </div>
  );
};


export default Favorite;