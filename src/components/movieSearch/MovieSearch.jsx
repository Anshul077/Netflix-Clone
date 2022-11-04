import React, { useState } from "react";
import MovieDisplay from "./MovieDisplay";
import axios from "axios";
import { styled, Typography, Box, TextField, Button } from "@mui/material";
import "../Main.css";
import movielogo from '../movielogo.png'
import search from '../search.png'
import Navbar from "../Home/Navbar.jsx"

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: '25px',
  fontFamily: '"Rubik", sans-serif',
  marginTop: '20px',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
  }
}))


const SearchButton = styled(Button)(({ theme }) => ({
  height: '33px',
  minWidth: '15px',
  borderRadius:0,
  background: '#ffffff',
  marginLeft:5,
  '&:hover': {
    backgroundColor:'#ffffff'
  },
  [theme.breakpoints.down('sm')]: {
    height: '33px',
    minWidth: '25px',
   
  }
}))

const SearchImg = styled("img")(({ theme }) => ({
  height: '5vh',
  width: '2.8vw',
  [theme.breakpoints.down('sm')]: {
    height:'3.8vh',
    width: '3.8vw',

  }
}));

const MBox = styled(Box)(({ theme }) => ({
  width:' 95vw',
  display: 'grid',
  gridTemplateColumns: 'repeat(4,20rem)',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2,10rem)',
  }
}))




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
          res.data.total_pages !== 0 ?
            setMovie(res.data) : alert("Invalid movie name!")
        })
    }
    else {
      alert("Enter movie name");
    }
  }


  return (
    <div>
      <Navbar />
      <div className="cont">
        <div className="Search-Cont">
          <Heading className="headTitle">Search For Any MOVIE or TV Show</Heading>
          <div className="search">
            <input type="text" onChange={handleOnChange} />
            <SearchButton onClick={searchMovie}><SearchImg src={search} alt="" /></SearchButton>
          </div>
        </div>
      </div>

      <MBox>
        {movie
          ? movie.results.map((element) => {
            return (
              <>
                <MovieDisplay data={element} mov={movie.results}
                />
              </>
            );
          })
          : <img src={movielogo} alt="" className="mov-logo" />}
      </MBox>

    </div>
  );
}

export default MovieSearch;
