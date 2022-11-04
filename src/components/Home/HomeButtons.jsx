import React,{useState} from "react";
import { PlayArrow, Info } from "@mui/icons-material";
import { Link,useParams } from "react-router-dom";
import { Box, styled, Typography, Button } from "@mui/material";
import MovieVideosDisplay from "../movieDetails/MovieVideosDisplay";

const ButtonGrp = styled(Button)(({theme})=>({
  width: '30%',
  fontSize: '16px',
  fontFamily: '"Rubik", sans-serif',
  textTransform: 'none',
  margin: '0 15px 0 0',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    fontSize: '16px',
    marginRight:'15px',
}
}))
  

const ButtonBox = styled(Box)`
  width: 100%;
  display: flex;
  margin-top: 30px;
`;

const HomeButtons = ({ media, id }) => {
  const [open,setOpen]=useState(false)
  const {username}=useParams()
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
          to={`/home/${username}/movieDetails/${media}/${id}`}
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
