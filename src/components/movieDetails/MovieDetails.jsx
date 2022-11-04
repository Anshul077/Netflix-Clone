import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ratingMovie from "../ratingMovie.png";
import { styled, Box, Typography, Button } from "@mui/material";
import MovieCast from "./MovieCast";
import MovieGenre from "./MovieGenre";
import MovieVideos from "./MovieVideos";
import Navbar from "../Home/Navbar.jsx";
import { useUserAuth } from "../../context/UserAuthContext";
import { importWishlistData } from "../service/ServiceApi";
import {
  getReviewData
} from "../../redux/action/ReviewAction";
// import LoaderSpinner from "../loader/LoaderSpinner";
import SimilarMovies from "./SimilarMovies";
import MovieReview from "./MovieReview";
import { Add } from "@mui/icons-material";

const MainBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '70px 90px',
  // position: 'static',
  justifyContent: 'center',
  // background:'red',
  [theme.breakpoints.down('sm')]: {
    height: "auto",
    padding: '0 10px',
    position: 'relative',
  }
}))


const MovieBanner = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  opacity: "20%",
  position: "absolute",
  top: "-1%",
  [theme.breakpoints.down('sm')]: {
    height: "100%",
    objectFit: "cover",
  }
}))




const StyledBox1 = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: 'linear-gradient(0deg,#181818 0,hsla(0,0%,9%,.987) 1.62%,hsla(0,0%,9%,.951) 3.1%,hsla(0,0%,9%,.896) 4.5%,hsla(0,0%,9%,.825) 5.8%,hsla(0,0%,9%,.741) 7.06%,hsla(0,0%,9%,.648) 8.24%,hsla(0,0%,9%,.55) 9.42%,hsla(0,0%,9%,.45) 10.58%,hsla(0,0%,9%,.352) 11.76%,hsla(0,0%,9%,.259) 12.94%,hsla(0,0%,9%,.175) 14.2%,hsla(0,0%,9%,.104) 15.5%,hsla(0,0%,9%,.049) 16.9%,hsla(0,0%,9%,.013) 18.38%,hsla(0,0%,9%,0) 20%)',
  position: 'absolute',
  top: '0',
  zIndex: '2',
  [theme.breakpoints.down('sm')]: {
    height: "100%",
    zIndex: '0',
  }
}))

const PosterBox = styled(Box)`
  width: 85%;
  height: auto;
  border-radius: 15px;
  position: relative;
  box-shadow: rgb(0, 0, 0) 0px 5px 15px;
`;
const DetailsBox = styled(Box)(({ theme }) => ({
  width: '70%',
  height: '85%',
  margin: ' 0 20px',
  filter: 'drop-shadow(2px 2px 2px black)',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: 'auto',
    marginTop: '17%'
  }
}))


const MovieTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '50px',
  lineHeight: '55px',
  wordWrap: 'break-word',
  fontFamily: ' "Rubik", sans-serif',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    lineHeight: '20px',
    textAlign: 'center'
  }
}))


const MovieRating = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px',
  fontFamily: '"Rubik", sans-serif',
  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
  }
}))


const MovieDesc = styled(Typography)(({ theme }) => ({
  fontSize: '15px',
  margin: '20px 0 20px 0',
  fontFamily: '"Rubik", sans-serif',
  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
    margin: '10px 0 10px 0',
  }
}))


const MovieCastStyle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px',
  fontFamily: '"Rubik", sans-serif',
  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
    marginTop:'20px'
  }
}))


const Video = styled(Typography)(({ theme }) => ({
  fontSize: '35px',
  lineHeight: '34px',
  fontWeight: '400',
  fontFamily: '"Rubik", sans-serif',
  margin: '50px 0 30px 15px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
    margin: '20px 0 10px 15px',
  }
}))




const PosterImage = styled("img")({
  width: "100%",
  height: "inherit",
  borderRadius: "inherit",
});

const RatingBox = styled(Box)(({ theme }) => ({
  width: '20%',
  margin: '20px 0 10px 0',
  display: 'flex',
  alignItems: 'center',
  // background:'red',
  [theme.breakpoints.down('sm')]: {
    margin: '20px 0 10px 0',
    width: '100%',
  }
}))

const MovName = styled('span')(({ theme }) => ({
  fontSize: 20,
  color: "#a3a3a3",
  [theme.breakpoints.down('sm')]: {
    fontSize: 12,
  }
}))



