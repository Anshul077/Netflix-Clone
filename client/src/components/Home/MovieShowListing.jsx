import React, { useEffect,useState } from "react";
import { Box, styled, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import axios from "axios"

// import { moviesData } from "../../api";
import LoaderSpinner from "../loader/LoaderSpinner";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const StyledImage = styled("img")({
  width: 250,
  height: "100%",
  objectFit:"cover",
  cursor: "pointer",
});

const Heading = styled(Typography)`
  font-size: 25px;
  margin-bottom: 20px;
  font-family: "Rubik", sans-serif;
`;
const StyledCarousel = styled(Carousel)`
`;

const MovieShowListing = ({ title, category, media }) => {

  const [poster,setPoster]=useState([])



useEffect(()=>{
  axios.get(`https://api.themoviedb.org/3/${media}/${category}?api_key=69f8e9780dee4fc0e26aec59a5b32f10&language=en-US&page=1`)
  .then((res)=>{
    setPoster(res.data.results)
  })
},[])

  return (
    <Box style={{ padding: 5, margin: "0 15px 70px 15px" }}>
      <Heading variant="h3">{title}</Heading>
      <StyledCarousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        centerMode={false}
        infinite={true}
        shouldResetAutoplay={false}
        autoPlay={false}
        keyBoardControl={true}
        showDots={false}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {poster.filter((item) => item.backdrop_path!==null)
          .map((item) => (
            <Link
              to={`movieDetails/${media}/${item.id}`}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              {item.backdrop_path?<StyledImage src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="IMAGE" id={item.id} />:<LoaderSpinner/>}
            </Link>
          ))}
      </StyledCarousel>
    </Box>
  );
};

export default MovieShowListing;
