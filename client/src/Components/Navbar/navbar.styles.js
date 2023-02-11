import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    "&:hover": {
      color: "#acf9e9",
      borderBottom: "1px solid white",
    },
  },
  logout: {},
}));

export const appBarStyle = {
  background: "#8ea3af",
};
