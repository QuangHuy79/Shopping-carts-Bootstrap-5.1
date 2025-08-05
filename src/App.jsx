import "./App.css";
import ShoppingCartTemplate from "./components/shoppingCartTemplate";
import CardDetails from "./components/CardDetails/CardDetails";
import AfterPay from "./components/CardDetails/AfterPay";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <h1>Shopping carts-Bootstrap 5.1</h1>
      <Routes>
        <Route path="/" element={<ShoppingCartTemplate />} />
        <Route path="/CardDetails" element={<CardDetails />} />
        <Route path="/AfterPay" element={<AfterPay />} />
      </Routes>
    </>
  );
}

export default App;
