import React from "react";
import { products } from "../../fakeData";
import SingleProduct from "./singleProduct";

const HomePage = () => {
  let ProductsList = products.map((product, i) => {
    return (
      <SingleProduct
        key={i}
        productName={product.name}
        price={product.price}
        imgSrc={product.imgUrl}
      />
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"> {ProductsList} </div>
      </div>
    </div>
  );
};

export default HomePage;
