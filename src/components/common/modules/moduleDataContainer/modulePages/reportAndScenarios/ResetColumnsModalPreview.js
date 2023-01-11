import React, { useEffect, useState } from "react";
// import { makeStyles } from "@mui/styles";
import { useClasses } from "@application";
import {
  Grid,
  FormControlLabel,
  TextField,
  Typography
} from "@mui/material";
import { GenericButton, GenericSwitch } from "@application";
import _ from "lodash";

const styles = theme =>({
  formControl: {
    // margin: theme.spacing(1),
    fullWidth: true,
    display: "flex",
    wrap: "nowrap"
  },
  columnsIndexDivs: {
    display: "grid",
    height: "39px"
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
  gridsDimensions: {
    width: "auto",
    margin: "0 5%"
  },
  gridColumns: {
    padding: "2px 8px !important"
  },
  switchRoot: {
    width: "100%",
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

function ResetColumnsModalPreview(props) {
  //console.log(props);
  const classes = useClasses(styles);
  const { previewData } = props;

  const finalData = _.orderBy(
    previewData,
    ["isEnabled", "columnIndex"],
    ["desc", "asc"]
  );
  //console.log(finalData);

  let columnsInitialMap = new Map();
  for (var i = 0; i < finalData.length; i++) {
    columnsInitialMap.set(i, finalData[i].columnName);
  }

  return (
    <div className="dragParent">
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={2} className={classes.grids}>
            <Grid container spacing={2} className={classes.gridsDimensions}>
              <Grid item xs={12} className={classes.grids}>
                <Typography
                  className={classes.typography}
                  key="columnIndexHeader"
                >
                  Column Index
                </Typography>
              </Grid>
            </Grid>
            {finalData
              ? finalData.map((each, columnsIndex) => (
                  <div className={classes.columnsIndexDivs} key={columnsIndex}>
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
            <Grid container spacing={2} className={classes.gridsDimensions}>
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
            {finalData.length > 0 ? (
              finalData.map((eachObject, index) => {
                return (
                  <Grid
                    container
                    key={index}
                    spacing={2}
                    className={classes.gridsDimensions}
                  >
                    <Grid
                      item
                      xs={6}
                      key={`"column"_${eachObject.columnName}`}
                      className={classes.gridColumns}
                    >
                      <FormControlLabel
                        classes={{
                          root: classes.switchRoot,
                          label: classes.switchLabel
                        }}
                        style={{
                          backgroundColor:
                            eachObject.isEnabled === "Y"
                              ? "#052a4f"
                              : "#f4f5fa",
                          color:
                            eachObject.isEnabled === "Y" ? "#fff" : "#353535"
                        }}
                        control={
                          <GenericSwitch
                            checked={
                              eachObject.isEnabled === "Y" ? true : false
                            }
                          />
                        }
                        label={eachObject.columnName}
                        labelPlacement="start"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      key={`"alias"_${eachObject.aliasName}`}
                      className={classes.gridColumns}
                    >
                      <TextField
                        variant="outlined"
                        name={`${eachObject.columnName}_aliasName`}
                        //label={`${eachObject.aliasName}`}
                        InputProps={{
                          className: classes.inputFieldDesign
                        }}
                        value={eachObject.aliasName}
                        style={{ width: "100%" }}
                        disabled
                      ></TextField>
                    </Grid>
                  </Grid>
                );
              })
            ) : (
              <Typography
                style={{
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  fontWeight: "bold"
                }}
              >
                No changes done to show the preview
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="flex-start"
          justify="flex-end"
          direction="row"
          style={{ marginRight: 15, marginBottom: 10 }}
        >
          <GenericButton
            variant="outlined"
            onClick={props.closeModal}
            //autoFocus
          >
            Close
          </GenericButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default ResetColumnsModalPreview;
