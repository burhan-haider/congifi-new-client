import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
// import { makeStyles } from "@mui/styles";
import { useClasses } from "@application";
import { Grid, FormControl, Typography } from "@mui/material";
import { GenericButton, DraggableList, GenericDialog } from "@application";
import reportsService from "services/reports/reportsService";
import Formsy from "formsy-react";
import {
  TextFieldFormsy,
  SwitchFormsy
} from "components/common/formsyComponents";
import * as MessageActions from "redux/message/message.actions";
import ResetColumnsModalPreview from "./ResetColumnsModalPreview";
import _ from "lodash";
import clsx from "clsx";

const styles = theme =>({
  formControl: {
    // margin: theme.spacing(1),
    fullWidth: true,
    display: "flex",
    wrap: "nowrap"
  },
  columnsIndexDivs: {
    display: "grid",
    height: "43px",
    marginBottom: "7px"
  },
  typography: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "bold"
  },
  inputFieldDesign: {
    maxHeight: "35px",
    borderRadius: "25px",
    fontFamily: "inherit",
    fontSize: "inherit",
    color: "#353535",
    backgroundColor: "#f4f5fa",
    border: "none",
    "& .MuiOutlinedInput-input": {
      padding: "18px 8px",
      textAlign: "center"
    },
    "& fieldset": {
      //border: "solid 1px #fff"
      border: "none"
    }
  },
  grids: {},
  gridsHeader: {
    width: "auto",
    margin: "0 5%"
  },
  switchRoot: {
    height: "35px",
    borderRadius: "25px",
    marginLeft: "2px",
    paddingLeft: "20px"
  },
  switchLabel: {
    marginRight: "auto",
    fontFamily: "inherit",
    fontSize: "inherit",
    overflowWrap: "anywhere"
  }
});

