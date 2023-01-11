import React from "react";
import { 
  DatePicker, 
  DateTimePicker, 
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField } from "@mui/material";
import { withFormsy } from "formsy-react";
import _ from "lodash";
import moment from "moment";
import "moment/locale/en-in";
// VIVEK - 19.12.2020 - PLEASE IMPORT THE ABOVE LINE TO GET THE INDIA LOCALE

function DatePickerFormsy(props) {
  const importedProps = _.pick(props, [
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
    "required",
  ]);

  const { errorMessage } = props;
  //console.log("Vivek - date --> " + props.value);
  const value =
    props.value && props.value !== null && moment(props.value, "L").isValid()
      ? //moment(props.value, "DD-MM-YYYY HH:mm:ss")
        moment(props.value, "L")
      : null;

  function changeValue(event) {
    let date = null;
    if (event !== null && props.dateTime) {
      date = new Date(
        event.getFullYear(),
        event.getMonth(),
        event.getDate(),
        event.getHours(),
        event.getMinutes(),
        0
      );
    } else if (event !== null && !props.dateTime) {
      date = new Date(event.getFullYear(), event.getMonth(), event.getDate());
    }

    //const parsedDate = moment(date).format("DD-MM-YYYY HH:mm:ss");
    //const parsedDate = moment(date).format("YYYY-MM-DDTHH:mm:ssZ");
    const parsedDate = moment(date).format("L");
    //console.log(parsedDate);

    props.setValue(parsedDate);
    if (props.onChange) {
      props.onChange(parsedDate);
    }
  }

  return (
    <React.Fragment>
      {props.dateTime ? (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            
            inputVariant="outlined"
            autoOk
            ampm={props.ampm}
            className={props.className}
            onChange={changeValue}
            clearable
            value={value}
            format="dd/MM/yyyy HH:mm"
            // format="dd/MM/yyyy"
            inputFormat="dd/MM/yyyy HH:mm"
            toolbarFormat="dd/MM/yyyy HH:mm"
            allowKeyboardControl={props.allowKeyboardControl}
            error={Boolean(errorMessage)}
            helperText={errorMessage}
            renderInput={(props) => <TextField sx={{width: '100%'}} {...props} />} 
            {...importedProps}
          />
        </LocalizationProvider>
      ) : (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            
            inputVariant="outlined"
            autoOk
            ampm={props.ampm}
            className={props.className}
            onChange={changeValue}
            clearable
            value={value}
            format="dd/MM/yyyy"
            inputFormat="dd/MM/yyyy"
            toolbarFormat="dd/MM/yyyy"
            allowKeyboardControl={props.allowKeyboardControl}
            error={Boolean(errorMessage)}
            helperText={errorMessage}
            renderInput={(props) => <TextField sx={{width: '100%'}} {...props} />}
            {...importedProps}
          />
        </LocalizationProvider>

      )}
    </React.Fragment>
  );
}

export default React.memo(withFormsy(DatePickerFormsy));
