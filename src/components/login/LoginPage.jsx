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
const LoginBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  width: '30vw',
  transform: 'translate(-50%, -50%)',
  background: 'rgba(0, 0, 0, 0.75)',
  padding: '60px 68px 40px',
  zIndex: '2',
  [theme.breakpoints.down('sm')]: {
    width: '85vw',
    height:'auto'
  }
}))
  

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

const ForgotText = styled(Typography)(({ theme }) => ({
  float:'right',
  fontSize: '15px',
  color: '#fff',
  fontFamily: '"Rubik", sans-serif',
  [theme.breakpoints.down('sm')]: {
   fontSize:13
  }
}))



const NewUser = styled(Typography)(({ theme }) => ({
  color: "#8c8c8c", 
  fontFamily: '"Rubik", sans-serif',
  textAlign: "center",
  [theme.breakpoints.down('sm')]: {
   fontSize:13
  }
}))

const Sign = styled('span')(({ theme }) => ({
  color: "#fff",
  fontFamily: '"Rubik", sans-serif',
  cursor: "pointer",
  textAlign: "center",
  [theme.breakpoints.down('sm')]: {
   fontSize:13
  }
}))



const LoginPage = ({ setUserLog }) => {
  const nav = useNavigate();
  const { logIn } = useUserAuth();
  let userSignInDetail = {
    email: "",
    password: "",
  };
  const [style, setStyle] = useState({
    width:"75%",
    display:"none",
    fontSize: 15,
    padding: 5,
    fontFamily: '"Rubik", sans-serif',
    borderRadius:5,
    textAlign:"center",
    color: "#721c24",
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb"
  });

  const myTimeout=()=>{
    setTimeout(()=>
    setStyle({
      ...style,
      display:'none',
     }), 5000)}

  const [userDetail, setUserDetail] = useState(userSignInDetail);

  const handleOnChange = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      if(userDetail.email==="" || userDetail.password==="" )
      {
        setStyle({
          ...style,
          display:"block",
          margin:"-20px auto 20px auto",
         })
        myTimeout()
        clearInterval(myTimeout)
       }
      else{ 
        await logIn(userDetail.email, userDetail.password);
        nav(`/home/${userDetail.email.slice(0, 4)}`);}
     
    } catch (error) { setStyle({
      ...style,
      display:"block",
      margin:"-20px auto 20px auto",
     })
    myTimeout()
    clearInterval(myTimeout)}
  };

  const changeLog = () => {
    setUserLog("signup");
  };

  return (
    <LoginBox>
      <Box style={style}>Incorrect username or password!</Box>
      <Text>Sign In</Text>
      <InputField>

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
      <Link to="/forgotPassword">
        <ForgotText>Forgot Password?</ForgotText>
      </Link>
      <ActionButton variant="contained" onClick={() => login()}>
        Sign In
      </ActionButton>
      
      <Box style={{ marginTop: 20, textAlign: "center"}}>
        <NewUser
          style={{ }}
        >
          New User?{" "}
          <Sign
            style={{
              
            }}
            onClick={changeLog}
          >
            Sign up now
          </Sign>
        </NewUser>
      </Box>
    </LoginBox>
  );
};

export default LoginPage;
