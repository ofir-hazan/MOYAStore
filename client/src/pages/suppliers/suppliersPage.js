import React, { useEffect, useState } from "react";
import SingleSupplier from "./singleSupplier";
import "./suppliersPage.css";
import AddBusinessTwoToneIcon from "@mui/icons-material/AddBusinessTwoTone";
import GenericPopup from "../../Components/popup/genericPopup";
import AddEditSuuplier from "./addEditSupplier";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

function SuppliiersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupSupplier, setPopupSupplier] = useState({
    _id: "",
    name: "",
    location: "",
  });
  // const [isErrorMessage, setIsErrorMessage] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  // const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  // const [successMessage, setSuccessMessage] = useState("");

  const ColorButton = styled(Button)({
    color: "white",
    backgroundColor: "#6cbaa9",
    marginTop: "3%",
    marginBottom: "1%",
    marginLeft: "3%",
    width: "15%",
    "&:hover": {
      backgroundColor: "#6cbaa9",
    },
  });

  useEffect(() => {
    fetch("http://localhost:3001/suppliers/all") //get suppliers data
      .then((res) => res.json())
      .then((data) => {
        console.log("got data");
        setSuppliers(data);
      })
      .catch((err) => console.log(err));
  }, [openPopup]);

  function deleteSupplier(supplierId) {
    console.log("delete" + supplierId);

    fetch("http://localhost:3001/suppliers/delete/" + supplierId, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        setSuppliers(
          suppliers.filter((supplier) => supplier._id !== supplierId)
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
      <ColorButton
        className="addBtn"
        onClick={() => {
          setPopupSupplier({ name: "", location: "", id: "" });
          setOpenPopup(true);
        }}
        startIcon={<AddBusinessTwoToneIcon />}
      >
        Add supplier
      </ColorButton>
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
