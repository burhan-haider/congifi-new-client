import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText
} from "@mui/material";
import { withFormsy } from "formsy-react";
import _ from "lodash";
// import SearchIcon from "@mui/icons-material/Search";
import { MdSearch as SearchIcon } from 'react-icons/md';
// import { GenericDialog } from "@application";
// import ModuleParamValue from "app/component/modules/moduleDataContainer/modulePages/masterModules/ModuleParamValue/index";

function ViewFieldFormsy(props) {
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
    "onClick",
    "viewname",
    "ismultipleselect"
  ]);

  const { errorMessage } = props;
  const value = props.value || "";

  function changeValue(event) {
    props.setValue(event.currentTarget.value);
    if (props.onChange) {
      props.onChange(event);
    }
  }

  // function openModalForSearch(fieldName) {
  //   console.log(fieldName);
  //   this.setState({
  //     modalOpen: true,
  //     fieldName: fieldName
  //   });
  // }

  const modalData = {
    data: {
      searchFieldId: props.name,
      searchFor: props.label,
      viewName: props.viewname,
      isMultipleSelect: props.ismultipleselect
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const property = {
    title: "Search Param Value",
    size: "lg"
  };

  const openModalForSearch = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const displayModalContent = () => {
    setModalContent(modalData["data"]);
  };

  return (
    <React.Fragment>
      <FormControl className={props.className} variant="outlined">
        {props.label && (
          <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
        )}
        <OutlinedInput
          {...importedProps}
          onChange={changeValue}
          value={value}
          error={Boolean(props.showError && errorMessage)}
          startAdornment={
            <InputAdornment position="start" style={{ marginLeft: 12 }}>
              <IconButton
                onClick={() => {
                  openModalForSearch();
                  displayModalContent();
                }}
                edge="start"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        {Boolean(props.showError && errorMessage) && (
          <FormHelperText>{errorMessage}</FormHelperText>
        )}
      </FormControl>
      
    </React.Fragment>
  );
}

export default React.memo(withFormsy(ViewFieldFormsy));
