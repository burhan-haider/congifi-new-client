import React, { useState } from "react";
import RTSCheckListForm from "./RTSCheckListForm";
import RTSDataEntryForm from "./RTSDataEntryForm";
import RTSBulkScreeningForm from "./RTSBulkScreeningForm";
import Formsy from "formsy-react";
import { GenericButton, GenericDialog } from "@application";
import rtScanningService from "services/realTimeScanning/rtScanningService";
import { makeStyles } from "@mui/styles";
import RTScannningData from "./RTScanningData";
import { useClasses } from "@application";
const styles = theme => ({
  MuiButton: {
    textTransform: "initial",
    marginRight: "1%",
    borderRadius: "15px",
    borderColor: "#052a4f",
    padding: "2px 2.5% 2px 2.5%",
    "&:hover": {
      backgroundColor: "#052a4f",
      color: "white"
    }
  }
});

function RealtimeScanningComponent(props) {
  const modalData = {
    rtScanning: {
      title: "Real Time Scanning",
      size: "lg"
    }
  };

  const classes = useClasses(styles);
  const [openModal, setOpenModal] = useState(false);
  const [property, setProperty] = useState({});
  const [scanData, setScanData] = useState({});

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const displayContent = data => {
    setProperty(modalData[data]);
  };

  const handlesubmit = data => {
    const RTScannedData = rtScanningService.rtScanData(data);
    setScanData(RTScannedData);
    handleClickOpenModal();
    displayContent("rtScanning");
  };
  return (
    <div>
      <Formsy onValidSubmit={data => handlesubmit(data)}>
        <RTSCheckListForm></RTSCheckListForm>
        <RTSBulkScreeningForm></RTSBulkScreeningForm>
        <RTSDataEntryForm></RTSDataEntryForm>
        <div align="right" className={classes.MuiButtonDiv}>
          <GenericButton
            variant="outlined"
            size="small"
            className={classes.MuiButton}
            type="submit"
          >
            Scan
          </GenericButton>
          <GenericButton
            variant="outlined"
            size="small"
            className={classes.MuiButton}
          >
            Online Scan
          </GenericButton>
          <GenericButton
            variant="outlined"
            size="small"
            className={classes.MuiButton}
          >
            Twitter
          </GenericButton>
          <GenericButton
            variant="outlined"
            size="small"
            className={classes.MuiButton}
          >
            Point On Map
          </GenericButton>
          <GenericButton
            variant="outlined"
            size="small"
            className={classes.MuiButton}
          >
            Scan Image
          </GenericButton>
          <GenericDialog
            closeModal={handleCloseModal}
            state={openModal}
            property={property}
          >
            <RTScannningData data={scanData} closeModal={handleCloseModal} />
          </GenericDialog>
        </div>
        <br></br>
      </Formsy>
    </div>
  );
}

export default RealtimeScanningComponent;