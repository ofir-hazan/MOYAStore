import React from "react";
import "./Catalog.css";
import Product from "../../Components/Product/Product";
import { ReactComponent as CartIcon } from "../../resources/cart.svg";
import { Link } from "react-router-dom";

function Catalog(props) {
  const { onAdd, products } = props;

  function renderProducts() {
    return products.map((product) => (
      <div key={product.name}>
        <Product product={product} onAdd={() => onAdd(product)} />
      </div>
    ));
  }
  return (
    <div className="products">
      <div className="productsHeader">
        <div className="productsTitle">רשימת מוצרים</div>
        <Link to="/cart">
          <div className="cart">
            <CartIcon height={30} width={30} />
          </div>
        </Link>
      </div>
      {products?.length ? (
        <> {renderProducts()}</>
      ) : (
        <div className="catalogNoProducts">אין מוצרים בקטלוג!</div>
      )}
    </div>
  );
}

export default Catalog;
