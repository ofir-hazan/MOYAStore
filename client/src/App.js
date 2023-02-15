import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Catalog from "./pages/Catalog/Catalog";
import Cart from "./pages/Cart/Cart";
import { products } from "./fakeData";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./Contexts/GlobalContext";
import SignUp from "./pages/SignInUp/SignUp";
import SignIn from "./pages/SignInUp/SignIn";
import Navbar from "./Components/Navbar/navbar";
import SuppliiersPage from "./pages/suppliers/suppliersPage";
import AddProductPage from "./pages/addProduct/addProducr";
import OrdersPage from "./pages/orders/orders";
import { CartContextProvider } from "./Contexts/cartContext";

function App() {
  const [catalogProducts, setCatalogProducts] = useState(products);
  const { connectedUser, setActiveUsersAmt, socket } =
    useContext(GlobalContext);
  useEffect(() => {
    fetch("http://localhost:3001/products/all")
      .then((res) => res.json())
      .then((data) => {
        setCatalogProducts(data);
      })
      .catch((err) => console.log(err));

    socket.on("signedIn", (amount) => {
      console.log(amount);
      setActiveUsersAmt(amount);
    });

    return () => {
      socket.off("signedIn");
    };
  }, []);

  return (
    <div className="App">
      <CartContextProvider>
        <BrowserRouter>
          <Navbar />
          <div className="routes">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="App">
                    <Outlet />
                  </div>
                }
              />
              <Route index element={<Catalog products={catalogProducts} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<div>wrong</div>} />
              <Route path="signIn" element={<SignIn />} />
              <Route path="signUp" element={<SignUp />} />
              <Route path="suppliers" element={<SuppliiersPage />} />
              <Route path="addProduct" element={<AddProductPage />} />
              <Route
                path="orders"
                element={<OrdersPage catalogProducts={catalogProducts} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
