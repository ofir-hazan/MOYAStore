import React from "react";
import "./Product.css";
import { ReactComponent as AddIcon } from "../../resources/add.svg";

function Product(props) {
  const { onAdd, product } = props;
  const { name, description, picture, price } = product;
  return (
    <div className="productContainer">
      <div className="productDescription">
        <div className="productName">{name}</div>
        <div className="productDesc">{description}</div>
        <div className="productPrice">{`${price.toFixed(2)} ₪`}</div>
      </div>
      <div className="productPictureContainer" onClick={onAdd}>
        <img className="productPicture" src={picture} />
        <AddIcon height={30} width={30} className="productAddIcon" />
      </div>
    </div>
  );
}

export default Product;
