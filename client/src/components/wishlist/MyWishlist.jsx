import React, { useEffect,useState } from "react";
import { Box, Typography, styled } from "@mui/material";
import Navbar from "../Home/Navbar";
import { useSelector, useDispatch } from 'react-redux';
import {DeleteForever} from "@mui/icons-material"
import {getWishlistData,RemoveFromWishlist} from "../../redux/action/WishlistAction"
import { useUserAuth } from "../../context/UserAuthContext";
import LoaderSpinner from "../loader/LoaderSpinner";
import { RemoveWishlistData } from "../service/ServiceApi";

const MainBox = styled(Box)({
  marginTop: 45,
});

const MovieBox = styled(Box)`
width:90%;
display:flex;
align-items:center;
margin:0 auto 0 2%;
&:hover{
  background:#1e1e1e;
  cursor:pointer;
}
padding:5px;
border-top:1px solid #333;
`
const TitleDiv = styled(Box)`
width:40%;
margin:0 4% 0 2%;
` 

const Heading = styled(Typography)`
margin-top:6%;
font-size:45px;
margin-bottom:20px;
margin-left:2%;
font-family: "Rubik", sans-serif;
`
const Details = styled(Typography)`
font-size:18px;
font-family: "Rubik", sans-serif;
`
const Text = styled("span")({
fontSize:18,
fontFamily: '"Rubik", sans-serif'
})
const Image = styled("img")({
  width: 150,
  height: "100%",
  objectFit:"cover",
});

const MyWishlist = () => {
  const [isLoading, setLoading] = useState(true);
  const { user } = useUserAuth();
  const dispatch = useDispatch();
  const { movie } = useSelector((state) => state.wishlistItems);

  useEffect(() => {   
    dispatch(getWishlistData(user.email));
    setLoading(false)
  }, []);

  const deleteItem=async (e)=>{
    await console.log(e)
    let response = await RemoveWishlistData(movie.movieName);
    if (!response) return;
    alert("Item removed from wishlist!!");

  }
  
  return (
    <div>
      <Navbar />
      <Heading>My List </Heading>
      {isLoading===false?movie.flat().map((item)=>(
          <MovieBox>
            <Image src={`https://image.tmdb.org/t/p/original${item.movieImage}`} alt="IMAGE"/>
            <TitleDiv>
            <Details>{item.movieName}</Details>
            </TitleDiv>
            <Details style={{margin:"0 10% 0 0"}}>{item.movieRelease.slice(0,4)}</Details>
            <Details>{item.movieRuntime} <Text>{item.movieRuntime<=40?"Seasons":"min"}</Text></Details>
            <DeleteForever style={{marginLeft:"auto",color:"red"}} onClick={deleteItem}/>
          </MovieBox>
        )):<LoaderSpinner/>
      }
    </div>
  );
};

export default MyWishlist;
