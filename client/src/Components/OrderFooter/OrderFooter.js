import React from "react";
import "./OrderFooter.css";

function OrderFooter(props) {
  const {  price=100 } = props;
  return (
    <div className="orderFooterContainer">
      <div className="orderFooterTotal">
        <div className="orderFooterTotalPriceDesc">סה״כ לתשלום</div>
        <div className="orderFooterLeft">
          <div className="orderFooterTotalPrice">{`${price} ₪`}</div>
          <button className="orderFooterSend" onClick={props.onSend}>שלח</button>
        </div>
      </div>
    </div>
  );
}

export default OrderFooter;
