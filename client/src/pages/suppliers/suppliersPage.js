import { IconButton, Typography } from "@mui/material";
import React from "react";
import SingleSupplier from "./singleSupplier";
import "./suppliersPage.css";
import AddBusinessTwoToneIcon from "@mui/icons-material/AddBusinessTwoTone";

const fakeData = [
  {
    _id: "322542184",
    name: "עלית",
    location: "center",
  },
  {
    _id: "322542185",
    name: "אסם",
    location: "south",
  },
  {
    _id: "322542186",
    name: "dell",
    location: "north",
  },
  {
    _id: "322542187",
    name: "lenovo",
    location: "center",
  },
  {
    _id: "322542184",
    name: "עלית",
    location: "center",
  },
  {
    _id: "322542185",
    name: "אסם",
    location: "south",
  },
  {
    _id: "322542186",
    name: "dell",
    location: "north",
  },
  {
    _id: "322542187",
    name: "lenovo",
    location: "center",
  },
  {
    _id: "322542184",
    name: "עלית",
    location: "center",
  },
  {
    _id: "322542185",
    name: "אסם",
    location: "south",
  },
  {
    _id: "322542186",
    name: "dell",
    location: "north",
  },
  {
    _id: "322542187",
    name: "lenovo",
    location: "center",
  },
  {
    _id: "322542184",
    name: "עלית",
    location: "center",
  },
  {
    _id: "322542185",
    name: "אסם",
    location: "south",
  },
  {
    _id: "322542186",
    name: "dell",
    location: "north",
  },
  {
    _id: "322542187",
    name: "lenovo",
    location: "center",
  },
];

function SuppliersList() {
  return fakeData.map((supplier) => (
    <SingleSupplier
      key={supplier._id}
      name={supplier.name}
      location={supplier.location}
    />
  ));
}

function SuppliiersPage() {
  return (
    <div className="suppliesrContainer">
      <IconButton>
        <AddBusinessTwoToneIcon />
        <Typography variant="body1"> Add supplier</Typography>
      </IconButton>
      <br />
      <div className="list">{SuppliersList()}</div>
    </div>
  );
}

export default SuppliiersPage;
