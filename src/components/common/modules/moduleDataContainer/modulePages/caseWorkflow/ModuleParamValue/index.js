import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import httpService from "services/httpservice/httpService";
import {
  TextFieldFormsy,
  SelectFormsy
} from "components/common/formsyComponents";
import { MenuItem, FormControl, Paper, Grid } from "@mui/material";
import Formsy from "formsy-react";
import { 
     MdOutlineSearch as SearchButtonIcon,
  } from "react-icons/md"
import { GenericDatatable, GenericButton, useClasses } from "@application";

const styles = theme => ({
  root: {
    width: "100%"
  },
  formControl: {
    margin: theme.spacing(1),
    fullWidth: true,
    display: "flex",
    wrap: "nowrap"
  },
  expandedPanel: {
    backgroundColor: "#f4f5fa"
  },
  heading: {
    color: "#052a4f",
    fontSize: theme.typography.pxToRem(18),
    fontWeight: "500"
  },
  rowDesign: {
    paddingTop: 15
  }
});

function ModuleParamValue(props) {
  const [colsNames, setColNamesForView] = useState([]);

//   const dispatch = useDispatch();
  const classes = useClasses(styles);
  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [searchData, setSearchData] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [dataSelected, setDataSelected] = useState([]);
  //console.log(dataSelected);
//   const selectionIndex = "all";
  //const selectionIndex = "0,1";

  const token = window.localStorage.getItem("cognifi_token");
  let config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };

  const handleSubmit = async searchParams => {
    setIsFormValid(false);
    searchParams["viewName"] = props.modalContent.viewName;
    //console.log(searchParams);
    const result = await new Promise((resolve, reject) => {
      httpService
        .post("/api/common/searchModuleParamValue", config, {
          params: searchParams
        })
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        });
    });
    // console.log("result = ", result);
    setShowResults(true);
    setSearchData(result);
    setIsFormValid(true);
    return result;
  };

  // const [selectedValuesArr, setSelectedValuesArr] = useState([]);

  // const selectValue = data => {
  //   setSelectedValuesArr(data);
  // };

  const getColNamesForView = async () => {
    const viewName = props.modalContent.viewName;
    const result = await httpService.post(
      `common/getGenericSearchViewColumns/${viewName}`
    );
    setColNamesForView(result.data);
    console.log("Column Data Was Set!", )
  };

  useEffect(() => {
    console.log("UseEffect Was Called")
    getColNamesForView();
  });

  const ResultFrame = () => (
    <div
      id="paramResultFrame"
      className={classes.root}
      style={{ paddingTop: 20 }}
    >
      {searchData ? (
        <GenericDatatable
          dataSet={searchData}
          moduleCode=""
          selected={dataSelected}
          selectHandler={setDataSelected}
        ></GenericDatatable>
      ) : (
        "No data available"
      )}
      <Grid
        container
        alignItems="flex-start"
        justify="flex-end"
        direction="row"
        style={{ marginRight: 15, marginBottom: 10 }}
      >
        <GenericButton
          type="submit"
          variant="outlined"
          color="primary"
          aria-label="Select"
          className={classes.button}
          id="selectValue"
          // onClick={selectValues}
        >
          Select
        </GenericButton>
      </Grid>
    </div>
  );

  return (
    <Paper style={{ padding: 16 }}>
      <div id="searchParamFrame" className={classes.root}>
        <Formsy
          onValidSubmit={searchParams => handleSubmit(searchParams)}
          onValid={() => setIsFormValid(true)}
          onInvalid={() => setIsFormValid(false)}
          ref={formRef}
          className="flex flex-col justify-center w-full"
        >
          <Grid
            container
            alignItems="flex-start"
            spacing={2}
            className={classes.rowDesign}
          >
            <Grid item xs={4}>
              <FormControl className={classes.formControl}>
                <SelectFormsy
                  variant="outlined"
                  name="searchBy"
                  label="Search By"
                  value="" // mandatory, value of the selected element
                  className={undefined} // optional, if you need for styling
                  onChange={() => {}} // optional, a callback if you need to do any logic on the value change
                  validationError="" // optional, to show error if validation fails
                  required={true} // optional, if make this mandatory field in the form
                >
                  {colsNames.map((colName, index) => (
                    <MenuItem value={colName} key={index}>
                      {colName}
                    </MenuItem>
                  ))}
                </SelectFormsy>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.formControl}>
                <SelectFormsy
                  variant="outlined"
                  name="searchType"
                  label="Search Type"
                  value="" // mandatory, value of the selected element
                  className={undefined} // optional, if you need for styling
                  onChange={() => {}} // optional, a callback if you need to do any logic on the value change
                  validationError="" // optional, to show error if validation fails
                  required={true} // optional, if make this mandatory field in the form
                >
                  <MenuItem value="StartsWith">Starts With</MenuItem>
                  <MenuItem value="InString">In String</MenuItem>
                  <MenuItem value="WholeWord">Whole Word</MenuItem>
                </SelectFormsy>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.formControl}>
                <TextFieldFormsy
                  variant="outlined"
                  name="searchValue"
                  label="Search Value"
                  className={undefined} // optional, if you need for styling
                  onChange={() => {}} // optional, a callback if you need to do any logic on the value change
                  validationError="" // optional, to show error if validation fails
                  //required={true} // optional, if make this mandatory field in the form
                  value=""
                ></TextFieldFormsy>
              </FormControl>
            </Grid>
            <Grid
              container
              alignItems="flex-start"
              justify="flex-end"
              direction="row"
              style={{ marginRight: 15, marginBottom: 10 }}
            >
              <GenericButton
                type="submit"
                variant="outlined"
                color="primary"
                aria-label="Search"
                className={classes.button}
                startIcon={<SearchButtonIcon />}
                disabled={!isFormValid}
              >
                Search
              </GenericButton>
            </Grid>
          </Grid>
        </Formsy>
      </div>
      {showResults ? <ResultFrame /> : null}
    </Paper>
  );
}

export default ModuleParamValue;
