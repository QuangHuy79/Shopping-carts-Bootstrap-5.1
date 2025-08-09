import React from "react";
import FieldInputCardDetails from "./FieldInputCardDetails";
import CardTypeSelector from "./CardTypeSelector";
// import { calculateOrder } from "./orderUtils";
import { Formik, Form } from "formik";
import FormikWrapper from "./FormikWrapper";
import Image01 from "../../assets/Image01.jpg";
import { calculateOrderFromCart } from "./orderUtils"; // hàm mới
import { useCart } from "../context/CartContext"; // lấy cartItems
import { submitOrder } from "../../api/ordersApi";
import { toast } from "react-toastify";
// import { formikProps } from "./FormikProps"; // lấy initialValues + validationSchema

function CardDetails({ initialValues, validationSchema }) {
  const { cartItems, clearCart } = useCart();
  return (
    <div className="card bg-primary text-white rounded-3 w-100">
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

        <FormikWrapper
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            const { total } = calculateOrderFromCart(
              cartItems,
              values.shippingMethod
            );

            const orderData = {
              ...values,
              cartItems,
              total,
              createdAt: new Date().toISOString(),
            };
            try {
              await submitOrder(orderData);
              toast.success("✅ Đặt hàng thành công!");

              clearCart(); // ✅ xoá giỏ hàng sau khi đặt xong
              actions.resetForm(); // reset form
            } catch (error) {
              toast.error("❌ Đặt hàng thất bại!");
              console.error(error);
            }
          }}
        >
          {({ values, errors, touched, handleChange }) => {
            const { subtotal, shipping, total } = calculateOrderFromCart(
              cartItems,
              values.shippingMethod
            );
            return (
              <Form>
                <div className="mt-4 text-start">
                  {/* --- Card Type Icons --- */}
                  <div className="mb-4 ">
                    <label htmlFor="cardType" className="form-label text-white">
                      Card Type
                    </label>
                    <select
                      id="cardType"
                      name="cardType"
                      className="form-select"
                      value={values.cardType}
                      onChange={handleChange}
                    >
                      <option value="">-- Select card type --</option>
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                      <option value="amex">American Express</option>
                      <option value="paypal">Paypal</option>
                    </select>
                    {touched.cardType && errors.cardType && (
                      <div className="text-warning">{errors.cardType}</div>
                    )}
                  </div>

                  {/* --- Card Inputs --- */}
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

                  <div className="row mb-4 text-start">
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

                  <div className="mb-4">
                    <p className="text-white fw-bold">Order Summary</p>
                    <ul className="list-group">
                      {cartItems.map((item) => (
                        <li
                          key={item.id}
                          className="list-group-item d-flex justify-content-between bg-transparent text-white border-white"
                        >
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Shipping Method */}
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
                      value={values.shippingMethod}
                      onChange={handleChange}
                    >
                      <option value="standard">Standard ($10)</option>
                      <option value="express">Express ($20)</option>
                    </select>
                    {touched.shippingMethod && errors.shippingMethod && (
                      <div className="text-warning">
                        {errors.shippingMethod}
                      </div>
                    )}
                  </div>
                </div>

                {/* Tính toán tổng */}
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
                  <p className="mb-2">${total.toFixed(2)}</p>
                </div>

                <button type="submit" className="btn btn-info btn-block btn-lg">
                  <div className="d-flex justify-content-between">
                    <span>${total.toFixed(2)}</span>
                    <span>
                      Checkout{" "}
                      <i className="fas fa-long-arrow-alt-right ms-2" />
                    </span>
                  </div>
                </button>
              </Form>
            );
          }}
        </FormikWrapper>
      </div>
    </div>
  );
}

export default CardDetails;