function ResetColumnsModal(props) {
  //console.log(props);
  const classes = useClasses(styles);
  const dispatch = useDispatch();
  const { reportId, reportName, reportSerialNo } = props;
  const [dataList, setDataList] = useState([]);
  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);

  let columnsInitialMap = new Map();
  for (var i = 0; i < dataList.length; i++) {
    columnsInitialMap.set(i, dataList[i].COLUMNNAME);
  }

  const [currentOrder, setCurrentOrder] = useState([]);
  const [submitType, setSubmitType] = useState("");
  const [previewData, setPreviewData] = useState({});

  const handleActionClick = event => {
    setSubmitType(event.target.textContent);
  };

  const handleSubmit = data => {
    const finalData =
      currentOrder.length > 0
        ? currentOrder.map(index => {
            return {
              columnIndex: index + 1,
              columnName: columnsInitialMap.get(currentOrder[index]),
              aliasName:
                data[columnsInitialMap.get(currentOrder[index]) + "_aliasName"],
              isEnabled: data[
                columnsInitialMap.get(currentOrder[index]) + "_isEnabled"
              ]
                ? "Y"
                : "N"
            };
          })
        : [];
    //console.log("VIVEK - finalData = ",finalData);
    if (submitType === "Save") {
      setIsFormValid(false);
      reportsService
        .resetReportColumns(reportId, finalData)
        .then(response => {
          dispatch(
            MessageActions.showMessage({
              message: response,
              variant: "success"
            })
          );
          setIsFormValid(true);
          //props.closeModal();
        })
        .catch(error => {
          return dispatch(
            MessageActions.showMessage({ message: error, variant: "error" })
          );
        });
    } else {
      setPreviewData(finalData);
      handleClickOpenModal();
      displayProperty("previewResetColumns");
    }
  };

  const resetFields = dataList
    ? dataList.map((eachObject, index) => {
        return (
          <Grid container key={index} spacing={2}>
            <Grid
              item
              xs={6}
              key={`"column"_${eachObject.COLUMNNAME}`}
              className={classes.grids}
            >
              <FormControl className={classes.formControl}>
                <SwitchFormsy
                  name={`${eachObject.COLUMNNAME}_isEnabled`}
                  label={`${eachObject.COLUMNNAME}`}
                  classes={{
                    root: classes.switchRoot,
                    label: classes.switchLabel
                  }}
                  onChange={() => {}} // optional, a callback if you need to do any logic on the value change
                  value={eachObject.ISENABLED === "Y" ? true : false} // mandatory, value of the selected element
                ></SwitchFormsy>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={6}
              key={`"alias"_${eachObject.ALIASNAME}`}
              className={classes.grids}
            >
              <FormControl className={classes.formControl}>
                <TextFieldFormsy
                  variant="outlined"
                  name={`${eachObject.COLUMNNAME}_aliasName`}
                  //label={`${eachObject.ALIASNAME}`}
                  InputProps={{
                    className: classes.inputFieldDesign
                  }}
                  onChange={() => {}} // optional, a callback if you need to do any logic on the value change
                  validationError="" // optional, to show error if validation fails
                  //required={true} // optional, if make this mandatory field in the form
                  value={eachObject.ALIASNAME}
                ></TextFieldFormsy>
              </FormControl>
            </Grid>
          </Grid>
        );
      })
    : [];

  const modalData = {
    previewResetColumns: {
      title: "Preview: " + reportId,
      size: "lg"
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [property, setProperty] = useState({});

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const displayProperty = data => {
    setProperty(modalData[data]);
  };

  useEffect(() => {
    reportsService.resetReportColumnsDetails(reportId).then(response => {
      setDataList(response.DATALIST);
    });
  }, [reportId]);

  return (
    <div className="dragParent">
      <Formsy
        onValidSubmit={data => handleSubmit(data)}
        onValid={() => setIsFormValid(true)}
        onInvalid={() => setIsFormValid(false)}
        ref={formRef}
        className="flex flex-col justify-center w-full"
      >
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={2} className={classes.grids}>
              <Grid container spacing={2} className={classes.gridsHeader}>
                <Grid item xs={12} className={classes.grids}>
                  <Typography
                    className={classes.typography}
                    key="columnIndexHeader"
                  >
                    Column Index
                  </Typography>
                </Grid>
              </Grid>
              {dataList
                ? dataList.map((each, columnsIndex) => (
                    <div
                      className={classes.columnsIndexDivs}
                      key={columnsIndex}
                    >
                      <Typography
                        className={classes.typography}
                        key={columnsIndex + 1}
                      >
                        {columnsIndex + 1}
                      </Typography>
                    </div>
                  ))
                : ""}
            </Grid>
            <Grid item xs={10} className={classes.grids}>
              <Grid container spacing={2} className={classes.gridsHeader}>
                <Grid item xs={6} className={classes.grids}>
                  <Typography
                    className={classes.typography}
                    key="columnNameHeader"
                  >
                    Column Name
                  </Typography>
                </Grid>
                <Grid item xs={6} className={classes.grids}>
                  <Typography
                    className={classes.typography}
                    key="columnAliasHeader"
                  >
                    Column Alias
                  </Typography>
                </Grid>
              </Grid>
              {resetFields.length > 1 && (
                <DraggableList
                  items={resetFields}
                  setCurrentOrder={setCurrentOrder}
                />
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
            style={{ marginRight: 15, marginBottom: 10 }}
          >
            {dataList[0] ? (
              <React.Fragment>
                <GenericButton
                  type="submit"
                  variant="outlined"
                  aria-label="save"
                  disabled={!isFormValid}
                  value="save"
                  //onClick={setSubmitType("Save")}
                  onClick={event => handleActionClick(event)}
                >
                  Save
                </GenericButton>
                <GenericButton
                  type="submit"
                  variant="outlined"
                  aria-label="preview"
                  value="preview"
                  //onClick={setSubmitType("Preview")}
                  onClick={event => handleActionClick(event)}
                >
                  Preview
                </GenericButton>
              </React.Fragment>
            ) : (
              ""
            )}
            <GenericButton
              variant="outlined"
              onClick={props.closeModal}
              //autoFocus
            >
              Close
            </GenericButton>
          </Grid>
        </Grid>
      </Formsy>
      <GenericDialog
        closeModal={handleCloseModal}
        state={openModal}
        property={property}
      >
        <ResetColumnsModalPreview
          closeModal={handleCloseModal}
          previewData={previewData}
        />
      </GenericDialog>
    </div>
  );
}

export default ResetColumnsModal;
