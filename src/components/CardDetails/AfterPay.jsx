import React, { useState } from "react"; // ✅ đúng cú pháp
import FieldInputCardDetails from "./FieldInputCardDetails";
import CardTypeSelector from "./CardTypeSelector";
import { calculateOrder } from "./orderUtils"; // <-- import hàm tính toán
import { Formik, Form } from "formik";
import FormikWrapper from "./FormikWrapper";
import Image01 from "../../assets/Image01.jpg";
import * as Yup from "yup";
import { formikProps } from "./FormikProps";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ⬅️ thêm dòng này
import ThanksToast from "../ThanksToast/ThanksToast";
import { submitOrder } from "../../api/ordersApi";
function AfterPay() {
  const navigate = useNavigate();
  const { initialValues, validationSchema } = formikProps;
  const { cartItems, clearCart } = useCart();
  const [showThanks, setShowThanks] = useState(false);
  const subtotalFromCart = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const handlePay = () => {
    // ✅ xử lý thanh toán ở đây
    setShowThanks(true);
    setTimeout(() => setShowThanks(false), 3000);
  };

  const onSubmit = async (values, { resetForm }) => {
    const { total } = calculateOrder(values);

    const orderData = {
      customer: values,
      cart: cartItems,
      total,
      createdAt: new Date().toISOString(),
    };

    console.log("📦 GỬI ĐƠN HÀNG:", orderData);

    try {
      await submitOrder(orderData);
      console.log("✅ Gửi đơn hàng thành công");
      setShowThanks(true);
      setTimeout(() => setShowThanks(false), 3000); // ✅ thêm timeout ở đây
      clearCart();
      resetForm();
    } catch (error) {
      alert("❌ Gửi đơn hàng thất bại!");
      console.error("❌ Lỗi submitOrder:", error);
    }
  };

  return (
    <div className="container py-5">
      {" "}
      {/* ✅ THÊM */}
      <div className="card bg-primary text-white rounded-3 ">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Your Information</h5>

            <img
              src={Image01}
              className="img-fluid rounded-3"
              style={{ width: 45 }}
              alt="Avatar"
            />
          </div>

          <FormikWrapper
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, errors, touched, handleChange }) => {
              // const { subtotal, shipping, total } = calculateOrder(values);
              const subtotal = subtotalFromCart;
              const shipping =
                values.shippingMethod === "express"
                  ? 20
                  : values.shippingMethod === "standard"
                  ? 10
                  : 0;
              const total = subtotal + shipping;

              return (
                <Form>
                  <div className="mt-4">
                    <FieldInputCardDetails
                      name="cardholderName"
                      label="Address"
                      id="cardholderName"
                      type="text"
                      placeholder="Address"
                    />

                    <FieldInputCardDetails
                      name="PhoneNumber"
                      label="PhoneNumber"
                      id="PhoneNumber"
                      type="text"
                      placeholder="PhoneNumber"
                    />

                    {/* Input Quantity - Tự động lấy từ giỏ hàng */}
                    <div className="mb-3">
                      <label
                        htmlFor="quantity"
                        className="form-label text-white"
                      >
                        Quantity
                      </label>
                      <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        className="form-control"
                        value={cartItems.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}
                        readOnly
                      />
                    </div>

                    {/* Select Shipping Method */}
                    <div className="mb-4">
                      <label
                        htmlFor="shippingMethod"
                        className="form-label text-white"
                      >
                        Shipping Method
                      </label>
                      <select
                        id="shippingMethod"
                        name="shippingMethod"
                        className="form-select"
                        value={values?.shippingMethod || ""}
                        onChange={handleChange}
                      >
                        <option value="standard">Standard ($10)</option>
                        <option value="express">Express ($20)</option>
                      </select>
                      {touched.shippingMethod && errors.shippingMethod ? (
                        <div className="text-warning">
                          {errors.shippingMethod}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Phần tính toán subtotal, shipping, total */}
                  <hr className="my-4" />
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Subtotal</p>
                    <p className="mb-2">${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Shipping</p>
                    <p className="mb-2">${shipping.toFixed(2)}</p>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <p className="mb-2">Total (Incl. taxes)</p>
                    <span className="mb-2">
                      <strong>${total.toFixed(2)}</strong>
                    </span>
                  </div>

                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-info"
                      onClick={() => navigate("/")}
                    >
                      <i className="fas fa-long-arrow-alt-left me-2" />
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn btn-info"
                      onClick={handlePay}
                    >
                      <i className="fas fa-credit-card me-2" />
                      Submit Payment
                    </button>
                  </div>
                </Form>
              );
            }}
          </FormikWrapper>
          {/* ✅ Popup cảm ơn */}
          <ThanksToast show={showThanks} onClose={() => setShowThanks(false)} />
        </div>
      </div>
    </div>
  );
}

export default AfterPay;
