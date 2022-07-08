import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ratingMovie from "../ratingMovie.png";
import { styled, Box, Typography, Button } from "@mui/material";
import MovieCast from "./MovieCast";
import MovieGenre from "./MovieGenre";
import MovieVideos from "./MovieVideos";
import Navbar from "../Home/Navbar.jsx";
import { AddToWishlist } from "../../redux/action/WishlistAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { importWishlistData } from "../service/ServiceApi";
import LoaderSpinner from "../loader/LoaderSpinner";

const MainBox = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 70px 90px;
  position: static;
  justify-content: center;
  margin-top: 45px;
`;
const MovieBanner = styled("img")({
  width: "100%",
  height: "100%",
  opacity: "20%",
  position: "absolute",
});

const PosterBox = styled(Box)`
  width: 85%;
  height: auto;
  border-radius: 15px;
  position: relative;
  box-shadow: rgb(0, 0, 0) 0px 5px 15px;
`;
const DetailsBox = styled(Box)`
  width: 70%;
  height: 85%;
  margin: 0 20px;
  filter: drop-shadow(2px 2px 2px black);
  // background:gray;
`;
const MovieTitle = styled(Typography)`
  font-weight: bold;
  font-size: 50px;
  line-height: 55px;
  word-wrap: break-word;
  font-family: "Rubik", sans-serif;
`;
const MovieRating = styled(Typography)`
  font-weight: bold;
  font-size: 20px;
  font-family: "Rubik", sans-serif;
`;
const MovieDesc = styled(Typography)`
  font-size: 15px;
  margin: 20px 0 20px 0;
  font-family: "Rubik", sans-serif;
`;
const MovieCastStyle = styled(Typography)`
  font-weight: bold;
  font-size: 20px;
  font-family: "Rubik", sans-serif;
`;
const Video = styled(Typography)`
  font-size: 35px;
  line-height: 34px;
  font-weight: 400;
  font-family: "Rubik", sans-serif;
  margin: 50px 0 30px 15px;
`;

const PosterImage = styled("img")({
  width: "100%",
  height: "inherit",
  borderRadius: "inherit",
});

const RatingBox = styled(Box)`
  width: 20%;
  height: auto;
  margin: 20px 0 10px 0;
  display: flex;
  align-items: center;
`;

const MovieBox = styled(Box)`
  width: 30%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wishlist = styled(Button)`
  margin: 15px 0;
  background: #fff;
  color: #000;
  font-family: "Rubik", sans-serif;
`;

const Rating = styled("span")({
  fontSize: 16,
  fontFamily: "inherit",
});

const RatingImage = styled("img")({
  width: 15,
  margin: "0px 0 0 10px",
});

const MovieDetails = () => {
  const { id } = useParams();
  const { media_type } = useParams();
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(true);
  const [wishlistData, setwishlistData] = useState({});
  const { user } = useUserAuth();

  useEffect(() => {
    axios
      .get(
        `
          http://api.themoviedb.org/3/${media_type}/${id}?api_key=69f8e9780dee4fc0e26aec59a5b32f10&append_to_response=videos
          `
      )
      .then(async (res) => {
        setMovieData(res.data);
        setwishlistData({
          email: user.email,
          movieName: res.data.name || res.data.title,
          movieImage: res.data.backdrop_path,
          movieRelease: res.data.release_date || res.data.first_air_date,
          movieRuntime:res.data.runtime || res.data.runtime===0?res.data.runtime:res.data.last_episode_to_air.season_number
        });
        setLoading(false);
      });
  }, []);

  const AddData = async () => {
    let response = await importWishlistData(wishlistData);
    if (!response) return;
    alert("Item added to the wishlist!!");
  };

  return (
    <>
      <Navbar />
      {loading === true && <LoaderSpinner />}
      <MainBox>
        <MovieBanner
          src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
          alt=""
        />

        <MovieBox style={{}}>
          <PosterBox>
            <PosterImage
              src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
              alt=""
            />
          </PosterBox>
          <Wishlist variant="contained" onClick={AddData}>
            Add to wishlist
          </Wishlist>
        </MovieBox>
        <DetailsBox>
          <MovieTitle>{movieData.name || movieData.title}</MovieTitle>
          <MovieGenre genre={movieData.genres} />
          <RatingBox>
            <MovieRating>
              Rating<RatingImage src={ratingMovie}></RatingImage>
              <Rating style={{ fontWeight: "lighter" }}>
                {movieData.vote_average}
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
          <span style={{ fontSize: 20, color: "#a3a3a3" }}>
            {movieData.name || movieData.title}
          </span>
        </Video>
        <MovieVideos media={media_type} id={id} />
      </>
    </>
  );
};

export default MovieDetails;
