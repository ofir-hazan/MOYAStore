<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
=======
import React from "react";
>>>>>>> origin/orders_page
import "./OrderDetails.css";
import OrderProduct from "../OrderProduct/OrderProduct";
import InfoIcon from "@mui/icons-material/Info";
import { ReactComponent as BackIcon } from "../../resources/back.svg";

function OrderDetails(props) {
<<<<<<< HEAD
  const { setClickedOrder, catalogProducts, uiId, reloadData } = props;
  const { _id, orderDate } = props.order;
  const [editable, setEditable] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsToDelete, setProductsToDelete] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/orders/orderProducts/" + _id)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setOriginalProducts(data);
        setEditable(isEditable);
      })
      .catch((err) => console.log(err));
  }, []);
  function renderOrderProducts() {
    return products.map((product) => {
      const currProduct = {
        ...product,
        ...catalogProducts.find((e) => e._id == product.productId),
      };
      return (
        <OrderProduct
          key={product._id}
          product={currProduct}
          editable={editMode}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      );
    });
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatTime(date) {
    return `${padTo2Digits(date.getHours())}:${padTo2Digits(
      date.getMinutes()
    )}`;
  }

  function isEditable() {
    return (
      (new Date().getTime() - new Date(orderDate).getTime()) / 3600000 < 10
    );
  }

  function onAdd(productAdded) {
    let newProducts = [...products];
    let exsitingProduct = newProducts.find(
      (product) => product.productId === productAdded.productId
    );
    if (exsitingProduct) {
      exsitingProduct.quantity++;
    }
    setProducts(newProducts);
  }

  function onRemove(productRemoved) {
    let newProducts = [...products];
    let exsitingProduct = newProducts.find(
      (product) => product.productId === productRemoved.productId
    );
    if (exsitingProduct) {
      if (exsitingProduct.quantity === 1) {
        const newProductsToDelete = [...productsToDelete];
        newProductsToDelete.push(exsitingProduct);
        setProductsToDelete(newProductsToDelete);
        newProducts = newProducts.filter(
          (product) => product.productId !== productRemoved.productId
        );
      } else {
        exsitingProduct.quantity--;
      }
    }
    setProducts(newProducts);
  }

  function cancelEdit() {
    setProducts(originalProducts);
    setProductsToDelete([]);
  }

  function saveEdit() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: products,
        productsToDelete: productsToDelete,
      }),
    };
    fetch("http://localhost:3001/orders/editOrder/" + _id, requestOptions)
      .then((res) => {
        reloadData();
        setClickedOrder(null);
      })
      .catch((err) => console.log(err));
  }

  function deleteOrder() {
    fetch("http://localhost:3001/orders/deleteOrder/" + _id)
      .then((res) => {
        reloadData();
        setClickedOrder(null);
      })

      .catch((err) => console.log(err));
  }

  return (
    <>
      {products?.length ? (
        <div>
          <div className="productsHeader">
            <div className="productsTitle">Order {uiId}</div>
            <div className="back" onClick={() => setClickedOrder(null)}>
              <BackIcon height={30} width={30} />
            </div>
          </div>

          <div className="productsList">
            <div className="orderDetails">
              <div>
                {`Order placed on ${new Date(orderDate).toLocaleDateString(
                  "en-IL"
                )} at ${formatTime(new Date(orderDate))}`}
                <div className="orderChangeInfo">
                  <InfoIcon />
                  Order can be edited up to 2 hours from placement
                </div>
              </div>
              {editable ? (
                <div>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={deleteOrder}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => setEditMode(!editMode)}
                    style={{ marginLeft: "10px" }}
                  >
                    Edit
                  </Button>
                </div>
              ) : null}
            </div>
            {renderOrderProducts()}
            {editMode ? (
              <div className="editButtons">
                <Button
                  variant="contained"
                  color="success"
                  style={{ width: "30%" }}
                  onClick={saveEdit}
                >
                  Save Changes
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  style={{ width: "30%" }}
                  onClick={cancelEdit}
                >
                  Cancel
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
=======
  const { setClickedOrder } = props;
  const { id, products, date } = props.order;
  function renderOrderProducts() {
    return products.map((product) => (
      <OrderProduct key={product.name} product={product} />
    ));
  }

  return (
    <div>
      <div className="productsHeader">
        <div className="productsTitle">הזמנה {id}</div>
        <div className="back" onClick={() => setClickedOrder(null)}>
          <BackIcon height={30} width={30} />
        </div>
      </div>

      <div className="productsList">
        <div className="orderDetails">
          {`ההזמנה בוצעה בתאריך ${date} בשעה 12:00`}
          <div className="orderChangeInfo">
            <InfoIcon />
            ההזמנה ניתנת לשינוי עד לשעתיים לאחר ביצועה
          </div>
        </div>
        {renderOrderProducts()}
      </div>
    </div>
>>>>>>> origin/orders_page
  );
}

export default OrderDetails;