// import React from "react";
// import { MDBInput } from "mdb-react-ui-kit";
// import Image01 from "../assets/Image01.jpg";
// function ItemDetails() {
//   return (
//     <div>
//       <div className="card mb-4 card bg-secondary text-white rounded-3 shadow p-3">
//         <div className="card-body border border-white rounded-3">
//           <div className="d-flex justify-content-between">
//             <div className="d-flex flex-row align-items-center">
//               <div>
//                 <img
//                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
//                   className="img-fluid rounded-3"
//                   alt="Shopping item"
//                   style={{ width: 65 }}
//                 />
//               </div>
//               <div className="ms-3">
//                 <h5>Iphone 11 pro</h5>
//                 <p className="small mb-0">256GB, Navy Blue</p>
//               </div>
//             </div>
//             <div className="d-flex flex-row align-items-center">
//               <div style={{ width: 50 }}>
//                 <h5 className="fw-normal mb-0">2</h5>
//               </div>
//               <div style={{ width: 80 }}>
//                 <h5 className="mb-0">$900</h5>
//               </div>
//               <a href="#!" style={{ color: "#cecece" }}>
//                 <i className="fas fa-trash-alt text-white" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ItemDetails;

// ============================
// ***** Thêm CartContext *****

// import React from "react";

// function ItemDetails({ item }) {
//   // const { name, quantity, price, image, description } = item;
//   const { title, quantity = 1, price, image, description } = item;

//   return (
//     <div className="card mb-4 card bg-secondary text-white rounded-3 shadow p-3">
//       <div className="card-body border border-white rounded-3">
//         <div className="d-flex justify-content-between">
//           <div className="d-flex flex-row align-items-center">
//             <div>
//               <img
//                 src={image || "https://via.placeholder.com/65"}
//                 className="img-fluid rounded-3"
//                 alt="Shopping item"
//                 style={{ width: 65 }}
//               />
//             </div>
//             <div className="ms-3">
//               <h5>{title}</h5>
//               <p className="small mb-0">{description || "No description"}</p>
//             </div>
//           </div>
//           <div className="d-flex flex-row align-items-center">
//             <div style={{ width: 50 }}>
//               <h5 className="fw-normal mb-0">{quantity}</h5>
//             </div>
//             <div style={{ width: 80 }}>
//               <h5 className="mb-0">${price}</h5>
//             </div>
//             <a href="#!" style={{ color: "#cecece" }}>
//               <i className="fas fa-trash-alt text-white" />
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ItemDetails;

import React from "react";
import { useCart } from "../context/CartContext"; // 🟢 Lấy hàm removeFromCart

function ItemDetails({ item }) {
  const { removeFromCart, updateQuantity } = useCart(); // 🟢 Hook để xoá

  const { id, title, quantity = 1, price, image, description } = item;
  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeFromCart(id); // Nếu giảm về 0 thì xoá luôn
    }
  };

  const handleIncrease = () => {
    updateQuantity(id, quantity + 1);
  };
  return (
    <div className="card mb-4 card bg-secondary text-white rounded-3 shadow p-3">
      <div className="card-body border border-white rounded-3">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <div>
              <img
                src={image || "https://via.placeholder.com/65"}
                className="img-fluid rounded-3"
                alt="Shopping item"
                style={{ width: 65 }}
              />
            </div>
            <div className="ms-3">
              <h5>{title}</h5>
              <p className="small mb-0">{description || "No description"}</p>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center">
            <div className="d-flex align-items-center me-3">
              <button
                className="btn btn-sm btn-light me-1"
                onClick={handleDecrease}
              >
                −
              </button>
              <span className="fw-bold">{quantity}</span>
              <button
                className="btn btn-sm btn-light ms-1"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
            <div style={{ width: 100 }}>
              <h5 className="mb-0">${(price * quantity).toFixed(2)}</h5>
            </div>
            <button
              onClick={() => removeFromCart(id)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
              title="Remove item"
            >
              <i className="fas fa-trash-alt text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
