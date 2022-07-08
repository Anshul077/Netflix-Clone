import React, { useState, useEffect } from "react";
import axios from "axios";
import {Dialog,Box,DialogContent,styled} from "@mui/material"

const DialogVideo=styled(DialogContent)({
    width:"100%",
    height:'auto',
    background:'black',
    color:"#fff",
    padding:0,
    paddingTop:0,
})
const VideoFrame=styled("iframe")({
  width: "100vh",
  height: "79vh",
})


const MovieVideosDisplay = ({media,id,open,setOpen}) => {
    const [movieVideo, setMovieVideo] = useState({});
    useEffect(() => {
      axios
        .get(
          `    http://api.themoviedb.org/3/${media}/${id}/videos?api_key=69f8e9780dee4fc0e26aec59a5b32f10
               `
        )
        .then((res) => {
          setMovieVideo(res.data);
        });
    }, []);

    const handleClose=()=>{
        setOpen(false)
    }



    return (
        <Dialog open={open} onClose={()=>handleClose()} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <DialogVideo>
            {movieVideo.results ? (
        movieVideo.results
          .filter((item) => item.name === "Final Trailer" || item.type === "Trailer")
          .slice(0, 1)
          .map((item) => (
           
              <VideoFrame
                  src={`https://www.youtube.com/embed/${item.key}?autoplay=1`}
                ></VideoFrame>
          ))
      ) : (
        <h5 style={{textAlign:'center'}}>VIDEO LOADING</h5>
      )}
            </DialogVideo>
        </Dialog>
    )
}

export default MovieVideosDisplay
