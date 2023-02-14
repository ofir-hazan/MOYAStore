import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  navlinks: {
    display: "flex",
    alignSelf: "center",
    flex: 1
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(10),
    alignSelf: "center",
    "&:hover": {
      color: "#acf9e9",
      borderBottom: "1px solid white",
    },
  },
  logout: {
    marginRight: "auto",
    marginLeft: "250px",
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(10),
    alignSelf: "center",
    "&:hover": {
      color: "#acf9e9",
      borderBottom: "1px solid white",
    },
  },
  activeUsers: {
    marginRight: "20px"
  }
}));

export const appBarStyle = {
  display: "flex",

  background: "#8ea3af",
};
