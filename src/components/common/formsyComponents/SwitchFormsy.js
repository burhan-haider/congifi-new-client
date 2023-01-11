import React, { useState } from "react";
import { withFormsy } from "formsy-react";
import _ from "lodash";
import { FormControlLabel } from "@mui/material";
// import { GenericSwitch } from "@application";

function SwitchFormsy(props) {
  const importedProps = _.pick(props, [
    "classes",
    "autoComplete",
    "autoFocus",
    "children",
    "className",
    "defaultValue",
    "disabled",
    "FormHelperTextProps",
    "fullWidth",
    "id",
    "InputLabelProps",
    "inputProps",
    "inputRef",
    "label",
    "name",
    "onBlur",
    "onChange",
    "onFocus",
    "placeholder",
    "required",
    "select",
    "SelectProps",
    "type"
  ]);

  const value = props.value;

  function changeValue(event) {
    props.setValue(event.target.checked);
    if (props.onChange) {
      props.onChange(event);
    }
  }

  return (
    <FormControlLabel
      {...importedProps}
      style={{
        backgroundColor: value ? "#052a4f" : "#f4f5fa",
        color: value ? "#fff" : "#353535"
      }}
      // control={
      //   // <Switch checked={value} onChange={changeValue} color="primary" />
      //   <GenericSwitch checked={value} onChange={changeValue} />
      // }
      label={props.label}
      labelPlacement="start"
    />
  );
}

export default React.memo(withFormsy(SwitchFormsy));
