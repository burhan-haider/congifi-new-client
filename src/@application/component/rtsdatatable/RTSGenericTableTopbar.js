//Created by Vivek - 20.04.2020
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useClasses } from "@application";
import {
  Typography,
  TextField,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  ListItemText,
  Select,
  Checkbox,
  Link
} from "@mui/material";

import RTSPrintScanData from "components/common/modules/moduleDataContainer/modulePages/realtimeScanning/RTSPrintScanData";
import GenericDialog from "../dialog/GenericDialog";
import RTSAddToAcceptList from "components/common/modules/moduleDataContainer/modulePages/realtimeScanning/RTSAddToAcceptList";
import RTSModuleUserData from "components/common/modules/moduleDataContainer/modulePages/realtimeScanning/RTSModuleUserData";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ReactExport from "react-export-excel";
import CsvDownloader from "react-csv-downloader";
import getIconByKey from 'assets'
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const styles = theme => ({
  parentDiv: {
    backgroundColor: "#f4f5fa",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: "10px",
  },
  moduleNameDiv: {
    maxHeight: "40px",
    alignItems: "center",
    color: "#353535",
    marginTop: "12px",
  },
  textFieldRoot: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        //borderColor: "#353535",
        border: "solid 1px #3a3a3a"
      },
      "&:hover fieldset": {
        border: "solid 2px #3a3a3a"
      },
      "&.Mui-focused fieldset": {
        border: "solid 2px #3a3a3a"
      }
    }
  },
  textFieldInput: {
    textAlign: "center"
  },
  MuiOutlinedInput: {
    maxHeight: "36px",
    borderRadius: "25px",
    fontSize: "13px",
    marginRight: "5px",
    color: "#353535",
    width: "100%"
  },
  formControl: {
    width: 120,
    borderBottom: '1px solid #3a3a3a',
    "& .MuiInputLabel-formControl": {
      fontSize: "0.75Rem",
      marginTop: "8px"
    }
    // "& .MuiSelect-iconOutlined-226": {
    //   right: -16
    // },
    // "& .MuiInputLabel-formControl-177": {
    //   top: -16
    // }
  },
  icon: {
    marginRight: "-20px",
    marginTop: "-6px"
  },
  // VIVEK - CHECKBOX
  checkboxRoot: {
    color: "#052a4f",
    "&$checked": {
      color: "#052a4f"
    }
  },
  checked: {},
  //
  exportIconsRTS: {
    // maxWidth: "10px",
    maxHeight: "18px",
    // marginRight: "10px",
    cursor: "pointer"
  },
  exportIcons: {
    maxWidth: "25px",
    maxHeight: "25px",
    marginRight: "10px",
    cursor: "pointer"
  },
  typography: {
    fontSize: "inherit",
    fontFamily: "inherit",
    marginLeft: "8px"
  },
  moduleTyphography: {
    fontSize: "inherit",
    fontFamily: "inherit"
  }
});

const resetItemsHeight = 30;
const resetItemsPaddingTop = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: resetItemsHeight * 10 + resetItemsPaddingTop,
      width: 250
    }
  }
};

