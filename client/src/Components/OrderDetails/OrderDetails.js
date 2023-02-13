import React from "react";
import "./OrderDetails.css";
import OrderProduct from "../OrderProduct/OrderProduct";
import InfoIcon from "@mui/icons-material/Info";
import { ReactComponent as BackIcon } from "../../resources/back.svg";

function OrderDetails(props) {
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
  );
}

export default OrderDetails;
