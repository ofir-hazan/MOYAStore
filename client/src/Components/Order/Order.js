import React from "react";
import "./Order.css";
import Button from "@mui/material/Button";

function Order(props) {
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
        <div className="orderTotalPrice">{`${totalPrice.toFixed(2)} ₪`}</div>
      </div>
    </div>
  );
}

export default Order;
