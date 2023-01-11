import React from "react";
import {
  FormControl,
  FormHelperText,
  FilledInput,
  OutlinedInput,
  InputLabel,
  Input,
  Select,
  useTheme
} from "@mui/material";
import { withFormsy } from "formsy-react";
import _ from "lodash";

function SelectFormsy(props) {
  const importedProps = _.pick(props, [
    "autoWidth",
    "children",
    "className",
    "classes",
    "displayEmpty",
    "input",
    "inputProps",
    "InputProps",
    "MenuProps",
    "multiple",
    "native",
    "onChange",
    "onClose",
    "onOpen",
    "open",
    "renderValue",
    "SelectDisplayProps",
    "value",
    "variant",
    "disabled",
    "required",
    "disableUnderline"
  ]);

  // An error message is returned only if the component is invalid
  const { errorMessage } = props;
  const value = props.value;
  const theme = useTheme();

  function input() {
    switch (importedProps.variant) {
      case "outlined":
        return (
          <OutlinedInput fullWidth={true} id={props.name} />
        );
      case "filled":
        return <FilledInput id={props.name} />;
      default:
        return <Input id={props.name} />;
    }
  }

  function changeValue(event) {
    props.setValue(event.target.value);
    if (props.onChange) {
      props.onChange(event);
    }
  }

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit"
      }
    })
  };

  return (
    <FormControl
      error={Boolean(props.showError && errorMessage)}
      className={props.className}
      variant={importedProps.variant}
    >
      {props.label && (
        <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      )}
      <Select
        {...importedProps}
        styles={selectStyles}
        value={value}
        onChange={changeValue}
        input={input()}
      />
      {Boolean(props.showError && errorMessage) && (
        <FormHelperText>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
}

export default React.memo(withFormsy(SelectFormsy));
