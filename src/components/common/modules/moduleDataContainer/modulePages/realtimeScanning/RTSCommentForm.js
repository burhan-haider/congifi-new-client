import React, { useState } from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import rtScanningService from "services/realTimeScanning/rtScanningService";
import clsx from "clsx";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "components/common/formsyComponents";
import { GenericButton } from "@application";
import { useClasses } from "@application";

const styles = theme => ({
  MuiOutlinedInput: {
    paddingLeft: "10px"
  },
  parentDiv: {},
  MuiButton: {
    alignItems: "center",
    textTransform: "initial",
    marginTop: "1%",
    marginLeft: "45%",
    borderRadius: "15px",

    borderColor: "#1562ca",
    padding: "2px 2.5% 2px 2.5%",
    "&:hover": {
      backgroundColor: "#0b4ca2",
      color: "white"
    }
  }
});

function RTSCommentForm(props) {
  const classes = useClasses(styles);
  const {
    selectedRecord,
    setURResponse,
    action,
    fileName,
    fileImport,
    LoggedUser,
    ScanningFromDate,
    ScanningToDate,
    ProcessingFromDate,
    ProcessingToDate,
    selectHandler
  } = props;
  // let selectedRecords = null;
  let formattedRecords = "";
  if (selectedRecord !== null) {
    formattedRecords = selectedRecord
      .map((eachone, index) => eachone[5])
      .toString();
  }
  const [snackBar, setOpenSnackBar] = useState(false);
  const handleSubmit = data => {
    data["selected"] = formattedRecords;
    data["action"] = action;
    data["fileName"] = fileName;
    data["fileImport"] = fileImport;
    data["userCode"] = LoggedUser;
    data["ScanningFromDate"] = ScanningFromDate;
    data["ScanningToDate"] = ScanningToDate;
    data["ProcessingFromDate"] = ProcessingFromDate;
    data["ProcessingToDate"] = ProcessingToDate;
    rtScanningService.updateCommentRecord(data).then(response => {
      setURResponse(response);
    });
    setOpenSnackBar(true);
    selectHandler(null);
    props.closeModal();
  };
  return (
    <div className={clsx("border-blue-800", classes.parentDiv)}>
      <Formsy onValidSubmit={data => handleSubmit(data)}>
        <Typography
          style={{ textAlign: "inline" }}
          className={classes.MuiTyphography}
        >
          Enter Comments
        </Typography>
        <TextFieldFormsy
          multiline
          rows={4}
          required={true}
          name="userComment"
          className="w-full border bg-gray-100"
          variant="outlined"
        ></TextFieldFormsy>

        <GenericButton
          variant="outlined"
          size="small"
          className={classes.MuiButton}
          type="submit"
        >
          Save
        </GenericButton>
      </Formsy>
    </div>
  );
}
export default RTSCommentForm;