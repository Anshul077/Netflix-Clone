import React, { useState } from "react";
import { Box, Typography, styled, TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext.js";

const ActionButton = styled(Button)({
  width: "100%",
  background: " #e50914",
  color: "#fff",
  fontSize: 15,
  textTransform: "none",
  fontFamily: '"Rubik", sans-serif',
  "&:hover": {
    background: " #e50914",
  },
  marginTop: 30,
});
const Text = styled(Typography)`
  font-size: 32px;
  margin-bottom: 30px;
  font-weight: 600px;
  font-family: "Rubik", sans-serif;
`;
const LoginBox = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 35vw;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.75);
  padding: 60px 68px 40px;
  z-index: 2;
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

const ForgotText = styled(Typography)`
  position: absolute;
  top:55%;
  right: 0;
  margin: 7% 15% 0 0;
  font-size: 15px;
  color: #fff;
  font-family: "Rubik", sans-serif;
`;

const LoginPage = ({ setUserLog }) => {
  const nav = useNavigate();
  const { logIn} = useUserAuth();
  let userSignInDetail = {
    email: "",
    password: "",
  };

  const [userDetail, setUserDetail] = useState(userSignInDetail);

  const handleOnChange = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      await logIn(userDetail.email, userDetail.password);
      nav('/home');
    } catch (error) {}
  };

  const changeLog = () => {
    setUserLog("signup");
  };

  return (
    <LoginBox>
      <Text>Sign In</Text>
      <InputField>
        {/* <Field
          required
          id="filled-search"
          label="Username"
          type="search"
          variant="filled"
          name="username"
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
        /> */}
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
        <Field
          required
          id="filled-password-input"
          label="Password"
          type="password"
          name="password"
          autoComplete="new-password"
          variant="filled"
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
      <ActionButton variant="contained" onClick={() => login()}>
        Sign In
      </ActionButton>
      <Link to="/forgotPassword">
        <ForgotText>Forgot Password?</ForgotText>
      </Link>
      <Box style={{ marginTop: 20, textAlign: "center" }}>
        <Typography
          style={{ color: "#8c8c8c", fontFamily: '"Rubik", sans-serif' }}
        >
          New User?{" "}
          <span
            style={{
              color: "#fff",
              fontFamily: '"Rubik", sans-serif',
              cursor: "pointer",
            }}
            onClick={changeLog}
          >
            Sign up now
          </span>
        </Typography>
      </Box>
    </LoginBox>
  );
};

export default LoginPage;
