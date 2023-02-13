import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Card, IconButton } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import { Box } from "@mui/system";

function SingleSupplierCard(props) {
  const { name, location } = props;
  return (
    <Box sx={{ maxWidth: 200, minWidth: 100, margin: 3 }}>
      <Card>
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              {name}
            </Typography>
            <Typography variant="body2">location: {location}</Typography>
          </CardContent>
          <CardActions>
            <IconButton>
              <EditTwoToneIcon />
            </IconButton>
            <IconButton>
              <DeleteForeverTwoToneIcon />
            </IconButton>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}

export default SingleSupplierCard;
