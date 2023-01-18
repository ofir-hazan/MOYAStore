import React from "react";

const SingleProduct = (props) => {
  // productName price imgSrc
  return (
    <div className="card">
      <img src={props.imgSrc} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.productName}</h5>
        <p className="card-text">price: {props.price} </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
};

export default SingleProduct;
