import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled, Box, Typography } from "@mui/material";

const CastBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: 'auto',
  [theme.breakpoints.down('sm')]: {
    flexFlow:'row wrap',
  }
}))


const DetailBox = styled(Box)`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
`
const CastImage = styled("img")(({ theme }) => ({
  width: 100,
  height: "100%",
  objectFit: "cover",
  marginRight: 5,
  [theme.breakpoints.down('sm')]: {
    width: 80,
    height: "70%",
    marginRight: 10,
    zIndex:5
  }
}))

const Name = styled(Typography)(({ theme }) => ({
  fontSize: 10,
  zIndex:5,
  [theme.breakpoints.down('sm')]: {
    fontSize: 8,
    textAlign:'center',
    marginBottom: 20,
    zIndex:5
  }
}))



const MovieCast = ({ media, id }) => {
  const [movieCast, setMovieCast] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${media}/${id}/credits?api_key=69f8e9780dee4fc0e26aec59a5b32f10&language=en-US
            `
      )
      .then((res) => {
        setMovieCast(res.data);
      });
  }, []);


  return (
    <CastBox>
      {movieCast.cast ? movieCast.cast.slice(0, 6).map((item) => (
        <DetailBox>
          <CastImage src={`https://image.tmdb.org/t/p/original${item.profile_path ? item.profile_path : ""}`} alt="" />
          <Name style={{  }}>{item.name}</Name>
        </DetailBox>
      )) : ""}
    </CastBox>
  );
};

export default MovieCast;
