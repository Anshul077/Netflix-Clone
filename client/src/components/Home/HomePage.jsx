import React, { useEffect,useState } from "react";
import "react-multi-carousel/lib/styles.css";
import "../Main.css";
import axios from "axios"
import {Box,styled,Typography} from "@mui/material"
import HomeButtons from "./HomeButtons";
import MovieShowListing from "./MovieShowListing.jsx"
import Navbar from "./Navbar.jsx"
import LoaderSpinner from "../loader/LoaderSpinner";

const StyledBox=styled(Box)`
width:100%;
height:610px;
background:rgba(0, 0, 0, 0) linear-gradient(to right, rgb(0, 0, 0) 10%, rgba(0, 0, 0, 0.98) 20%, rgba(255, 255, 255, 0.15) 85%, rgba(255, 255, 255, 0.08) 100%, rgba(255, 255, 255, 0.03) 100%, rgba(255, 255, 255, 0) 100%) repeat scroll 0% 0%;
position:absolute;
z-index:2;

`
const DetailBox=styled(Box)`
word-wrap:break-word;
width:50%;
position:absolute;
z-index:3;
top:30%;
left:3%;
`
const DescBox=styled(Box)`
word-wrap:break-word;
width:100%;
margin:20px 0px;
`
const MainBox=styled(Box)`
width:100%;
height:610px;
position: static;
margin-top:45px;
`

const BannerImage=styled("img")({
  width:"inherit",
  height:"inherit",
  zIndex:1,
  position:"absolute"
})

const Title=styled(Typography)`
font-size:60px;
font-family: "Rubik", sans-serif;
line-height:60px;

`
const Desc=styled(Typography)`
font-size:20px;
font-family: "Rubik", sans-serif;
`



const HomePage = () => {
const [movieDetail,setMovieDetail]=useState({})



useEffect(() => {
  axios
    .get(
      "https://api.themoviedb.org/3/trending/all/week?api_key=69f8e9780dee4fc0e26aec59a5b32f10"
      )
      .then((res) => {
        const randomIndex = Math.floor(Math.random() * res.data.results.length);
    
        const item = res.data.results[randomIndex];
    
      setMovieDetail(item)
      })
      .catch((error)=>{
        alert("error")
      })
    }, []);
    
  
    return (
    <>
    <Navbar/>
    {Object.keys(movieDetail).length !== 0?(<><MainBox >
      <BannerImage src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`} style={{}} alt="" />
      <StyledBox style={{}}/>
      <DetailBox>
      <Title >{movieDetail.title||movieDetail.name}</Title>
      <DescBox>
      <Desc>{movieDetail.overview}</Desc>
      <HomeButtons media={movieDetail.media_type} id={movieDetail.id}/>
      </DescBox>
    </DetailBox>
    </MainBox>
      <MovieShowListing
        title="Popular Movies"
        category="popular"
        media="movie"
      />
      
      <MovieShowListing
        title="Upcoming Movies"
        category="upcoming"
        media="movie"
      />
      <MovieShowListing title="Top Rated Movies" category="top_rated" media="movie" />
      <MovieShowListing
        title="Popular Tv Shows"
        category="popular"
        media="tv"
      />
      <MovieShowListing
        title="Top Rated Shows"
        category="top_rated"
        media="tv"
      /></>):<LoaderSpinner/>}
    </>
  );
};

export default HomePage;
