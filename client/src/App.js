import './App.css';
import HomePage from './pages/Home/homePage'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Catalog from "./pages/Catalog/Catalog";
import Cart from "./pages/Cart/Cart";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from './Contexts/GlobalContext';

function App() {
  const [catalogProducts, setCatalogProducts] = useState([]);
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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <Outlet />
            </div>
          }
        >
          <Route
            index
            element={<Catalog products={catalogProducts} onAdd={onAdd} />}
          />
          <Route path="cart" element={<Cart products={cartProducts} clearProducts={() => setCartProducts([])} />} />
          <Route path="*" element={<div>wrong</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  // return (
  //   <HomePage />
  // );
}

export default App;
