import React, { useContext } from "react";
import "./Catalog.css";
import Product from "../../Components/Product/Product";
import { ReactComponent as CartIcon } from "../../resources/cart.svg";
import { Link } from "react-router-dom";
import { CartContext } from "../../Contexts/cartContext";

function Catalog(props) {
  const { onAdd } = useContext(CartContext);
  const { products } = props;

  function renderProducts() {
    return products.map((product) => (
      <Product
        key={product.id}
        product={product}
        onAdd={() => onAdd(product)}
      />
    ));
  }

  return (
    <div className="products">
      <div className="productsHeader">
        <div className="productsTitle">רשימת מוצרים</div>
        {/* <Link to="/cart">
          <div className="cart">
            <CartIcon height={30} width={30} />
          </div>
        </Link> */}
      </div>
      <div className="productsList">
        {products?.length ? (
          <> {renderProducts()}</>
        ) : (
          <div className="catalogNoProducts">אין מוצרים בקטלוג!</div>
        )}
      </div>
    </div>
  );
}

export default Catalog;
