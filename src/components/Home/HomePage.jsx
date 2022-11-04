import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import "../Main.css";
import axios from "axios"
import { Box, styled, Typography } from "@mui/material"
import HomeButtons from "./HomeButtons";
import MovieShowListing from "./MovieShowListing.jsx"
import Navbar from "./Navbar.jsx"
// import LoaderSpinner from "../loader/LoaderSpinner";

const StyledBox1 = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0) linear-gradient(to right, rgb(0, 0, 0) 10%, rgba(0, 0, 0, 0.98) 20%, rgba(255, 255, 255, 0.15) 85%, rgba(255, 255, 255, 0.08) 100%, rgba(255, 255, 255, 0.03) 100%, rgba(255, 255, 255, 0) 100%) repeat scroll 0% 0%',
  position: 'absolute',
  top: '0',
  zIndex: '2',
  [theme.breakpoints.down('sm')]: {
    height: "0vh",
  }
}))

const StyledBox2 = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: 'linear-gradient(0deg,#181818 0,hsla(0,0%,9%,.987) 1.62%,hsla(0,0%,9%,.951) 3.1%,hsla(0,0%,9%,.896) 4.5%,hsla(0,0%,9%,.825) 5.8%,hsla(0,0%,9%,.741) 7.06%,hsla(0,0%,9%,.648) 8.24%,hsla(0,0%,9%,.55) 9.42%,hsla(0,0%,9%,.45) 10.58%,hsla(0,0%,9%,.352) 11.76%,hsla(0,0%,9%,.259) 12.94%,hsla(0,0%,9%,.175) 14.2%,hsla(0,0%,9%,.104) 15.5%,hsla(0,0%,9%,.049) 16.9%,hsla(0,0%,9%,.013) 18.38%,hsla(0,0%,9%,0) 20%)',
  position: 'absolute',
  top: '0',
  zIndex: '2',
  [theme.breakpoints.down('sm')]: {
    height: "25vh",
  }
}))



const DetailBox = styled(Box)(({ theme }) => ({
  wordWrap: 'break-word',
  width: '50%',
  position: 'absolute',
  zIndex: '3',
  top: '25%',
  left: '3%',
  [theme.breakpoints.down('sm')]: {
    margin: '15px 0 0 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '95%',
    position: 'relative',
    top: '55%',
    height: "100%",
  }
}))


const DescBox = styled(Box)(({ theme }) => ({
  wordWrap: 'break-word',
  width: '100%',
  margin: '20px 0px',
  [theme.breakpoints.down('sm')]: {
    height: "100%",
    padding: '5px',
    margin: '5px 0px 0 0 ',
  }
}))


const MainBox = styled(Box)`
width:100%;
height:100%;
margin-bottom:45px;
`

const BannerImage = styled("img")(({ theme }) => ({
  width: "inherit",
  height: "100vh",
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    width: "inherit",
    height: "25vh",
  }
}))

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '60px',
  fontFamily: '"Rubik", sans-serif',
  lineHeight: '60px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '30px',
    textAlign: 'center',
    lineHeight: '30px'
  }
}))


const Desc = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontFamily: '"Rubik", sans-serif',
  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
  }
}))





const HomePage = () => {
  const [movieDetail, setMovieDetail] = useState({})



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
      .catch((error) => {
        alert("error")
      })
  }, []);


  return (
    <>
      <Navbar />
      {Object.keys(movieDetail).length !== 0 ? (<><MainBox >
        <BannerImage src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`} style={{}} alt="" />
        <StyledBox1 style={{}} />
        <StyledBox2 style={{}} />
        <DetailBox>
          <Title >{movieDetail.title || movieDetail.name}</Title>
          <DescBox>
            <Desc>{movieDetail.overview}</Desc>
            <HomeButtons media={movieDetail.media_type} id={movieDetail.id} />
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
        />
      </>) :""}
    </>
  );
};

export default HomePage;
