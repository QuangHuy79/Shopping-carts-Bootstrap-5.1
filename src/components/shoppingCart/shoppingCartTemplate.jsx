// import React from "react";
// import ItemDetails from "./ItemDetails";
// import FieldInputCardDetails from "./CardDetails/FieldInputCardDetails";
// import CardDetails from "./CardDetails/CardDetails";
// import { MDBInput } from "mdb-react-ui-kit";
// // import { formikProps } from "./CardDetails/FormikProps";
// import { useNavigate } from "react-router-dom";
// function ShoppingCartTemplate() {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
//         <div className="container py-5 h-100 ">
//           <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col">
//               <div className="card bg-primary text-white rounded-3 ">
//                 <div className="card-body p-4 shadow p-3">
//                   <div className="row">
//                     <div>
//                       <h3 className="mb-4 ">
//                         <a href="#!" className="text-body btn btn-info ">
//                           <i className="fas fa-long-arrow-alt-left me-2 text-white" />
//                           <strong className="text-white">
//                             Continue shopping
//                           </strong>
//                         </a>
//                       </h3>
//                       <hr />
//                       <div className="d-flex justify-content-between align-items-center mb-4">
//                         <div>
//                           <h5 className="mb-1">Shopping cart</h5>
//                           <p className="mb-0">You have 4 items in your cart</p>
//                         </div>
//                       </div>
//                       <ItemDetails></ItemDetails>
//                     </div>
//                     <div className="row ">
//                       <div class="d-flex justify-content-evenly mt-4">
//                         <button
//                           href="#!"
//                           className="text-body btn btn-info "
//                           onClick={() => navigate("/AfterPay")}
//                         >
//                           <strong className="text-white">AfterPay</strong>
//                         </button>
//                         <button
//                           href="#!"
//                           className="text-body btn btn-info "
//                           onClick={() => navigate("/CardDetails")}
//                         >
//                           <strong className="text-white">Card</strong>
//                         </button>
//                       </div>
//                     </div>
//                     {/* <CardDetails {...formikProps} />; */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default ShoppingCartTemplate;

// ============================
// ***** Thêm CartContext *****

// import React, { useEffect } from "react";
import ItemDetails from "./ItemDetails";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./shoppingCartTemplate.css";
import { FaTimes } from "react-icons/fa";
function ShoppingCartTemplate() {
  const navigate = useNavigate();
  const { isCartOpen, cartItems, closeCart } = useCart();

  // 🟡 Tải dữ liệu từ API fake khi mở giỏ hàng
  // ❌ BỎ hoặc comment đoạn này khi đã có trang sản phẩm
  // useEffect(() => {
  //   if (isCartOpen && cartItems.length === 0) {
  //     fetch("http://localhost:5000/products?_limit=3") // lấy 3 sản phẩm mẫu thôi
  //       .then((res) => res.json())
  //       .then((data) => {
  //         data.forEach((product) => {
  //           addToCart(product); // gọi vào context
  //         });
  //       })
  //       .catch((err) => console.error("Failed to load products:", err));
  //   }
  // }, [isCartOpen]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay">
      <section>
        <div className="container py-5 h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card bg-primary text-white rounded-3 ">
                <div className="card-body p-4 shadow p-3 ">
                  <div className="row">
                    <div>
                      <h3 className="mb-4 d-flex justify-content-between ">
                        <button
                          className="text-body btn btn-info "
                          onClick={() => {
                            navigate("/");
                            closeCart();
                          }}
                        >
                          <i className="fas fa-long-arrow-alt-left me-2 text-white" />
                          <strong className="text-white">
                            Continue shopping
                          </strong>
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={closeCart}
                        >
                          <FaTimes />
                        </button>
                      </h3>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <h5 className="mb-1">Shopping cart</h5>

                          <h5 className="mb-0">
                            You have <strong>{totalItems}</strong> item
                            {totalItems !== 1 ? "s" : ""} in your cart
                          </h5>
                        </div>
                      </div>

                      {cartItems.length === 0 ? (
                        <p className="text-white">Your cart is empty.</p>
                      ) : (
                        cartItems.map((item, index) => (
                          <ItemDetails key={index} item={item} />
                        ))
                      )}
                    </div>

                    <div className="row ">
                      <div className="d-flex justify-content-evenly mt-4">
                        <button
                          className="text-body btn btn-info "
                          // onClick={() => navigate("/AfterPay")}
                          onClick={() => {
                            navigate("/AfterPay");
                            closeCart();
                          }}
                        >
                          <strong className="text-white">AfterPay</strong>
                        </button>
                        <button
                          className="text-body btn btn-info "
                          onClick={() => {
                            navigate("/CardDetails");
                            closeCart();
                          }}
                          // onClick={() => navigate("/CardDetails")}
                        >
                          <strong className="text-white">Card</strong>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  //   return (
  //     <div className="cart-overlay">
  //       <div className="cart-panel bg-primary text-white shadow p-4">
  //         <h3 className="mb-4 d-flex justify-content-between align-items-center">
  //           <span>Shopping cart</span>
  //           <button
  //             className="btn btn-sm btn-light text-dark"
  //             onClick={() => navigate("/")}
  //           >
  //             Continue shopping
  //           </button>
  //         </h3>
  //         <hr />
  //         <p>
  //           You have <strong>{totalItems}</strong> item
  //           {totalItems !== 1 ? "s" : ""} in your cart
  //         </p>
  //         <div
  //           className="cart-items mb-3"
  //           style={{ maxHeight: "60vh", overflowY: "auto" }}
  //         >
  //           {cartItems.length === 0 ? (
  //             <p className="text-muted">Your cart is empty.</p>
  //           ) : (
  //             cartItems.map((item, index) => (
  //               <ItemDetails key={index} item={item} />
  //             ))
  //           )}
  //         </div>
  //         <div className="d-flex justify-content-between">
  //           <button
  //             className="btn btn-light text-dark"
  //             onClick={() => navigate("/AfterPay")}
  //           >
  //             AfterPay
  //           </button>
  //           <button
  //             className="btn btn-light text-dark"
  //             onClick={() => navigate("/CardDetails")}
  //           >
  //             Card
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}
export default ShoppingCartTemplate;
