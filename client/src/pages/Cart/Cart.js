import React, { useContext, useState } from "react";
import OrderProduct from "../../Components/OrderProduct/OrderProduct";
import { ReactComponent as BackIcon } from "../../resources/back.svg";
import { Link } from "react-router-dom";
import "./Cart.css";
import OrderFooter from "../../Components/OrderFooter/OrderFooter";
import { CartContext } from "../../Contexts/cartContext";

function Cart() {
  const { cartProducts, clearProducts, onAdd, onRemove } = useContext(CartContext);
  const [additionalTextInput, setAdditionalTextInput] = useState("");
  const [isSuccessfullySent, setIsSuccessfullySent] = useState(undefined);

  function renderOrderProducts() {
    return cartProducts.map((product) => (
      <OrderProduct key={product.name} product={product} onAdd={onAdd} onRemove={onRemove} />
    ));
  }

  function totalPrice() {
    let price = 0;
    cartProducts.forEach(
      (product) => (price += (product.price || 0) * (product.quantity || 1))
    );
    return price.toFixed(2);
  }

  function onSend() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: "DF857FE5shTIbyrQAUjjzTBcrR32",
        products: cartProducts,
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
          {cartProducts?.length ? (
            <>
              {" "}
              <div className="productsList">{renderOrderProducts()}</div>
              <div className="additionalInfo">
                <div className="additionalInfoTitle">
                  {`פרטים נוספים (אופציונלי):`}
                </div>
                <textarea
                  className="additionalInfoText"
                  placeholder="פרטים נוספים..."
                  onChange={onTextChange}
                  value={additionalTextInput}
                />
              </div>
              <OrderFooter
                className="footer"
                onSend={onSend}
                price={totalPrice()}
              />
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
