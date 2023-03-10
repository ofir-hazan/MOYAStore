import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Catalog from "./pages/Catalog/Catalog";
import Cart from "./pages/Cart/Cart";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./Contexts/GlobalContext";
import SignUp from "./pages/SignInUp/SignUp";
import SignIn from "./pages/SignInUp/SignIn";
import Navbar from "./Components/Navbar/navbar";
import SuppliiersPage from "./pages/suppliers/suppliersPage";
import AddProductPage from "./pages/addProduct/addProducr";
import OrdersPage from "./pages/orders/orders";
import { CartContextProvider } from "./Contexts/cartContext";
import useSocket from "./customHooks/useSocket";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const { setActiveUsersAmt, shouldReload, setShouldReload, catalogProducts, setCatalogProducts } = useContext(GlobalContext);
  const { socket } = useSocket();

  useEffect(() => {
    fetch("http://localhost:3001/products/all")
      .then((res) => res.json())
      .then((data) => {
        setCatalogProducts(data);
      })
      .catch((err) => console.log(err));

    socket.on("signedIn", (amount) => {
      setActiveUsersAmt(amount);
    });

    return () => {
      socket.off("signedIn");
    };
  }, []);

  useEffect(() => {
    if (shouldReload) {
      fetch("http://localhost:3001/products/all")
        .then((res) => res.json())
        .then((data) => {
          setCatalogProducts(data);
        })
        .catch((err) => console.log(err));

      setShouldReload(false);
    }
  }, [shouldReload]);

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
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Catalog />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<div>wrong</div>} />
              <Route path="signIn" element={<SignIn />} />
              <Route path="signUp" element={<SignUp />} />
              <Route
                path="suppliers"
                element={
                  <ProtectedRoute admin={true}>
                    <SuppliiersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="addProduct"
                element={
                  <ProtectedRoute admin={true}>
                    <AddProductPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="orders"
                element={
                  <ProtectedRoute>
                    <OrdersPage catalogProducts={catalogProducts} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
