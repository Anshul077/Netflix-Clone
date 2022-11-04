import React, { useEffect, useState } from "react";
import { Box, Typography, styled } from "@mui/material";
import LoginPage from "./LoginPage.jsx"
import SignUpPage from "./SignUpPage.jsx";

const MainBox = styled(Box)`
  width: 100%;
`;
const BackgroundImage = styled("img")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  minWidth: "100%",
  minHeight: "100%",
  zIndex: 1,
  opacity: "30%",
  [theme.breakpoints.down('sm')]: {
    height: "100%",
    objectFit: "cover",
  }
}))

const LogoImage = styled("img")(({ theme }) => ({
  height: 45,
  width: 167,
  zIndex: 2,
  position: "relative",
  margin: "20px 40px",
  [theme.breakpoints.down('sm')]: {
    margin: "20px",
    height: '20%',
    width: '20%',
}
}))




const MainPage = () => {
  const [userLog, setUserLog] = useState("login")
  return (
    <MainBox>
      <BackgroundImage
        src="https://assets.nflxext.com/ffe/siteui/vlv3/5ea364b1-8e59-4693-8ad8-f0eaee32d1bf/5b9fdff5-be3d-4fc6-9606-dd1b4002f277/IN-en-20220530-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt="IMAGE"
      />
      <LogoImage src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
        alt="logo" />
      {userLog === "login" ? <LoginPage userLog={userLog} setUserLog={setUserLog} /> : <SignUpPage userLog={userLog} setUserLog={setUserLog} />}


    </MainBox>
  );
};

export default MainPage;
