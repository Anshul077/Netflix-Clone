import React, { useEffect, useState } from "react";
import { Box, styled, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import axios from "axios"
// import LoaderSpinner from "../loader/LoaderSpinner";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const MainBox = styled(Box)(({ theme }) => ({
  padding: 5,
  margin: "0 15px 30px 15px",
  [theme.breakpoints.down('sm')]: {
    margin: "0 15px 30px 15px",
  }
}))

const StyledImage = styled("img")(({ theme }) => ({
  width: 250,
  height: "100%",
  objectFit: "cover",
  cursor: "pointer",
  [theme.breakpoints.down('sm')]: {
    objectFit: 'cover',
    width: 155,
    height: "100%",
  }
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: '25px',
  marginBottom: '20px',
  fontFamily: '"Rubik", sans-serif',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '10px',
  }
}))

const StyledCarousel = styled(Carousel)`
`;

const MovieShowListing = ({ title, category, media }) => {

  const [poster, setPoster] = useState([])



  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/${media}/${category}?api_key=69f8e9780dee4fc0e26aec59a5b32f10&language=en-US&page=1`)
      .then((res) => {
        setPoster(res.data.results)
      })
  }, [])

  return (
    <MainBox style={{}}>
      <Heading variant="h3">{title}</Heading>
      <StyledCarousel
        swipeable={true}
        draggable={false}
        responsive={responsive}
        centerMode={false}
        infinite={true}
        shouldResetAutoplay={false}
        autoPlay={false}
        keyBoardControl={true}
        showDots={false}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {poster.filter((item) => item.backdrop_path !== null)
          .map((item) => (
            <Link
              to={`movieDetails/${media}/${item.id}`}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              {item.backdrop_path ? <StyledImage src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="IMAGE" id={item.id} /> :""}
            </Link>
          ))}
      </StyledCarousel>
    </MainBox>
  );
};

export default MovieShowListing;
