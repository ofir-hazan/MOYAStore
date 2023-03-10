import React, { useContext } from "react";
import "./OrderProduct.css";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CartContext } from "../../Contexts/cartContext";

function OrderProduct(props) {
  const { editable = true, onAdd, onRemove } = props;
  const { name, description, image, price, quantity = 1 } = props.product;

  const increaseAmount = () => {
    onAdd(props.product);
  };

  const decreaseAmount = () => {
    onRemove(props.product);
  };

  return (
    <div className="orderProductContainer">
      <div className="productDescription">
        <div className="productName">{name}</div>
        <div className="productDesc">{description}</div>
        <div className="productPrice">
          {`${(price * quantity).toFixed(2)} ₪`}
        </div>
      </div>
      <div className="productPictureContainer">
        <img className="productPicture" src={image} />
        <div>
          {editable ? (
            <IconButton size="small" onClick={increaseAmount}>
              <AddIcon fontSize="inherit" />
            </IconButton>
          ) : null}

          {quantity}
          {editable ? (
            <IconButton size="small" onClick={decreaseAmount}>
              <RemoveIcon fontSize="inherit" />
            </IconButton>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default OrderProduct;
