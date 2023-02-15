import { IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleSupplier from "./singleSupplier";
import "./suppliersPage.css";
import AddBusinessTwoToneIcon from "@mui/icons-material/AddBusinessTwoTone";
import GenericPopup from "../../Components/popup/genericPopup";
import AddEditSuuplier from "./addEditSupplier";

function SuppliiersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupSupplier, setPopupSupplier] = useState({
    _id: "",
    name: "",
    location: "",
  });

  useEffect(() => {
    fetch("http://localhost:3001/suppliers/all") //get suppliers data
      .then((res) => res.json())
      .then((data) => {
        console.log("got data");
        setSuppliers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function deleteSupplier(supplierId) {
    console.log("delete" + supplierId);

    fetch("http://localhost:3001/suppliers/delete/" + supplierId, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        setSuppliers(
          suppliers.filter((supplier) => supplier._id != supplierId)
        );
      } else {
        console.log("There was a problam");
      }
    });
  }

  const SuppliersList = suppliers.map((supplier) => (
    <SingleSupplier
      key={supplier._id}
      supplier={supplier}
      onDelete={() => deleteSupplier(supplier._id)}
      onEdit={() => {
        setPopupSupplier(supplier);
        setOpenPopup(true);
      }}
    />
  ));

  return (
    <div className="suppliersContainer">
      <br />
      <IconButton className="addBtn" onClick={() => setOpenPopup(true)}>
        <AddBusinessTwoToneIcon />
        <Typography variant="body1"> Add supplier</Typography>
      </IconButton>
      <br />
      <div className="list">{SuppliersList}</div>
      <GenericPopup isOpen={openPopup} closePopup={() => setOpenPopup(false)}>
        <AddEditSuuplier
          name={popupSupplier.name}
          location={popupSupplier.location}
          id={popupSupplier._id}
          onCancel={() => setOpenPopup(false)}
        />
      </GenericPopup>
    </div>
  );
}

export default SuppliiersPage;
