import React, { useState, useEffect, useContext } from "react";
import "./orders.css";
import Order from "../../Components/Order/Order";
import OrderDetails from "../../Components/OrderDetails/OrderDetails";
import { ReactComponent as CartIcon } from "../../resources/cart.svg";
import { GlobalContext } from "../../Contexts/GlobalContext";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";

function OrdersPage(props) {
  const { catalogProducts } = props;
  const [orders, setOrders] = useState([]);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [clickedOrder, setClickedOrder] = useState();
  const { connectedUser } = useContext(GlobalContext);
  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    fetch("http://localhost:3001/orders/" + connectedUser.uid)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.log(err);
        handleRaiseAlert("Error while loading orders");
      });
  }

  function renderOrders() {
    return orders
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .map((order) => (
        <Order
          key={order._id}
          order={order}
          uiId={orders.indexOf(order) + 1}
          setClickedOrder={setClickedOrder}
        />
      ));
  }

  function handleRaiseAlert(message) {
    setIsErrorMessage(true);
    setErrorMessage(message);
  }

  return (
    <>
      <div className="products">
        {clickedOrder ? (
          <OrderDetails
            order={clickedOrder}
            uiId={orders.indexOf(clickedOrder) + 1}
            setClickedOrder={setClickedOrder}
            catalogProducts={catalogProducts}
            reloadData={loadData}
          />
        ) : (
          <>
            <div className="productsHeader">
              <div className="productsTitle">My Orders</div>
            </div>
            <div className="productsList">
              {orders?.length ? (
                <> {renderOrders()}</>
              ) : !isErrorMessage ? (
                <div className="catalogNoProducts">No old orders.</div>
              ) : (
                <Alert severity="error">{errorMessage}</Alert>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default OrdersPage;
