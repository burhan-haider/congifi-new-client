import React from "react";
// import AttachFile from "@material-ui/icons/AttachFileRounded";
import { MdAttachFile as AttachFile } from 'react-icons/md'
import { makeStyles } from "@mui/styles";
import { Typography, Button, MenuItem, Grid } from "@mui/material";
import { GenericButton } from "@application";
import SelectFormsy from "components/common/formsyComponents/SelectFormsy";
import clsx from "clsx";
import { useClasses } from "@application";

const styles = theme => ({
  MuiButton: {
    textTransform: "initial",
    borderRadius: "15px",
    borderColor: "#052a4f",
    padding: "2px 2.5% 2px 2.5%",
    "&:hover": {
      backgroundColor: "#052a4f",
      color: "white"
    }
  },
  MuiButtonLast: {
    textTransform: "initial",
    borderRadius: "15px",
    borderColor: "#052a4f",
    padding: "2px 2.5% 2px 2.5%",
    "&:hover": {
      backgroundColor: "#052a4f",
      color: "white"
    },
    marginRight: "0px"
  },
  MuiGridRow: {
    backgroundColor: "#f1f2f3",
    borderRadius: "50px",
    height: "8vh"
  },
  ButtonFileLoading: {
    marginLeft: "8px",
    borderRadius: "18em",
    border: "none",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "none"
    }
  },
  MuiTypoGraphy: {
    float: "left",
    marginBottom: "0.5%",
    marginLeft: "1%",
    fontWeight: "bold",
    fontSize: "15px"
  },
  TestAlignment: {
    alignSelf: "center"
  }
});
function RTSBulkScreeningForm() {
  const classes = useClasses(styles);

  return (
    <div className="m-8">
      <Typography className={classes.MuiTypoGraphy}>Bulk Screening</Typography>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.MuiGridRow}
      >
        <Grid xs={3} item>
          <Grid container>
            <Grid item={true} xs={6} className={classes.TestAlignment}>
              Select File
            </Grid>
            <Grid item={true} xs={6} className={classes.TestAlignment}>
              <input
                style={{ display: "none" }}
                id="raised-button"
                type="File"
              />
              <label htmlFor="raised-button">
                <Button
                  variant="outlined"
                  component="span"
                  className={classes.ButtonFileLoading}
                  
                >
                  <AttachFile size={24} color={'#333'} />
                </Button>
              </label>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={3} item>
          <Grid container>
            <Grid item={true} xs={5} className={classes.TestAlignment}>
              Import File
            </Grid>
            <Grid item={true} xs={7} className={classes.TestAlignment}>
              <SelectFormsy
                name="bulkScanningImportFile"
                className="w-full  bg-white rounded-full "
                value=""
                onChange={() => {}}
                //  required={true}
                disableUnderline={true}
              >
                <MenuItem className={classes.MenuItem} value="">
                  Select One
                </MenuItem>
                <MenuItem value="48">WHITE LIST</MenuItem>
                <MenuItem value="199">NON CUSTOMER</MenuItem>
              </SelectFormsy>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={3} item>
          <Grid container>
            {" "}
            <Grid item={true} xs={5} className={classes.TestAlignment}>
              Template Id
            </Grid>
            <Grid item={true} xs={7} className={classes.TestAlignment}>
              <SelectFormsy
                value=""
                name="bulkScanningTemplateId"
                onChange={() => {}}
                // required={true}
                className={clsx(
                  "w-full  bg-white rounded-full",
                  classes.Muiselect
                )}
                disableUnderline={true}
                autoFocus={true}
              >
                <MenuItem value="">Select One</MenuItem>
                <MenuItem value="Template1">Template1</MenuItem>
                <MenuItem value="Template2">Template2</MenuItem>
                <MenuItem value="Template3">Template3</MenuItem>
              </SelectFormsy>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={3} item>
          <Grid container>
            <Grid item={true} xs={5} className={classes.TestAlignment}>
              File Delimiter
            </Grid>
            <Grid item={true} xs={6} className={classes.TestAlignment}>
              <SelectFormsy
                className="w-full bg-white rounded-full"
                value=""
                name="bulkScanningFileDelimeter"
                onChange={() => {}}
                //  required={true}
                disableUnderline={true}
              >
                <MenuItem value="">Select One</MenuItem>
                <MenuItem value="~">~</MenuItem>
                <MenuItem value=";">;</MenuItem>
                <MenuItem value="|">|</MenuItem>
              </SelectFormsy>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br></br>
      <div align="right" className={classes.MuiButtonDiv}>
        <GenericButton
          variant="outlined"
          size="small"
          name="import"
          //value="import"
          className={classes.MuiButton}
        >
          Import
        </GenericButton>
        <GenericButton
          variant="outlined"
          size="small"
          name="viewMatch"
          //value="viewMatch"
          className={classes.MuiButtonLast}
        >
          View Match
        </GenericButton>
      </div>
    </div>
  );
}
export default RTSBulkScreeningForm;
