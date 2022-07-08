import React, { useState } from "react";
import { Box, Typography, styled, TextField, Button } from "@mui/material";
import { useUserAuth } from "../../context/UserAuthContext.js";
import { useNavigate} from "react-router-dom";

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
});
const Text = styled(Typography)`
  font-size: 32px;
  margin-bottom: 30px;
  font-weight: 600px;
  font-family: "Rubik", sans-serif;
`;
const SignUpBox = styled(Box)`
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

const SignUpPage = ({ setUserLog }) => {
  const { signUp } = useUserAuth();
  const nav = useNavigate();
  let userSignupDetail = {
    username: "",
    email: "",
    password: "",
  };

  const [userDetail, setUserDetail] = useState(userSignupDetail);

  const handleOnChange = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };

  const changeLog = () => {
    setUserLog("login");
  };


  const register = async () => {
    try {
      await signUp(userDetail.email, userDetail.password);
      setUserLog("login");
      nav("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SignUpBox>
      <Text>Sign Up</Text>
      <InputField>
        <Field
          required
          id="filled-search"
          label="Username"
          type="search"
          variant="filled"
          name="username"
          InputLabelProps={{
            style: { color: "#8c8c8c", fontFamily: '"Rubik", sans-serif' },
          }}
          inputProps={{
            sx: { color: "#fff", fontFamily: '"Rubik", sans-serif' },
          }}
          onChange={handleOnChange}
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
          id="filled-search"
          label="Email"
          type="search"
          variant="filled"
          name="email"
          InputLabelProps={{
            style: { color: "#8c8c8c", fontFamily: '"Rubik", sans-serif' },
          }}
          inputProps={{
            sx: { color: "#fff", fontFamily: '"Rubik", sans-serif' },
          }}
          onChange={handleOnChange}
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
          autoComplete="new-password"
          variant="filled"
          name="password"
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
      <ActionButton variant="contained" onClick={() => register()}>
        Sign Up
      </ActionButton>
      
      <Box style={{ marginTop: 20, textAlign: "center" }}>
        <Typography
          style={{ color: "#8c8c8c", fontFamily: '"Rubik", sans-serif' }}
        >
          Already have an account?{" "}
          <span
            style={{
              color: "#fff",
              fontFamily: '"Rubik", sans-serif',
              cursor: "pointer",
            }}
            onClick={changeLog}
          >
            Sign In
          </span>
        </Typography>
      </Box>
    </SignUpBox>
  );
};

export default SignUpPage;
