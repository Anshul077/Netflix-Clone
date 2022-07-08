import React,{useState} from "react";
import { PlayArrow, Info } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Box, styled, Typography, Button } from "@mui/material";
import MovieVideosDisplay from "../movieDetails/MovieVideosDisplay";

const ButtonGrp = styled(Button)`
  width: 30%;
  font-size: 16px;
  font-family: "Rubik", sans-serif;
  text-transform: none;
  margin: 0 15px 0 0;
`;
const ButtonBox = styled(Box)`
  width: 70%;
  display: flex;
  margin-top: 30px;
`;

const HomeButtons = ({ media, id }) => {
  const [open,setOpen]=useState(false)
  const openDialog=()=>{
    setOpen(true)
  }
  return (
    <>
      <ButtonBox>
        <ButtonGrp
          variant="contained"
          onClick={()=>openDialog()}
          style={{ background: "#ffffff", color: "black" }}
        >
          <PlayArrow
            style={{
              width: "20px",
              color: "black",
              margin: "0 7px 0 0",
            }}
            
          />
          Play Now
        </ButtonGrp>
        <ButtonGrp
          variant="contained"
          style={{ background: "rgb(169,169,169,0.5)",color:"#ffffff" }}
          component={Link}
          to={`movieDetails/${media}/${id}`}
        >
          <Info style={{ width: "20px", margin: "0 5px 0 0" }} />
          More Info
        </ButtonGrp>
      </ButtonBox>
      <MovieVideosDisplay open={open} setOpen={setOpen} media={media} id={id}/>
    </>
  );
};

export default HomeButtons;
