import { IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleSupplier from "./singleSupplier";
import "./suppliersPage.css";
import AddBusinessTwoToneIcon from "@mui/icons-material/AddBusinessTwoTone";
import GenericPopup from "../../Components/popup/genericPopup";
import AddEditSuuplier from "./addEditSupplier";

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

// function SuppliersList() {
//   const [suppliers, setSuppliers] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3001/suppliers/all") //get suppliers data
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("got data");
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   function deleteSupplier(supplierId) {
//     console.log("delete" + supplierId);

//     fetch("http://localhost:3001/suppliers/delete/" + supplierId, {
//       method: "DELETE",
//     }).then((res) => {
//       if (res.ok) {
//         console.log("success");
//         setSuppliers(
//           suppliers.filter((supplier) => supplier._id != supplierId)
//         );
//       } else {
//         console.log("There was a problam");
//       }
//     });
//   }

//   return suppliers.map((supplier) => (
//     <SingleSupplier
//       key={supplier._id}
//       name={supplier.name}
//       location={supplier.location}
//       onDelete={() => deleteSupplier(supplier._id)}
//     />
//   ));
// }

function SuppliiersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [openAddPopup, setAddOpenPopup] = useState(false);

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
    />
  ));

  return (
    <div className="suppliesrContainer">
      <IconButton className="addBtn" onClick={() => setAddOpenPopup(true)}>
        <AddBusinessTwoToneIcon />
        <Typography variant="body1"> Add supplier</Typography>
      </IconButton>
      <br />
      <div className="list">{SuppliersList}</div>
      <GenericPopup
        isOpen={openAddPopup}
        closePopup={() => setAddOpenPopup(false)}
      >
        <AddEditSuuplier //add supplier
          name=""
          location=""
          onCancel={() => setAddOpenPopup(false)}
        />
      </GenericPopup>
    </div>
  );
}

export default SuppliiersPage;
