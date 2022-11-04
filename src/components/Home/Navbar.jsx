import React, { useState,useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  styled,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useParams } from "react-router-dom"
import { Search, AccountCircle, Logout, ListAlt } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  height: '45px',
  transition: 'background-color .3s ease-in',
  boxShadow: 'none',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    height: '30px',
  }
}))


const LeftBox = styled(Box)`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledUl = styled("ul")({
  display: "flex",
  listStyle: "none",
  margin: "auto 0",
  textDecoration: "none",
});


const LogoImage = styled("img")(({ theme }) => ({
  width: "8%",
  height: "35%",
  [theme.breakpoints.down('sm')]: {
    width: "25%",
    marginRight: 30,
  }
}));

const Profile = styled("img")(({ theme }) => ({
  width: "30px",
  cursor: "pointer",
  borderRadius: 3,
  [theme.breakpoints.down('sm')]: {
    width: "20px",
  }
}));

const SearchImg = styled(Search)(({ theme }) => ({
  marginRight: 50,
  color: "#ffffff",
  [theme.breakpoints.down('sm')]: {
    width: "20px",
    marginRight: 20,
  }
}));


const Navbar = () => {
  const { logOut, user } = useUserAuth();
  const { username } = useParams()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const nav = useNavigate();



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const UserLogout = async () => {
    try {
      await logOut();
      nav("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    }
    else {
      setColorchange(false);
    }
  };
  window.addEventListener('scroll', changeNavbarColor);



  return (
    <div>
      <StyledAppBar style={colorChange ? { backgroundColor: 'black' } : { backgroundColor: "transparent" }} >
        <Toolbar>
          <Link to={`/home/${username.slice(0, 4)}`} style={{ textDecoration: "none" }}>
            <LogoImage
              src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
              alt="logo"
            />
          </Link>
          <StyledUl>
          </StyledUl>
          <LeftBox>
            <Link to={`/home/${username.slice(0, 4)}/search`}>
              <SearchImg style={{}} />
            </Link>
            <Profile onClick={handleClick} style={{}} src="https://i.pinimg.com/originals/bd/ee/4c/bdee4c328550aaf21aa9f43fd19e2136.png" alt="" srcset="" />
          </LeftBox>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            PaperProps={{
              style: {
                background: "#000",
                color: "#fff",
              },
            }}
          >
            <Link to={`/myWishlist/${username.slice(0, 4)}`} style={{ color: "#fff", textDecoration: "none" }}>
              <MenuItem
                onClick={handleClose}
                style={{ fontFamily: ' "Rubik", sans-serif' }}
              >
                <ListAlt style={{ width: "18%", margin: "0px 5px " }} />
                My Wishlist
              </MenuItem>
            </Link>
            <MenuItem
              onClick={UserLogout}
              style={{ fontFamily: ' "Rubik", sans-serif' }}
            >
              <Logout style={{ width: "18%", margin: "0px 5px " }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};

export default Navbar;
