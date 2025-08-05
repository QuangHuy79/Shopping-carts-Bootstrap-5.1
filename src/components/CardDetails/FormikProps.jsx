import * as Yup from "yup";
import { calculateOrder } from "./orderUtils";

const initialValues = {
  cardholderName: "",
  cardNumber: "",
  PhoneNumber: "",
  exp: "",
  cvv: "",
  quantity: 1,
  shippingMethod: "standard",
  cardType: "",
};

const validationSchema = Yup.object({
  cardholderName: Yup.string()
    .matches(/^[A-Za-z\s'-]+$/, "Tên không hợp lệ")
    .required("Bắt buộc"),
  cardNumber: Yup.string()
    .matches(/^[0-9]{16}$/, "Số thẻ phải gồm 16 chữ số")
    .required("Bắt buộc"),
  PhoneNumber: Yup.string()
    .matches(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ") // bắt đầu bằng 0 và theo sau là 9 số
    .required("Bắt buộc"),
  exp: Yup.string()
    .required("Bắt buộc")
    .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, "Định dạng không hợp lệ (MM/YYYY)"),
  cvv: Yup.string()
    .required("Bắt buộc")
    .matches(/^\d{3,4}$/, "CVV phải là 3 hoặc 4 số"),
  quantity: Yup.number().required("Bắt buộc").min(1, "Tối thiểu là 1 sản phẩm"),
  shippingMethod: Yup.string()
    .required("Chọn phương thức giao hàng")
    .oneOf(["standard", "express"], "Không hợp lệ"),
});

const onSubmit = (values) => {
  const { total } = calculateOrder(values);
  console.log("Tổng:", total);
  console.log("Giá trị form:", values);
};

export const formikProps = {
  initialValues,
  validationSchema,
  onSubmit,
};
