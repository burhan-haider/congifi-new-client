import React from "react";
import { TextField } from "@mui/material";
import { withFormsy } from "formsy-react";
import _ from "lodash";

function TextFieldFormsy(props) {
  const importedProps = _.pick(props, [
    "autoComplete",
    "autoFocus",
    "children",
    "className",
    "classes",
    "defaultValue",
    "disabled",
    "FormHelperTextProps",
    "fullWidth",
    "id",
    "InputLabelProps",
    "inputProps",
    "InputProps",
    "inputRef",
    "label",
    "multiline",
    "name",
    "onBlur",
    "onChange",
    "onFocus",
    "placeholder",
    "required",
    "rows",
    "rowsMax",
    "select",
    "SelectProps",
    "type",
    "variant",
    "select"
  ]);

  const { errorMessage } = props;
  const value = props.value || "";

  function changeValue(event) {
    props.setValue(event.currentTarget.value);
    if (props.onChange) {
      props.onChange(event);
    }
  }

  return (
    <TextField
      {...importedProps}
      onChange={changeValue}
      className="w-full"
      value={value}
      error={Boolean(props.showError && errorMessage)}
      helperText={props.showError && errorMessage ? errorMessage : undefined}
    />
  );
}

export default React.memo(withFormsy(TextFieldFormsy));
