import React from "react";
import "./OrderFooter.css";

function OrderFooter(props) {
  const { price = 100 } = props;
  return (
    <div className="orderFooterContainer">
      <div className="orderFooterTotal">
        <div className="orderFooterTotalPriceDesc">Total: </div>
        <div className="orderFooterTotalPrice">{` ${price} ₪ `}</div>
        <div className="orderFooterLeft">
          <button className="orderFooterSend" onClick={props.onSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderFooter;
