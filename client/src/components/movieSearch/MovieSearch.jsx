import React, {useState } from "react";
import MovieDisplay from "./MovieDisplay";
import axios from "axios";
import "../Main.css";
import movielogo from '../movielogo.png'
import search from '../search.png'
import Navbar from "../Home/Navbar.jsx"

function MovieSearch() {
  const [movie, setMovie] = useState();
  const [movieName, setName] = useState(null);
  
  function handleOnChange(e) {
    setName(e.target.value);
  }
  function searchMovie() {
    if (movieName !== "" && movieName !== null) {
      axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=69f8e9780dee4fc0e26aec59a5b32f10&query=${movieName}&page=1&include_adult=true`
        )
        .then((res) => {
          res.data.total_pages!==0?
          setMovie(res.data):alert("Invalid movie name!")
        })
      }
      else {
      alert("Enter movie name");
    }
  }

 
  return (
    <div>
      <Navbar/>
      <div className="cont">
        <div className="Search-Cont">
          <h4 className="headTitle">Search For Any MOVIE or TV Show</h4>
          <div className="search">
            <input type="text" onChange={handleOnChange} />
            <button className="search-btn" onClick={searchMovie}><img className="search-img" src={search} alt="" /></button>
          </div>
        </div>
      </div>

      <div className="display-container">
        {movie
          ? movie.results.map((element) => {
              return (
                <>
                <MovieDisplay data={element} mov={movie.results}
                />
                </>
              );
            })
          : <img src={movielogo} alt="" className="mov-logo"/> }
      </div>
      {/* <h2><img src={movielogo} alt="" className="movi-logo" id="movi-logo"/></h2> */}

    </div>
  );
}

export default MovieSearch;
