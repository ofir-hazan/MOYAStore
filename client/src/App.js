import "./App.css";
import { BrowserRouter, Routes, Route, Outlet, Router } from "react-router-dom";
import Catalog from "./pages/Catalog/Catalog";
import Cart from "./pages/Cart/Cart";
import { products } from "./fakeData";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./Contexts/GlobalContext";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Navbar from "./Components/Navbar/navbar";
import SuppliiersPage from "./pages/suppliers/suppliersPage";
import AddProductPage from "./pages/addProduct/addProducr";
import OrdersPage from "./pages/orders/orders";

function App() {
  const [catalogProducts, setCatalogProducts] = useState(products);
  const { connectedUser } = useContext(GlobalContext);
  useEffect(() => {
    fetch("http://localhost:3001/products/all")
      .then((res) => res.json())
      .then((data) => {
        setCatalogProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const [cartProducts, setCartProducts] = useState([]);

  function onAdd(newProduct) {
    let newCartProducts = [...cartProducts];
    let exsitingProduct = newCartProducts.find(
      (product) => product.name === newProduct.name
    );
    if (exsitingProduct) {
      exsitingProduct.quantity++;
    } else {
      newCartProducts.push({ ...newProduct, quantity: 1 });
    }
    setCartProducts(newCartProducts);
    console.log(newCartProducts);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="App">
                <Outlet />
              </div>
            }
          />
          <Route
            index
            element={<Catalog products={catalogProducts} onAdd={onAdd} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                products={cartProducts}
                clearProducts={() => setCartProducts([])}
              />
            }
          />
          <Route path="*" element={<div>wrong</div>} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="suppliers" element={<SuppliiersPage />} />
          <Route path="addProduct" element={<AddProductPage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
