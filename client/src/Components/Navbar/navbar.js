import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "#acf9e9",
      borderBottom: "1px solid white",
    },
  },
  logout: {},
}));

const appBarStyle = {
  background: "#8ea3af",
};

function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
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
          {/* <Link to="/" className={classes.link}>
            Home
          </Link> */}
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
          <Link to="/signIn" className={classes.link}>
            <LogoutIcon />
          </Link>
          {/* <Link to="/signUp" className={classes.link}>
            signUp
          </Link> */}
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
