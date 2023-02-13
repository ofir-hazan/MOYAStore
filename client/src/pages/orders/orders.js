import React, { useState, useEffect } from "react";
import "./orders.css";
import Order from "../../Components/Order/Order";
import OrderDetails from "../../Components/OrderDetails/OrderDetails";
import { ReactComponent as CartIcon } from "../../resources/cart.svg";
import { Link } from "react-router-dom";

function OrdersPage(props) {
  const { catalogProducts } = props;
  const [orders, setOrders] = useState([]);
  const [clickedOrder, setClickedOrder] = useState();

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    fetch("http://localhost:3001/orders/" + "DF857FE5shTIbyrQAUjjzTBcrR32")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => console.log(err));
  }

  function renderOrders() {
    return orders.map((order) => (
      <Order
        key={order._id}
        order={order}
        uiId={orders.indexOf(order) + 1}
        setClickedOrder={setClickedOrder}
      />
    ));
  }
  return (
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
            ) : (
              <div className="catalogNoProducts">No old orders.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default OrdersPage;
