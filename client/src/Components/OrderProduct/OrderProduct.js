import React, { useContext } from "react";
import "./OrderProduct.css";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CartContext } from "../../Contexts/cartContext";

function OrderProduct(props) {
  const { onAdd, onRemove } = useContext(CartContext);
  const { name, description, image, price, quantity = 1 } = props.product;

  const increaseAmount = () => {
    onAdd(props.product);
  };

  const decreaseAmount = () => {
    onRemove(props.product);
  };

  return (
    <div className="productContainer">
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
          <IconButton size="small" onClick={increaseAmount}>
            <AddIcon fontSize="inherit" />
          </IconButton>
          {quantity}
          <IconButton size="small" onClick={decreaseAmount}>
            <RemoveIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default OrderProduct;
