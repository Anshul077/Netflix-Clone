import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled, Typography, Box } from "@mui/material";

const VideoFrame = styled("iframe")(({ theme }) => ({
  width: 520,
  height: "400px",
  [theme.breakpoints.down('sm')]: {
    width: 320,
  height: "200px",
  }
}))
  

const VideoBox = styled(Box)`
  display: flex;
  width: 100%;
  height: auto;
`;
const Detail = styled(Box)`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const VideoName = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontFamily: '"Rubik", sans-serif',
  margin:' 10px 0',
  [theme.breakpoints.down('sm')]: {
    margin:' 10px 0 20px 0',
  }
}))
  


const MovieVideos = ({ media, id }) => {
  const [movieVideo, setMovieVideo] = useState({});
  useEffect(() => {
    axios
      .get(
        `
             https://api.themoviedb.org/3/${media}/${id}/videos?api_key=69f8e9780dee4fc0e26aec59a5b32f10
             `
      )
      .then((res) => {
        setMovieVideo(res.data);
      });
  }, []);

  return (
    <VideoBox>
      {movieVideo.results ? (
        movieVideo.results
          .filter((item) => item.type==="Trailer" || item.type=="Teaser")
          .slice(0, 1)
          .map((item) => (
            <Detail>
              <VideoFrame
                src={`https://www.youtube.com/embed/${item.key}`}
              ></VideoFrame>
              <VideoName>{item.type}</VideoName>
            </Detail>
          ))
      ) : (
        <h5>VIDEOS LOADING</h5>
      )}
    </VideoBox>
  );
};

export default MovieVideos;
