import React,{useEffect,useState} from 'react'
import { styled, Typography, Box } from "@mui/material";
import axios from "axios"
import {useParams} from "react-router-dom"
import {VideocamOff} from '@mui/icons-material';

const MainBox = styled(Box)`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-flow:row wrap;
  margin-bottom:20px;
`;

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

const Heading=styled(Typography)(({ theme }) => ({
  fontSize: '35px',
  lineHeight: '34px',
  fontWeight: 400,
  fontFamily: '"Rubik", sans-serif',
  margin: '100px 0 30px 15px',
  [theme.breakpoints.down('sm')]: {
    margin: '70px 0 10px 15px',
    fontSize: '15px',
  }
}))

const Cond = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  textTransform:'capitalize',
  fontFamily: '"Rubik", sans-serif',
  textAlign:'center',
  marginTop:'10px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  }
}))

const MovName = styled('span')(({ theme }) => ({
  fontSize: 20, 
  color: "#a3a3a3", 
  [theme.breakpoints.down('sm')]: {
    fontSize: 12, 
  }
}))


const MovieImage=styled("img")(({ theme }) => ({
  width:200,
height:"100%",
objectFit:"cover",
marginRight:5,
  [theme.breakpoints.down('sm')]: {
    width:150, 
    marginRight:3,
  }
}))


const SimilarMovies = ({type,id,name}) => {
    const [movie, setMovie] = useState([]);
    const {username}=useParams()

    useEffect(() => {
        axios
          .get(
            `
            https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=69f8e9780dee4fc0e26aec59a5b32f10&language=en-US&page=1
                 `
          )
          .then((res) => {
            setMovie(res.data.results);
            console.log(res.data.results)
        });
      }, []);


      const changeUrl=(media_type,movie_id)=>(
        window.location.href=`/home/${username}/movieDetails/${media_type}/${movie_id}`
      )
        
  return (
    <>
    <Heading>Similar {type==="movie"?"Movies":"TV Shows"} | <MovName style={{ }}>{name}</MovName></Heading>
    <MainBox>
    {movie.length!==0?movie.slice(0,10).map((item) => (
    
        <DisplayBox onClick={()=>changeUrl(item.media_type,item.id)} >
           <MovieImage src={`https://image.tmdb.org/t/p/original${item.poster_path?item.poster_path:""}`} alt=""/>
        </DisplayBox>

      )):<Cond>< VideocamOff style={{ margin: "10px 5px" }} />NO MOVIES OR TV SHOWS AVAILABLE</Cond>}
    </MainBox>
    </>
  )
}

export default SimilarMovies