// ===============================
// ***** Đưa dữ liệu lên Api *****

import React from "react";
import { Formik } from "formik";

function FormikWrapper({
  initialValues,
  validationSchema,
  onSubmit,
  children,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => children(formikProps)}
    </Formik>
  );
}

export default FormikWrapper;
