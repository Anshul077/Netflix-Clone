import React from "react";
import { Box, Typography, styled } from "@mui/material";

const GenreBox = styled(Box)`
  width: auto;
  height: auto;
  display: flex;
  padding: 5px;
  margin: 20px 0;
`;
const Genre = styled(Typography)`
  border: 2px solid #fff;
  padding: 5px 15px;
  margin: 0 20px 0 0;
  background: black;
  border-radius: 20px;
  font-size: 15px;
  font-family: "Rubik", sans-serif;
`;

const MovieGenre = ({ genre }) => {
  return (
    <GenreBox>
      {genre
        ? genre.map((item) => (
            <>
              <Genre>{item.name}</Genre>
            </>
          ))
        : ""}
    </GenreBox>
  );
};

export default MovieGenre;
