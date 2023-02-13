import React from "react";
import "./Order.css";
import Button from "@mui/material/Button";

function Order(props) {
<<<<<<< HEAD
  const { uiId } = props;
  const { orderDate, products, totalPrice } = props.order;
  // function calcProuctsAmt() {
  //   return products?.length
  //     ? products.reduce((sum, product2) => sum + product2.quantity, 0)
  //     : 0;
  // }
  return (
    <div className="orderContainer">
      <div className="productDescription">
        <div className="productDesc">
          {new Date(orderDate).toLocaleDateString("en-IL")}
          {/* <div className="orderProcutsAmt">{`${calcProuctsAmt()} פריטים`}</div> */}
        </div>
        <div className="productName">Order {uiId}</div>
      </div>
      <div className="orderSideContainer">
        <Button
          variant="contained"
          onClick={() => props.setClickedOrder(props.order)}
        >
          Order Details
        </Button>
=======
  const { id, date, products, totalPrice } = props.order;
  function calcProuctsAmt() {
    return products.reduce(
      (product1, product2) => product1.quantity + product2.quantity
    );
  }
  return (
    <div className="orderContainer">
      <div className="productDescription">
        <div className="productName">הזמנה {id}</div>
        <div className="productDesc">
          {date}
          <div className="orderProcutsAmt">{`${calcProuctsAmt()} פריטים`}</div>
        </div>
      </div>
      <div className="orderSideContainer">
        <Button variant="contained" onClick={() => props.setClickedOrder(props.order)}>לצפייה בהזמנה</Button>
>>>>>>> origin/orders_page
        <div className="orderTotalPrice">{`${totalPrice.toFixed(2)} ₪`}</div>
      </div>
    </div>
  );
}

export default Order;
