import React, { useContext, useState } from "react";
import OrderProduct from "../../Components/OrderProduct/OrderProduct";
import { ReactComponent as BackIcon } from "../../resources/back.svg";
import { Link } from "react-router-dom";
import "./Cart.css";
import OrderFooter from "../../Components/OrderFooter/OrderFooter";
import { CartContext } from "../../Contexts/cartContext";
import { GlobalContext } from "../../Contexts/GlobalContext";

function Cart() {
  const { cartProducts, clearProducts, onAdd, onRemove } =
    useContext(CartContext);
  const { connectedUser } = useContext(GlobalContext);
  const [additionalTextInput, setAdditionalTextInput] = useState("");
  const [isSuccessfullySent, setIsSuccessfullySent] = useState(undefined);

  function renderOrderProducts() {
    return cartProducts.map((product) => (
      <OrderProduct
        key={product.name}
        product={product}
        onAdd={onAdd}
        onRemove={onRemove}
      />
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
        <div className="cartTitle">Cart </div>
      </div>
      {isSuccessfullySent === undefined ? (
        <>
          {cartProducts?.length ? (
            <>
              {" "}
              <div className="OrderProductsList">{renderOrderProducts()}</div>
              <div className="additionalInfo">
                <div className="additionalInfoTitle">
                  {`More detailes (optional)`}
                </div>
                <textarea
                  className="additionalInfoText"
                  placeholder="More detailes ..."
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
            <div className="cartNoProducts">Your cart is empty!</div>
          )}
        </>
      ) : (
        <div className="cartNoProducts">
          {isSuccessfullySent
            ? "Your order has been sent successfully"
            : "Sorry, there was a problem saving your order :("}
        </div>
      )}
    </div>
  );
}

export default Cart;
