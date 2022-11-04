import React, { useState } from 'react'
import { styled, Typography, Box, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom"
import { importReviewData, RemoveReviewData } from "../service/ServiceApi";
import { AccountCircle, SpeakerNotesOff, Delete } from "@mui/icons-material";
import StarsRating from 'stars-rating'

const MainBox = styled(Box)(({ theme }) => ({
  width: '70%',
  height: 'auto',
  display:'flex',
  margin: '0px 0 15px 85px',
  padding:'10px',
  borderRadius:'5px',
  border:'1px solid #141313',
  [theme.breakpoints.down('sm')]: {
    width: '80%',
    margin: '0px 0 15px 15px',
  }
}))


const PrimaryBox = styled(Box)(({ theme }) => ({
  width: '50%',
  height: 'auto',
  display:'flex',
  alignItems:'center',
  margin: '30px 0 10px 85px',
  padding:'10px',
  borderRadius:'5px',
  background:'#181717',
  [theme.breakpoints.down('sm')]: {
    margin: '5px 5px 10px 5px',
  }
}))



const LogoBox = styled(Box)`

`
const ReviewBox = styled(Box)`
flex-flow:row wrap;
margin:0 5px;
`

const AddReview = styled(Box)(({ theme }) => ({
  flexFlow:'row wrap',
margin:'0 5px',
  [theme.breakpoints.down('sm')]: {
    margin:'0', 
  }
}))



const Heading = styled(Typography)(({ theme }) => ({
  fontSize: '35px',
  lineHeight: '34px',
  fontWeight: 400,
  fontFamily: '"Rubik", sans-serif',
  margin: '50px 0 30px 15px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
    margin: '20px 0 10px 15px',
  }
}))

  

  const MovName = styled('span')(({ theme }) => ({
    fontSize: 20, 
    color: "#a3a3a3", 
    [theme.breakpoints.down('sm')]: {
      fontSize: 12, 
    }
  }))


const Name = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  lineHeight: '34px',
  fontWeight: 'bold',
  fontFamily: '"Rubik", sans-serif',
  textTransform:'capitalize',
  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
  }
}))

const Heading2 = styled(Typography)(({ theme }) => ({
  fontSize: '25px',
  lineHeight: '34px',
  fontWeight: 400,
  fontFamily: '"Rubik", sans-serif',
  margin: '50px 0 30px 15px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
    margin: '20px 0 10px 15px',
  }
}))


const Review = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  textTransform:'capitalize',
  fontFamily: '"Rubik", sans-serif',
  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
  }
}))
const InText = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: "65vw",
  }
}))


const Cond = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  textTransform:'capitalize',
  fontFamily: '"Rubik", sans-serif',
  textAlign:'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  }
}))


const ActionButton = styled(Button)({
  width: "10%",
  position: "relative",
  background: " #e50914",
  color: "#fff",
  fontSize: 15,
  top: "-13px",
  marginLeft: 25,
  textTransform: "none",
  fontFamily: '"Rubik", sans-serif',
  "&:hover": {
    background: " #e50914",
  },
  marginTop: 30,
});


