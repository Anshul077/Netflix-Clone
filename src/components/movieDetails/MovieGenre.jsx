import React from "react";
import { Box, Typography, styled } from "@mui/material";

const GenreBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  padding: '5px',
  margin: '20px 0',
  [theme.breakpoints.down('sm')]: {
    margin: '10px 0',
  }
}))
  

const Genre = styled(Typography)(({ theme }) => ({
  border: '2px solid #fff',
  padding: '5px 15px',
  margin: '0 20px 0 0',
  background: 'black',
  borderRadius: '20px',
  fontSize: '15px',
  fontFamily: '"Rubik", sans-serif',
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',
    padding: '5px 10px',
    margin: '0 5px 0 0',
    border: 'none',
    outline:'none'
  }
}))

const SecondaryBox = styled(Box)(({ theme }) => ({
  width: 'auto',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    margin: 'auto',
  }
}))



const MovieGenre = ({ genre }) => {
  return (
    <GenreBox>
      <SecondaryBox>
      {genre
        ? genre.map((item) => (
            <>
              <Genre>{item.name}</Genre>
            </>
          ))
        : ""}
        </SecondaryBox>
    </GenreBox>
  );
};

export default MovieGenre;
