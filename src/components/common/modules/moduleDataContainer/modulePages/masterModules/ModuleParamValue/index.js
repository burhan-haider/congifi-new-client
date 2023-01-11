import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import httpService from "../../../../../../services/httpservice/httpService";
import {
  MenuItem,
  FormControl,
  Paper,
  Grid,
  TextField,
  Select,
  InputLabel
} from "@mui/material";
import { GenericDatatable, GenericButton } from "@application";
import { useClasses } from "@application";

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

  const classes = useClasses(styles);
  const [isFormValid, setIsFormValid] = useState(false);
  const [searchData, setSearchData] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [searchByVal, setSearchByVal] = useState("");
  const [searchTypeVal, setSearchTypeVal] = useState("");
  const [dataSelected, setDataSelected] = useState([]);
  //console.log(dataSelected);
  const selectionIndex = "all";
  //const selectionIndex = "0,1";

  const token = window.localStorage.getItem("cognifi_token");
  let config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    if (name === "searchBy") {
      setSearchByVal(value);
    }
    if (name === "searchType") {
      setSearchTypeVal(value);
    }
  };

  // const searchByRef = React.useRef();

  const searchDataForView = async () => {
    // console.log(props.modalContent.viewName);
    setIsFormValid(false);
    const searchParams = {};
    searchParams["searchBy"] = searchByVal;
    searchParams["searchType"] = searchTypeVal;
    searchParams["searchValue"] = "";
    searchParams["viewName"] = props.modalContent.viewName;
    // console.log(searchParams);
    const result = await new Promise((resolve, reject) => {
      httpService
        .post("/common/searchModuleParamValue", searchParams)
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
            // console.log(response.data);
          } else {
            reject(response.data.err);
            // console.log(response.data.err);
          }
        });
    });
    // console.log("result = ", result);
    setShowResults(true);
    setSearchData(result);
    setIsFormValid(true);
    return result;
  };

  useEffect(() => {
    const getColNamesForView = async () => {
      const viewName = props.modalContent.viewName;
      const result = await httpService.post(
        `common/getGenericSearchViewColumns/${viewName}`
      );
      setColNamesForView(result.data);
      // console.log(result.data);
    };
    getColNamesForView();
  }, [props.modalContent.viewName]);

  const ResultFrame = () => (
    <div
      id="paramResultFrame"
      className={classes.root}
      style={{ paddingTop: 20 }}
    >
      {searchData ? (
        <GenericDatatable
          dataSet={searchData}
          infoEnabled={true}
          moduleName="param"
          isSelection={true}
          isMultipleSelect={true}
          selectionIndex={selectionIndex}
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
        >
          Select
        </GenericButton>
      </Grid>
    </div>
  );

  return (
    <Paper style={{ padding: 16 }}>
      <div id="searchParamFrame" className={classes.root}>
        {/* <form onSubmit={submitForm}> */}
        <Grid
          container
          alignItems="flex-start"
          spacing={2}
          className={classes.rowDesign}
        >
          <Grid item xs={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="SearchBy">Search By</InputLabel>
              <Select
                name="searchBy"
                label="Search By"
                value={searchByVal}
                className={undefined}
                onChange={e => handleChange(e)}
                required={true}
                //ref={searchByRef}
              >
                {colsNames.map((colName, index) => (
                  <MenuItem value={colName} key={index}>
                    {colName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="SearchType">Search Type</InputLabel>
              <Select
                name="searchType"
                label="Search Type"
                value={searchTypeVal}
                className={undefined}
                onChange={e => handleChange(e)}
              >
                <MenuItem value="StartsWith">Starts With</MenuItem>
                <MenuItem value="InString">In String</MenuItem>
                <MenuItem value="WholeWord">Whole Word</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl className={classes.formControl}>
              <TextField
                variant="outlined"
                name="searchValue"
                label="Search Value"
                className={undefined}
                onChange={() => {}}
                value=""
              ></TextField>
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
              //disabled={!isFormValid}
              onClick={() => searchDataForView()}
            >
              Search
            </GenericButton>
          </Grid>
        </Grid>
        {/* <Formsy
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
        </Formsy> */}
      </div>
      {showResults ? <ResultFrame /> : null}
    </Paper>
  );
}

export default ModuleParamValue;
