import React, { useState } from "react";
import OrderProduct from "../../Components/OrderProduct/OrderProduct";
import { ReactComponent as BackIcon } from "../../resources/back.svg";
import { Link } from "react-router-dom";
import "./Cart.css";
import OrderFooter from "../../Components/OrderFooter/OrderFooter";

function Cart(props) {
  const { products, clearProducts } = props;
  const [additionalTextInput, setAdditionalTextInput] = useState("");
  const [isSuccessfullySent, setIsSuccessfullySent] = useState(undefined);

  function renderOrderProducts() {
    return products.map((product) => (
      <OrderProduct key={product.name} product={product} />
    ));
  }

  function totalPrice() {
    let price = 0;
    products.forEach(
      (product) => (price += (product.price || 0) * (product.quantity || 1))
    );
    return price.toFixed(2);
  }

  function onSend() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: products,
        additionalInfo: additionalTextInput,
        totalPrice: totalPrice(),
      }),
    };
    fetch("http://localhost:3001/orders/insert", requestOptions)
      .then((res) => {
        if (res.ok) {
          setIsSuccessfullySent(true);
          clearProducts();
        } else {
          setIsSuccessfullySent(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessfullySent(false);
      });
  }

  function onTextChange(e) {
    setAdditionalTextInput(e.target.value);
  }

  return (
    <div className="cartContainer">
      <div className="cartHeader">
        <div className="cartTitle">עגלת הקניות</div>
        <Link to="/">
          <div className="back">
            <BackIcon height={30} width={30} />
          </div>
        </Link>
      </div>
      {isSuccessfullySent === undefined ? (
        <>
          {products?.length ? (
            <>
              {" "}
              <div className="productsList">{renderOrderProducts()}</div>
              <div className="additionalInfo">
                <div className="additionalInfotTitle">
                  {`פרטים נוספים (אופציונלי):`}
                </div>
                <textarea
                  className="additionaalInfoText"
                  placeholder="פרטים נוספים..."
                  onChange={onTextChange}
                  value={additionalTextInput}
                />
              </div>
              <OrderFooter onSend={onSend} price={totalPrice()} />
            </>
          ) : (
            <div className="cartNoProducts">אין מוצרים בעגלה!</div>
          )}
        </>
      ) : (
        <div className="cartNoProducts">
          {isSuccessfullySent
            ? "ההזמנה נשלחה בהצלחה!"
            : "מצטערים, חלה שגיאה :("}
        </div>
      )}
    </div>
  );
}

export default Cart;
