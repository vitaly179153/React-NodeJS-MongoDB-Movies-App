import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import Movie from "./components/movie";
import Favorite from "./components/favorite";
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';


function App() {

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [listOfFavorites, setListOfFavorites] = useState([]);
  const [defaultRating, setDefaultRating] = useState(`Choose here`);
  

  //Get movies from search bar
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);


  //Get favorite movies from database
  useEffect(() => {
    Axios.get("http://localhost:3001/getFavorites").then((response) => {
      setListOfFavorites(response.data);
      console.log(response);

    });
  }, []);

  useEffect(() => {
    // this effect will be executed anytime the listOfFavorites data changes
    console.log('listOfFavorites data has changed');
  }, [listOfFavorites]);

  useEffect(() => {
    // This effect will run whenever the defaultRating value changes
    console.log(`defaultRating has changed to ${defaultRating}`);
  }, [defaultRating]);


  return (
    <div>


      <MovieListHeading heading='Movies' />
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className='container-fluid movie-app custom-scrollbar-css'>

        <div className="container-fluid py-2">
          <div className='d-flex flex-row flex-nowrap'>
            {movies.map((movie, index) => <Movie
              poster={movie.Poster}
              title={movie.Title}
              year={movie.Year}
              rating={movie.rating}
              setListOfFavorites={setListOfFavorites}
              listOfFavorites={listOfFavorites}
            />)}
          </div>
        </div>
      </div>


      <MovieListHeading heading='Favorites' />


      <div className='container-fluid movie-app custom-scrollbar-css'>

        <div className="container-fluid py-2">
          <div className='d-flex flex-row flex-nowrap'>
            {listOfFavorites.map((favorite, index) => <Favorite
              poster={favorite.poster}
              title={favorite.title}
              year={favorite.year}
              rating={favorite.rating}
              id={favorite._id}
              setListOfFavorites={setListOfFavorites}
              listOfFavorites={listOfFavorites}
              defaultRating={defaultRating}
              setDefaultRating={setDefaultRating}
            />)}
          </div>
        </div>
      </div>

    </div>
  );
}


export default App;
