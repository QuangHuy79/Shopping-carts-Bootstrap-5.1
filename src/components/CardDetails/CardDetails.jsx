import React from "react";
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
function CardDetails() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { initialValues, validationSchema } = formikProps;
  const subtotalFromCart = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const onSubmit = (values, { resetForm }) => {
    const { total } = calculateOrder(values);
    const payload = {
      customer: values,
      cart: cartItems,
      total,
    };

    console.log("🚀 Gửi đơn hàng:", payload);
    alert("✅ Đặt hàng thành công!");

    clearCart();
    resetForm();
  };
  return (
    <div className="container py-5">
      {" "}
      {/* ✅ THÊM */}
      <div className="card bg-primary text-white rounded-3 ">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Card details</h5>
            <img
              src={Image01}
              className="img-fluid rounded-3"
              style={{ width: 45 }}
              alt="Avatar"
            />
          </div>
          <label htmlFor="cardType" className="form-label text-white mb-4">
            Card Type
          </label>
          <select
            id="cardType"
            name="cardType"
            className="form-select"
            // value={values.cardType}
            // onChange={handleChange}
          >
            <option value="">-- Select card type --</option>
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="amex">American Express</option>
            <option value="paypal">Paypal</option>
          </select>
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
                      label="Cardholder's Name"
                      id="cardholderName"
                      type="text"
                      placeholder="Cardholder's Name"
                    />

                    <FieldInputCardDetails
                      name="cardNumber"
                      label="Card Number"
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3457"
                    />

                    <div className="row mb-4">
                      <div className="col-md-6">
                        <FieldInputCardDetails
                          name="exp"
                          label="Expiration"
                          id="exp"
                          type="text"
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div className="col-md-6">
                        <FieldInputCardDetails
                          name="cvv"
                          label="CVV"
                          id="cvv"
                          type="text"
                          placeholder="●●●"
                        />
                      </div>
                    </div>

                    {/* Input Quantity */}
                    {/* <div className="mb-3">
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
                        min="1"
                        value={values?.quantity || ""}
                        onChange={handleChange}
                      />
                      {touched.quantity && errors.quantity ? (
                        <div className="text-warning">{errors.quantity}</div>
                      ) : null}
                    </div> */}
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
                    <button type="submit" className="btn btn-info">
                      Checkout{" "}
                      <i className="fas fa-long-arrow-alt-right ms-2" />
                    </button>
                  </div>
                </Form>
              );
            }}
          </FormikWrapper>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
