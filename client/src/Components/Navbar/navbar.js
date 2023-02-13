import React from "react";
import { AppBar, Toolbar, CssBaseline } from "@material-ui/core";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import { useStyles, appBarStyle } from "./navbar.styles";
import { logout } from "../../Firebase";

function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const notToShowInPages = ["/signIn", "/signUp"];

  const handleLogOut = () => {
    logout()
    .then(() => {
      navigate("/signIn")
    })
    .catch(err => {
      console.log(err)
    })
  }

  return notToShowInPages.includes(window.location.pathname) ? (
    <></>
  ) : (
    <AppBar position="static" style={appBarStyle}>
      <CssBaseline />
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => navigate("/")}
        >
          MOYA
        </IconButton>
        <div className={classes.navlinks}>
          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/cart" className={classes.link}>
            <ShoppingCartTwoToneIcon />
          </Link>
          <Link to="/orders" className={classes.link}>
            My orders
          </Link>
          <Link to="/suppliers" className={classes.link}>
            Suppliers
          </Link>
          <Link to="/addProduct" className={classes.link}>
            Add product
          </Link>
          {/* <Link to="/signIn" className={classes.link}>
            <LogoutIcon />
          </Link> */}
          {/* <Link to="/signUp" className={classes.link}>
            signUp
          </Link> */}
          {/* <Link to="/signIn" className={classes.logout}>
            <LogoutIcon />
          </Link> */}
        </div>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={handleLogOut}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
