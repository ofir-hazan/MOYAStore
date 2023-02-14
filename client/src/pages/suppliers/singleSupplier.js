import React from "react";
import { useState } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Card, IconButton } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import { Box } from "@mui/system";
import GenericPopup from "../../Components/popup/genericPopup";
import AddEditSuuplier from "./addEditSupplier";

function SingleSupplierCard(props) {
  const { name, location, _id } = props.supplier;
  const [openEditPopup, setOpenEditPopup] = useState(false);
  return (
    <Box sx={{ width: 250, height: 200, margin: 3 }}>
      <Card>
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              {name}
            </Typography>
            <Typography variant="body2">location: {location}</Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={() => setOpenEditPopup(true)}>
              <EditTwoToneIcon />
            </IconButton>
            <IconButton onClick={props.onDelete}>
              <DeleteForeverTwoToneIcon />
            </IconButton>
          </CardActions>
        </React.Fragment>
      </Card>
      <GenericPopup
        isOpen={openEditPopup}
        closePopup={() => setOpenEditPopup(false)}
      >
        <AddEditSuuplier //edit supplier
          name={name}
          location={location}
          id={_id}
          onCancel={() => setOpenEditPopup(false)}
        />
      </GenericPopup>
    </Box>
  );
}

export default SingleSupplierCard;
