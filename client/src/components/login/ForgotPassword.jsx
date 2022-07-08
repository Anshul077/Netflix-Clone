import React, { useState } from "react";
import { Box, Typography, styled, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase-config.js";

const MainBox = styled(Box)`
  width: 100%;
`;
const BackgroundImage = styled("img")({
  position: "fixed",
  top: 0,
  left: 0,
  minWidth: "100%",
  minHeight: "100%",
  zIndex: 1,
  opacity: "70%",
});
const LogoImage = styled("img")({
  height: 45,
  width: 167,
  zIndex: 2,
  position: "relative",
  margin: "20px 40px",
});

const LoginBox = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 35vw;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  background: rgb(34, 33, 33);
  padding: 15px 45px 30px;
  z-index: 2;
`;

const Text = styled(Typography)`
  font-size: 32px;
  font-weight: 600px;
  font-family: "Rubik", sans-serif;
`;

const InputField = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const Field = styled(TextField)`
  background: #333;
  margin-bottom: 20px;
  width: 100%;
  border-radius: 4px;
  color: #fff;
`;

const ActionButton = styled(Button)({
  width: "70%",
  background: " #e50914",
  color: "#fff",
  fontSize: 15,
  textTransform: "none",
  fontFamily: '"Rubik", sans-serif',
  "&:hover": {
    background: " #e50914",
  },
  margin: "auto",
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [style, setStyle] = useState({
    margin: "5px 0 15px 0",
    display: "none",
    fontSize: 15,
    padding: 5,
    fontFamily: '"Rubik", sans-serif',
    borderRadius:5,
    textAlign:"center"
  });

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };


  const ForgotPassword = async() => {
    
      await sendPasswordResetEmail(auth, email)
      .then((res)=>{
        setMsg("true")
        setStyle({
          ...style,
          display:'inline',
          color: "#155724",
          backgroundColor: " #d4edda",
          borderColor: "#c3e6cb",
        })
      })
      .catch((error)=>{
        setStyle({
          ...style,
          display:'inline',
          color: "#721c24",
          backgroundColor: "#f8d7da",
          borderColor: "#f5c6cb"
        })
        setMsg("false")
      })

  };

  return (
    <MainBox>
      <BackgroundImage
        src="https://assets.nflxext.com/ffe/siteui/acquisition/login/login-the-crown_2-1500x1000.jpg"
        alt="IMAGE"
      />
      <LogoImage
        src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
        alt="logo"
      />
      <LoginBox>
        <Box style={style}>{msg==="true"?"We have sent you an email for password reset!":"Wrong email entered!"}</Box>
        <Text>Forgot Password</Text>
        <InputField>
          <Typography
            style={{
              fontSize: 13,
              fontFamily: ' "Rubik", sans-serif',
              margin: "20px 0",
            }}
          >
            We will send you an email with instructions on how to reset your
            password.
          </Typography>
          <Field
            required
            id="filled-search"
            label="Email"
            type="search"
            variant="filled"
            name="email"
            onChange={handleOnChange}
            InputLabelProps={{
              style: { color: "#8c8c8c", fontFamily: '"Rubik", sans-serif' },
            }}
            inputProps={{
              sx: { color: "#fff", fontFamily: '"Rubik", sans-serif' },
            }}
            sx={{
              ".css-19mk8g1-MuiInputBase-root-MuiFilledInput-root::after": {
                borderBottom: " 2px solid #e50914",
                borderBottomRightRadius: 4,
                borderBottomLeftRadius: 4,
              },
            }}
          />
        </InputField>
        <ActionButton variant="contained" onClick={ForgotPassword}>
          Send Email
        </ActionButton>
        <Link
          to="/"
          style={{ margin: "auto", textDecoration: "none", color: "#fff" }}
        >
          <Typography
            style={{ margin: "20px 0 0 0", fontFamily: ' "Rubik", sans-serif' }}
          >
            Sign In
          </Typography>
        </Link>
      </LoginBox>
    </MainBox>
  );
};

export default ForgotPassword;
