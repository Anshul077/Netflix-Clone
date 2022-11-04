import React, { useEffect, useState } from "react";
import { Box, Typography, styled, Button } from "@mui/material";
import Navbar from "../Home/Navbar";
import { useSelector, useDispatch } from "react-redux";
import {
  getWishlistData,
} from "../../redux/action/WishlistAction";
import { useNavigate } from "react-router";
// import LoaderSpinner from "../loader/LoaderSpinner";
import { RemoveWishlistData } from "../service/ServiceApi";
import { useParams } from "react-router-dom";

const MovieBox = styled(Box)`
  width: 90%;
  display: flex;
  align-items: center;
  margin: 0 auto 0 2%;
  &:hover {
    background: #1e1e1e;
    cursor: pointer;
  }
  padding: 5px;
  border-top: 1px solid #333;
`;
const TitleDiv = styled(Box)`
  width: 40%;
  margin: 0 4% 0 2%;
`;

const DeleteButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: '15%',
  right: ' 8%',
  backgroundColor: '#e50914',
  fontFamily: '"Rubik", sans-serif',
  [theme.breakpoints.down('sm')]: {
    top: '11%',
    right: ' 8%',
    width: '20%',
    height: '4%'
  }
}))


const Heading = styled(Typography)(({ theme }) => ({
  margin: '6% 0 20px 2%',
  fontSize: '45px',
  fontFamily: '"Rubik", sans-serif',
  [theme.breakpoints.down('sm')]: {
    fontSize: '25px',
    margin: '22% 0 20px 2%',
  }
}))

const Details = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontFamily: '"Rubik", sans-serif',
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',

  }
}))




const Text = styled("span")(({ theme }) => ({
  fontSize: 18,
  fontFamily: '"Rubik", sans-serif',
  [theme.breakpoints.down('sm')]: {
    fontSize: 10,
  }
}))


const Image = styled("img")(({ theme }) => ({
  width: 150,
  height: "100%",
  objectFit: "cover",
  [theme.breakpoints.down('sm')]: {
    width: 60,
  }
}))


const MyWishlist = () => {
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [Movname, setMovName] = useState({
    movieName: "",
  });
  const { username } = useParams();
  const dispatch = useDispatch();
  const { movie } = useSelector((state) => state.wishlistItems);

  useEffect(() => {
    dispatch(getWishlistData(username.slice(0, 4)));
    setLoading(false);
  }, []);
  const deleteItem = async () => {
    if (Movname === "") {
      return alert("Please select an item");
    }
    let response = await RemoveWishlistData(Movname);
    if (!response) return;
    alert("Item removed from wishlist!!");
    navigate(`/home/${username.slice(0, 4)}`);
  };

  const handleChange = (e) => {
    let isChecked = e.target.checked;
    return isChecked
      ? setMovName({ movieName: e.target.value })
      : setMovName("");
  };


  return (
    <div>
      <Navbar />
      <Heading>My List </Heading>
      <DeleteButton variant="contained" onClick={deleteItem}>
        Delete
      </DeleteButton>
      {isLoading === false ? (
        movie.length !== 0 ? movie.flat().map((item) => (
          <MovieBox>
            <Image
              src={`https://image.tmdb.org/t/p/original${item.movieImage}`}
              alt="IMAGE"
            />
            <TitleDiv>
              <Details>{item.movieName}</Details>
            </TitleDiv>
            <Details style={{ margin: "0 10% 0 0" }}>
              {item.movieRelease.slice(0, 4)}
            </Details>
            <Details>
              {item.movieRuntime}{" "}
              <Text>{item.movieRuntime <= 40 ? "Seas" : "min"}</Text>
            </Details>
            {/* <DeleteForever style={{marginLeft:"auto",color:"red"}} onClick={deleteItem}/> */}
            <input
              value={item.movieName}
              type="checkbox"
              onChange={(e) => handleChange(e)}
              style={{ position: "absolute", right: "10%", accentColor: "#e50914", border: "none" }}
            />
          </MovieBox>
        )) : <Typography>NO ITEM IN WISHLIST</Typography>
      ) :""}
    </div>
  );
};

export default MyWishlist;
