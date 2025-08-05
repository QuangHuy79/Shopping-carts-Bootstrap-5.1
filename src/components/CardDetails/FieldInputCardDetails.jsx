import React from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { useField } from "formik";

function FieldInputCardDetails({
  name,
  label,
  id,
  type,
  placeholder,
  ...rest
}) {
  const [field, meta] = useField(name);

  return (
    <div className="mb-4">
      <MDBInput
        {...field}
        {...rest}
        label={label}
        id={id}
        type={type}
        size="lg"
        placeholder={placeholder}
        contrast
      />
      {meta.touched && meta.error && (
        <div className="text-danger mt-1" style={{ fontSize: "1rem" }}>
          {meta.error}
        </div>
      )}
    </div>
  );
}

export default FieldInputCardDetails;
