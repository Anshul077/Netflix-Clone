import React from "react";
import { Link,useParams } from "react-router-dom";
import { styled, Typography, Box, TextField, Button } from "@mui/material";


const MainBox = styled(Box)`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-flow:row wrap;
`;


const MovieImage=styled("img")(({ theme }) => ({
  width:'90%',
height:"100%",
objectFit:"cover",
boxShadow: '0 0 5px rgb(192 192 192)',
marginRight:5,
'&:hover': {
  transform: 'scale(1.09)',
  transition: 'transform .3s ease-in-out',
  cursor: 'pointer',
  zIndex:2,
},
  [theme.breakpoints.down('sm')]: {
    width:'100%', 
    marginLeft:'30%'
  }
}))

const DisplayBox=styled(Box)`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
margin:20px 10px;
&:hover{
  cursor:pointer;
  transform:translate(0,-20px);
  transition:transform .3s ease-in;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
}
`


function MovieDisplay({ data }) {

const {username}=useParams()

  return (
    <>
      <Link
        to={`/home/search/${username.slice(0,4)}/movie${data.id <= 50 ? "Info" : "Details"}/${data.media_type}/${
          data.id
        }`}
        style={{ textDecoration: "none", color: "#fff" }}
      >
      <MainBox>
    
        <DisplayBox>
        <MovieImage
            src={
              data.poster_path === "N/A" || "" || null
                ? ""
                : `https://image.tmdb.org/t/p/original${
                    data.poster_path ? data.poster_path : ""
                  }`
            }
            alt="IMAGE"
          />
        </DisplayBox>

     
    </MainBox>
      </Link>
    </>
  );
}

export default MovieDisplay;
