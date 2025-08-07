import "./App.css";
import ShoppingCartTemplate from "./components/shoppingCart/shoppingCartTemplate";
import CardDetails from "./components/CardDetails/CardDetails";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import AfterPay from "./components/CardDetails/AfterPay";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useCart } from "./components/context/CartContext"; // ✅ thêm dòng này

// function App() {
//   return (
//     <>
//       <h1>Shopping carts-Bootstrap 5.1</h1>
//       <Routes>
//         <Route path="/" element={<ProductDetail />} />
//         <Route
//           path="/ShoppingCartTemplate"
//           element={<ShoppingCartTemplate />}
//         />
//         <Route path="/CardDetails" element={<CardDetails />} />
//         <Route path="/AfterPay" element={<AfterPay />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

function App() {
  const { isCartOpen } = useCart(); // ✅ lấy từ context
  return (
    <>
      <h1 className="text-center my-4">Shopping carts - Bootstrap 5.1</h1>
      <Routes>
        <Route path="/" element={<ProductDetail />} />
        <Route path="/CardDetails" element={<CardDetails />} />
        <Route path="/AfterPay" element={<AfterPay />} />
      </Routes>
      {isCartOpen && <ShoppingCartTemplate />}
    </>
  );
}

export default App;