const MovieBox = styled(Box)(({ theme }) => ({
  width: '30%',
  height: '85%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))


const Wish = styled(Button)({
  margin: '25px 0',
  background: 'rgb(169,169,169,0.5)',
  color:'#ffffff',
  fontFamily: '"Rubik", sans-serif',
  cursor:'pointer',
  "&:hover":{
    background: '#e50914'
    
  }
  
})



const Wishlist2 = styled(Button)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    background: 'rgb(169,169,169,0.5)',
    color: '#ffffff',
    fontFamily: '"Rubik", sans-serif',
    "&:hover": {
      background: " #e50914",
    },
    width: '50%',
    display: 'block',
    margin: 'auto',
  }
}))


const Rating = styled("span")(({ theme }) => ({
  fontSize: 16,
  fontFamily: "inherit",
  [theme.breakpoints.down('sm')]: {
    fontSize: 15,
  }
}))



const RatingImage = styled("img")(({ theme }) => ({
  width: 15,
  margin: '0px 0 0 10px',
  [theme.breakpoints.down('sm')]: {
    width: 10,
    margin: '0px 0 0 5px',
  }
}))



const MovieDetails = () => {
  const { media_type, username, id } = useParams();
  const [movName, setMovName] = useState()
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(true);
  const [wishlistData, setwishlistData] = useState({});
  const { user } = useUserAuth();


  const dispatch = useDispatch();
  const { userReviews } = useSelector((state) => state.Reviews);

  useEffect(() => {
    axios
      .get(
        `
          https://api.themoviedb.org/3/${media_type}/${id}?api_key=69f8e9780dee4fc0e26aec59a5b32f10&append_to_response=videos
          `
      )
      .then(async (res) => {
        setMovieData(res.data);
        dispatch(getReviewData(res.data.name ? res.data.name.replaceAll(' ', '') : res.data.title.replaceAll(' ', '')));
        setwishlistData({
          nameUser: username,
          movieName: res.data.name || res.data.title,
          movieImage: res.data.backdrop_path,
          movieRelease: res.data.release_date || res.data.first_air_date,
          movieRuntime: res.data.runtime || res.data.runtime === 0 ? res.data.runtime : res.data.last_episode_to_air.season_number
        });
        setLoading(false);
      });
  }, [userReviews]);




  const AddData = async () => {
    let response = await importWishlistData(wishlistData);
    if (!response) return;
    else {
      if (response.status === 200) {

        alert("Item added to the wishlist!!");
      }
      if (response.status === 201) {
        alert("Item already in wishlist!!")
      }
    }
  };

  return (
    <>
      <Navbar />
      {loading === true}
      <MainBox>
        <MovieBanner
          src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
          alt=""
        />
        <StyledBox1 style={{}} />
        <MovieBox style={{}}>
          <PosterBox>
            <PosterImage
              src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
              alt=""
            />
          </PosterBox>
          <Wish variant="contained" onClick={AddData}>
            <Add style={{ width: "20px", margin: "0 5px 0 0" }} />
            Wishlist
          </Wish>
        </MovieBox>
        <DetailsBox>
          <MovieTitle>{movieData.name || movieData.title}</MovieTitle>
          <MovieGenre genre={movieData.genres} />
          <Wishlist2 variant="contained" onClick={AddData}>
            <Add style={{ width: "20px", margin: "0 5px 0 0" }} />
            Wishlist
          </Wishlist2>
          <RatingBox>
            <MovieRating>
              Rating<RatingImage src={ratingMovie}></RatingImage>
              <Rating style={{ fontWeight: "lighter" }}>
                {movieData.vote_average ? movieData.vote_average.toFixed(1) : ""}
              </Rating>
            </MovieRating>
          </RatingBox>
          <MovieDesc>{movieData.overview}</MovieDesc>
          <MovieCastStyle>Casts</MovieCastStyle>
          <MovieCast media={media_type} id={id} />
        </DetailsBox>
      </MainBox>
      <>
        <Video>
          Videos |{" "}
          <MovName style={{}}>
            {movieData.name || movieData.title}
          </MovName>
        </Video>
        <MovieVideos media={media_type} id={id} />
      </>
      <MovieReview user={username} name={movieData ? movieData.name || movieData.title : ""} userReviews={userReviews} />
      <SimilarMovies type={media_type} id={id} name={movieData ? movieData.name || movieData.title : ""} />
    </>
  );
};

export default MovieDetails;