function RTSGenericTableTopbar(props) {
  const classes = useClasses(styles);

  const {
    moduleName,
    filterData,
    handleResetChange,
    resetColumns,
    resetColumnHeaders,
    currentDateAndTime,
    currentDate,
    loggedUser,
    fileName,
    fileImport,
    selected,
    moduleIndex,
    userInputData,
    completeData,
    rows,
    headers
  } = props;
  const [action, setAction] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [property, setProperty] = useState({});
  const [dataSelected, setDataSelected] = useState();

  // const exportIconsSet = require.context("../../assets/icons", true);
  const modalData = {
    addToAcceptList: {
      title: "Add/Remove To Accept List",
      size: "md"
    },
    viewMatches: {
      title: "Print Match Details",
      size: "sm"
    },
    hyperlink: {
      title: "Transaction Details",
      size: "lg"
    }
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const displayContent = data => {
    setProperty(modalData[data]);
  };

  useEffect(() => {
    setDataSelected(selected);
  }, [selected]);

  const viewMatchHandler = data => {
    setOpenModal(true);
  };
  const acceptListHandler = () => {
    if (dataSelected.length > 0) {
      setOpenModal(true);
    } else {
      alert("Please check at least one checkbox");
    }
  };
  const modulHyperlinkHandler = () => {
    setOpenModal(true);
  };

  // const handleTraceClick = event => {
  //   event.preventDefault();
  //   window.open(pdfFile, "PRINT", "height=400,width=600");
  // };

  const headerObject = headers.map((each, index) => {
    return each.label;
  });

  const multiDataSet = [
    {
      columns: headerObject ? headerObject : [],
      data: rows ? rows : []
    }
  ];

  const generatePDF = () => {
    const doc = new jsPDF("l");
    doc.autoTable({
      head: [headerObject],
      body: rows
    });
    //doc.setFontSize(16);
    doc.save(`${moduleName}.pdf`);
  };

  return (
    <div className={clsx("flex justify-start items-center p-2", classes.parentDiv)}>
      <div className={clsx("flex pl-6 float-left", classes.moduleNameDiv)}>
        <Typography className={classes.moduleTyphography}>
          <b>Source Info: </b>
          <Link
            style={{
              color: "#154b94",
              fontFamily: "inherit",
              fontWeight: "bold"
            }}
            href="#"
            onClick={e => {
              modulHyperlinkHandler();
              setAction("moduleHyperlink");
              displayContent("hyperlink");
            }}
          >
            {moduleName}
          </Link>
          <img
            className={classes.exportIconsRTS}
            style={{ display: "inline", marginLeft: "5px" }}
            src={getIconByKey("viewMatches")}
            alt="View Matches"
            onClick={e => {
              viewMatchHandler();
              setAction("viewMatches");
              displayContent("viewMatches");
            }}
          />
          <img
            className={classes.exportIconsRTS}
            style={{ display: "inline", marginLeft: "5px" }}
            src={
              getIconByKey("addToAccept")
            }
            alt="Add to Acceplist"
            onClick={e => {
              acceptListHandler();
              setAction("ToAdd");
              displayContent("addToAcceptList");
            }}
          />
        </Typography>
        {moduleIndex === 0 ? (
          <>
            <Typography className={classes.typography}>
              <b>Dated On: </b> {currentDateAndTime}
            </Typography>
            <Typography className={classes.typography}>
              <b>UserCode: </b> {loggedUser}
            </Typography>
          </>
        ) : (
          ""
        )}
      </div>
      <div >
        {action === "viewMatches" ? (
          <GenericDialog
            state={openModal}
            closeModal={handleCloseModal}
            property={property}
            displayContent={displayContent}
          >
            <RTSPrintScanData
              closeModal={handleCloseModal}
              completeData={completeData}
              moduleName={moduleName}
              action={action}
              moduleIndex={moduleIndex}
              currentDate={currentDate}
              loggedUser={loggedUser}
            />
          </GenericDialog>
        ) : action === "ToAdd" ? (
          <GenericDialog
            state={openModal}
            closeModal={handleCloseModal}
            displayContent={displayContent}
            property={property}
          >
            <RTSAddToAcceptList
              state={openModal}
              closeModal={handleCloseModal}
              displayContent={displayContent}
              property={property}
              data={dataSelected}
              action={action}
              selected={selected}
              fileImport={fileImport}
              fileName={fileName}
              LoggedUser={loggedUser}
            />
          </GenericDialog>
        ) : action === "moduleHyperlink" ? (
          <GenericDialog
            state={openModal}
            closeModal={handleCloseModal}
            displayContent={displayContent}
            property={property}
          >
            <RTSModuleUserData
              state={openModal}
              closeModal={handleCloseModal}
              displayContent={displayContent}
              property={property}
              userData={userInputData}
              serialNo={fileName}
              currentDate={currentDate}
              loggedUser={loggedUser}
            />
          </GenericDialog>
        ) : (
          ""
        )}
        <div style={{display: 'flex', justifyContent: 'flex-end', flexDirection: "row", marginRight: '1rem', marginBottom: '10px', alignItems: 'flex-start'}}>
          <img
            src={getIconByKey("print")}
            className={classes.exportIcons}
            // onClick={() => handleTraceClick()}
            alt="Print"
          />
          <img
            src={getIconByKey("pdf")}
            className={classes.exportIcons}
            onClick={generatePDF}
            alt="PDF"
          />
          <ExcelFile
            filename={moduleName}
            fileExtension="xlsx"
            element={
              <img
                src={getIconByKey("excel")}
                className={classes.exportIcons}
                alt="Excel"
              />
            }
          >
            <ExcelSheet
              dataSet={multiDataSet ? multiDataSet : []}
              name={moduleName}
            ></ExcelSheet>
          </ExcelFile>

          <CsvDownloader
            columns={headerObject}
            datas={rows}
            filename={moduleName + ".csv"}
            separator=","
          >
            <img
              src={getIconByKey("csv")}
              className={classes.exportIcons}
              alt="CSV"
            />
          </CsvDownloader>
        </div>

        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
          <div>
            <TextField
              id="outlined-basic"
              label="Filter"
              variant="outlined"
              type="search"
              size="small"
              onChange={filterData}
              classes={{
                root: classes.textFieldRoot,
                label: classes.textFieldLabel
              }}
              InputProps={{
                className: classes.MuiOutlinedInput
              }}
            />
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel
                id="demo-mutiple-checkbox-label"
                style={{ textAlign: "center", marginTop: "-6px" }}
              >
                Reset
              </InputLabel>
              <Select
                classes={{ icon: classes.icon }}
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={resetColumns}
                onChange={handleResetChange}
                input={<Input />}
                variant="outlined"
                renderValue={selected => selected.length}
                MenuProps={MenuProps}
                disableUnderline={true}
              >
                {resetColumnHeaders.map(eachHeader => (
                  <MenuItem
                    key={eachHeader.split("~!!~")[0]}
                    value={eachHeader.split("~!!~")[1]}
                    // disabled={
                    //   ["0", "1"].includes(eachHeader.split("~!!~")[0])
                    //     ? true
                    //     : false
                    // }
                  >
                    <Checkbox
                      checked={
                        resetColumns.indexOf(eachHeader.split("~!!~")[1]) > -1
                      }
                      size="small"
                      classes={{
                        root: classes.checkboxRoot,
                        checked: classes.checked
                      }}
                    />
                    <ListItemText primary={eachHeader.split("~!!~")[2]} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default RTSGenericTableTopbar;
