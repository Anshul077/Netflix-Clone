import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  styled,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Search, AccountCircle, Logout, ListAlt } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

const StyledAppBar = styled(AppBar)`
  position: fixed;
  height: 45px;
  background: black;
  display: flex;
  justify-content: center;
`;

const UserName = styled(Typography)`
  font-weight: bold;
  color: #e71b2a;
  font-size: 20px;
  font-family: "Rubik", sans-serif;
  cursor: pointer;
`;
const LeftBox = styled(Box)`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UserBox = styled(Box)`
  width: 30px;
  height: 30px;
  border: 2px solid #e71b2a;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const StyledUl = styled("ul")({
  display: "flex",
  listStyle: "none",
  margin: "auto 0",
  textDecoration: "none",
});
const StyledLi = styled("li")({
  fontSize: 15,
  margin: "0 20px",
  color: "#ffffff",
  fontFamily: "'Rubik', sans-serif",
});

const LogoImage = styled("img")({
  width: "8%",
  height: "35%",
});

const Navbar = () => {
  const { logOut, user } = useUserAuth();
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

  return (
    <div>
      <StyledAppBar>
        <Toolbar>
          <LogoImage
            src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
            alt="logo"
          />

          <StyledUl>
            <Link to={"/home"} style={{ textDecoration: "none" }}>
              <StyledLi>Home</StyledLi>
            </Link>
            <StyledLi>TV Shows</StyledLi>
            <StyledLi>Movies</StyledLi>
          </StyledUl>
          <LeftBox>
            <Link to={`/home/search`}>
              <Search style={{ marginRight: 50, color: "#ffffff" }} />
            </Link>
            <UserBox>
              <UserName onClick={handleClick}>
                {user && user.email ? user.email.slice(0, 1).toUpperCase() : ""}
              </UserName>
            </UserBox>
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
            <MenuItem
              onClick={handleClose}
              style={{ fontFamily: ' "Rubik", sans-serif' }}
            >
              <AccountCircle style={{ width: "18%", margin: "0px 5px " }} />{" "}
              Profile
            </MenuItem>
            <Link to={`/myWishlist/${user && user.email ? user.email:""}`} style={{color:"#fff",textDecoration:"none"}}>
              <MenuItem
                onClick={handleClose}
                style={{ fontFamily: ' "Rubik", sans-serif' }}
              >
                <ListAlt style={{ width: "18%", margin: "0px 5px " }} />
                My Wishlist
              </MenuItem>
            </Link>
            <MenuItem
              onClick={handleClose}
              onClick={() => UserLogout()}
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
