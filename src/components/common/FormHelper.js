import { useState } from "react";

export const FormHelper = initialValues => {
  const [formValues, setFormValues] = useState(initialValues);
  return [
    formValues,
    e => {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value
      });
    }
  ];
};