const MovieReview = ({ user, name, userReviews }) => {

  const { username } = useParams()
  const [dis, setDis] = useState('none')
  const [val1, setVal1] = useState(0)
  const [textVal, setTextVal] = useState()
  const [isDisable, setIsDisable] = useState(true)
  const [editVal1, setEditVal1] = useState(true)
  const [reviewDetail, setReviewDetail] = useState({
    movieName: "",
    rating: "",
    review: "",
    username: user
  })
  const [value, setValue] = useState({})

  const handleOnChange = (e) => {
    setReviewDetail({ ...reviewDetail, [e.target.name]: e.target.value });
  };


  const ratingChanged2 = (newRating) => {
    setVal1(newRating)
    setEditVal1(false)
    setReviewDetail(reviewDetail.rating = newRating);
    let movie = name.replaceAll(' ', '')
    setReviewDetail(reviewDetail.movieName = movie);
    setValue(reviewDetail)
    setIsDisable(false)

  }


  const inputData = async () => {
    let response = await importReviewData(value);
    if (!response) return;
    else {
      if (response.status === 200) {

        alert("Review Posted!!");
      }
      if (response.status === 201) {
        alert("Review already posted!!")
      }
    }
    setEditVal1(true)
    setVal1(0)
    setTextVal("")
    setIsDisable(true)
  };

  const deleteReview = async () => {
    console.log("clicked")
    let response = await RemoveReviewData({ userN: username, movNam: name.replaceAll(' ', '') });
    if (!response) return;
    alert("Review removed!!");

  };

  const mouseOver = () => {
    setDis('inline')
  };

  const mouseOut = () => {
    setDis('none')
  };

  return (
    <>

      <Heading>Reviews | <MovName>{name}</MovName></Heading>
      <PrimaryBox>
        <AddReview>
          <InText id="standard-basic" placeholder="Add a review..." variant="standard"
            multiline
            onChange={handleOnChange}
            value={textVal}
            name="review"
            sx={{
              ".css-66dh3a-MuiInputBase-input-MuiInput-input": {
                border: "none",
                background: "none",
                color: "#ffffff",
                fontFamily: '"Rubik", sans-serif',
                overflowWrap: "break-word",
                width: "40vw",
              },
              ".css-8q2m5j-MuiInputBase-root-MuiInput-root::after": {
                borderBottom: " 2px solid #e50914",
              },
            }}></InText>
          <StarsRating
            count={5}
            onChange={ratingChanged2}
            size={24}
            color2={'#ffd700'}
            edit={editVal1}
            value={val1}
          />
        </AddReview>
        <ActionButton variant="contained" disabled={isDisable} onClick={() => inputData()}>
          POST
        </ActionButton>
      </PrimaryBox>
      <Heading2 >All Reviews</Heading2>

      {
        userReviews.length !== 0 ? userReviews.map((item) => (

          item.username === username ?

            <MainBox onMouseOver={() => mouseOver()} onMouseOut={() => mouseOut()}>
              <LogoBox>
                < AccountCircle style={{ marginTop: "5px" }} />
              </LogoBox>
              <ReviewBox>
                <Name>{item.username}</Name>
                <StarsRating
                  count={5}
                  size={20}
                  color2={'#ffd700'}
                  edit={false}
                  value={item.rating}
                />
                <Review>{item.review}</Review>
              </ReviewBox>
              {item.username === username ?
                <Delete style={{ marginRight: 0, marginLeft: "auto", color: " rgb(239 14 26)", display: dis }} onClick={() => deleteReview()} /> : <Delete style={{ marginRight: 0, marginLeft: "auto", color: " rgb(239 14 26)", display: "none" }} onClick={() => deleteReview()} />
              }
            </MainBox> : <MainBox  >
              <LogoBox>
                < AccountCircle style={{ marginTop: "5px" }} />
              </LogoBox>
              <ReviewBox>
                <Name>{item.username}</Name>
                <StarsRating
                  count={5}
                  size={20}
                  color2={'#ffd700'}
                  edit={false}
                  value={item.rating}
                />
                <Review>{item.review}</Review>
              </ReviewBox>
              {item.username === username ?
                <Delete style={{ marginRight: 0, marginLeft: "auto", color: " rgb(239 14 26)", display: dis }} onClick={() => deleteReview()} /> : <Delete style={{ marginRight: 0, marginLeft: "auto", color: " rgb(239 14 26)", display: "none" }} onClick={() => deleteReview()} />
              }
            </MainBox>



        )) : <Cond>< SpeakerNotesOff style={{ marginRight: "5px" }} />NO REVIEWS YET</Cond>

      }
    </>
  )
}

export default MovieReview