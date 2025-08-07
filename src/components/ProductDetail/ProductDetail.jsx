import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

// Nếu có dữ liệu động thì dùng đoạn này
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
function ProductDetail() {
  const product = {
    id: "1",
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    image: "assets/images/product1.jpg",
    description: "Your perfect pack for everyday use.",
  };
  // Nếu có dữ liệu động thì dùng đoạn này
  // const { id } = useParams();
  // const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  // Nếu có dữ liệu động thì dùng đoạn này
  // useEffect(() => {
  //   axios
  //     .get(`https://fakestoreapi.com/products/${id}`)
  //     .then((res) => setProduct(res.data))
  //     .catch((err) => console.error("Lỗi khi gọi API chi tiết:", err));
  // }, [id]);

  // if (!product) return <p>Đang tải...</p>;

  return (
    <div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 ">
            <div className="card shadow p-4 ">
              <h3 className="text-center mb-4">Product Detail</h3>
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid mb-3 w-50 mx-auto d-block "
              />
              <p className="mt-3">
                <strong>{product.title}</strong>
              </p>
              <p className="text-muted">{product.description}</p>
              <strong className="text-danger">${product.price}</strong>

              {/* 2 nút cùng hàng, căn trái phải */}
              <div className="d-flex justify-content-between mt-4">
                <button
                  className="btn  btn-info mt-3"
                  onClick={() => navigate("/")}
                >
                  <i className="fas fa-long-arrow-alt-left me-2" />
                  Continue Shopping
                </button>
                <button
                  className="btn  btn-info mt-3"
                  onClick={() => {
                    addToCart({
                      id: product.id,
                      image: product.image,
                      title: product.title,
                      price: product.price,
                      quantity: 1, // bạn có thể cho chọn sau
                    });
                    openCart(); // ✅ mở overlay giỏ hàng
                  }}
                >
                  <i className="bi bi-cart-plus me-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
