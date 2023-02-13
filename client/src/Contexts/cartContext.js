import { createContext, useState } from "react";
export const CartContext = createContext();

export const CartContextProvider = (props) => {
  const [cartProducts, setCartProducts] = useState([]);

  function onAdd(productAdded) {
    let newCartProducts = [...cartProducts];
    let exsitingProduct = newCartProducts.find(
      (product) => product.name === productAdded.name
    );
    if (exsitingProduct) {
      exsitingProduct.quantity++;
    } else {
      newCartProducts.push({ ...productAdded, quantity: 1 });
    }
    setCartProducts(newCartProducts);
  }

  function onRemove(productRemoved) {
    let newCartProducts = [...cartProducts];
    let exsitingProduct = newCartProducts.find(
      (product) => product.name === productRemoved.name
    );
    if (exsitingProduct) {
      if (exsitingProduct.quantity === 1) {
        newCartProducts = newCartProducts.filter(
          (product) => product.name !== productRemoved.name
        );
      } else {
        exsitingProduct.quantity--;
      }
    } else {
      console.log("there was a problam");
    }
    setCartProducts(newCartProducts);
  }

  function clearProducts() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts: cartProducts,
        onAdd: onAdd,
        onRemove: onRemove,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
