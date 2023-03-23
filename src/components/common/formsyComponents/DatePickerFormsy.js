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
  let value = props.value && props.value !== null && moment(props.value, "DD-MM-YYYY").isValid()
      ? //moment(props.value, "DD-MM-YYYY HH:mm:ss")
        moment(props.value, "DD-MM-YYYY")
      : new Date();

  function changeValue(event) {
    console.log("Data Changed!");
    let date = null;
    if (event !== null && props.dateTime) {
      date = new Date(
        event.getDate(),
        event.getMonth(),
        event.getFullYear(),
      );
    } else if (event !== null && !props.dateTime) {
      date = new Date(event.getFullYear(), event.getMonth(), event.getDate());
    }

    //const parsedDate = moment(date).format("DD-MM-YYYY HH:mm:ss");
    //const parsedDate = moment(date).format("YYYY-MM-DDTHH:mm:ssZ");
    const parsedDate = moment(date).format("DD-MM-YYYY");

    console.log("Parsed Date in DatePicker",parsedDate);

    props.setValue(parsedDate);
    console.log("Set Value:-", props.setValue)
    if (props.onChange) {
      props.onChange(parsedDate);
    }
    value=moment(parsedDate, "DD-MM-YYYY");
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
            format="dd/MM/yyyy"
            // format="yyyy/dd/MM HH:mm"
            inputFormat="dd/MM/yyyy"
          // inputFormat="yyyy/dd/MM HH:mm"
            toolbarFormat="dd/MM/yyyy"
         // toolbarFormat  ="yyyy/dd/MM HH:mm"
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
