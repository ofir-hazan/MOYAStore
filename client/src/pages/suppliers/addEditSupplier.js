import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";

function addSupplier(name, location, closePopup) {
  console.log("add supplier: " + name + "  " + location);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name, location: location }),
  };

  fetch("http://localhost:3001/suppliers/add", requestOptions).then((res) => {
    if (res.ok) {
      console.log("success");
      closePopup();
    } else {
      console.log("There was a problam");
    }
  });
}

function saveChanges(id, name, location, closePopup) {
  console.log("edit supplier: " + name + "  " + location);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: id, name: name, location: location }),
  };

  fetch("http://localhost:3001/suppliers/update", requestOptions).then(
    (res) => {
      if (res.ok) {
        console.log("success");
        closePopup();
      } else {
        console.log("There was a problam");
      }
    }
  );
}

function AddEditSuuplier(props) {
  const [name, setName] = useState(props.name);
  const [location, setLocation] = useState(props.location);
  return (
    <div className="popupContainer">
      <label>
        Supplier name:
        <input
          type="text"
          value={name}
          onChange={(value) => setName(value.target.value)}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(value) => setLocation(value.target.value)}
        />
      </label>
      <div className="buttonsContainer">
        <IconButton
          onClick={
            props.id
              ? () => saveChanges(props.id, name, location, props.onCancel)
              : () => addSupplier(name, location, props.onCancel)
          }
        >
          <SaveTwoToneIcon />
          save
        </IconButton>
        <IconButton onClick={props.onCancel}>
          <CancelTwoToneIcon /> Cancel
        </IconButton>
      </div>
    </div>
  );
}

export default AddEditSuuplier;
