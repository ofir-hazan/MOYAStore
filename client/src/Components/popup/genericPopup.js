import React from "react";
import "./genericPopup.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

function GenericPopup(props) {
  return props.isOpen ? (
    <div className="popup">
      <div className="innerPopup">
        <IconButton className="closeBtn" onClick={props.closePopup}>
          <CloseIcon />
        </IconButton>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default GenericPopup;
