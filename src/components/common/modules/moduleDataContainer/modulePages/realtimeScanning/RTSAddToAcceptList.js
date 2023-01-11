import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/material";
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

function RTSAddToAcceptList(props) {
  const classes = useClasses(styles);
  const [record, setRecordData] = useState(props.data);
  const [dataResponse, setDataResponse] = useState(false);
  const [datasel, setdataSel] = useState();
  const {
    action,
    fileName,
    fileImport,
    LoggedUser,
    ScanningFromDate,
    ScanningToDate,
    ProcessingFromDate,
    ProcessingToDate,
    selected
  } = props;
  //   useEffect(() => {
  //     setdataSel(selected);
  //   }, [selected]);
  //   useEffect(() => {
  //     if (dataResponse !== null) {
  //       return datasel === null;
  //     }
  //   }, [dataResponse, datasel]);
  const handleSubmit = data => {
    data["selected"] = record[0][5];
    data["status"] = record[0][6];
    data["action"] = action;
    data["fileName"] = fileName;
    data["fileImport"] = fileImport;
    data["userCode"] = LoggedUser;
    data["ScanningFromDate"] = ScanningFromDate;
    data["ScanningToDate"] = ScanningToDate;
    data["ProcessingFromDate"] = ProcessingFromDate;
    data["ProcessingToDate"] = ProcessingToDate;
    rtScanningService.updateCommentRecord(data).then(response => {
      setDataResponse(response);
    });
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
          variant="outlined"
          required={true}
          name="userComment"
          className="w-full border bg-gray-100"
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
export default RTSAddToAcceptList;