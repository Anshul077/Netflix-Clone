import React from 'react'
import {Box,styled} from "@mui/material"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Puff } from  'react-loader-spinner'

const LoaderBox=styled(Box)`
position: fixed;
top: 0;
bottom: 0;      
left: 0;
right: 0;
background: rgb(0,0,0,0.8);
display:flex;
justify-content:center;
align-items:center;
z-index:5;
`

const LoaderSpinner = () => {
    return (
        <LoaderBox>
           <Puff color=" #e50914" height={100} width={100} /> 
        </LoaderBox>
    )
}

export default LoaderSpinner
