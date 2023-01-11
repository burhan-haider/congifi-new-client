import React, { useState, useEffect } from "react";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MdExpandMore as ExpandMoreIcon } from 'react-icons/md'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableCell,
  TableBody,
  TableRow,
  Typography,
  TableContainer,
  Table,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { useClasses } from "@application";

const styles = theme => ({
  MuiAccordionSummary: {
    backgroundColor: "#003463",
    content: {
      "&$expanded": {
        margin: 0
      }
    }
    // margin: 0
  },
  typographyH: {
    backgroundColor: "#003463",
    color: "white",
    marginRight: "1%"
  },
  muiTableRow: {
    backgroundColor: "#f4f5fa"
  }
});
function RTSUserDataTable(props) {
  const [userData, setUserData] = useState({});
  const userInputData = props.data;
  useEffect(() => {
    setUserData(userInputData);
  }, [userInputData]);

  const classes = useClasses(styles);
  let searchParamValues = userData["SEARCHPARAMETERSVALUE"];
  let searchParamNames = userData["SEARCHPARAMETERSNAME"];
  let searchParamNames1 = [];
  let searchParamValues1 = [];
  if (searchParamNames !== undefined && searchParamNames.length > 0) {
    for (let i = 0; i < searchParamNames.length; i++) {
      if (searchParamNames[i] === "NAME1") {
        searchParamNames1[0] = searchParamNames[i];
        searchParamValues1[0] = searchParamValues[i];
      }
      if (searchParamNames[i] === "NAME3") {
        searchParamNames1[1] = searchParamNames[i];
        searchParamValues1[1] = searchParamValues[i];
      }
      if (searchParamNames[i] === "NAME5") {
        searchParamNames1[2] = searchParamNames[i];
        searchParamValues1[2] = searchParamValues[i];
      }
      if (searchParamNames[i] === "PASSPORTNO") {
        searchParamNames1[3] = searchParamNames[i];
        searchParamValues1[3] = searchParamValues[i];
      }
      if (searchParamNames[i] === "ACCOUNTNO") {
        searchParamNames1[4] = searchParamNames[i];
        searchParamValues1[4] = searchParamValues[i];
      }
      if (searchParamNames[i] === "NAME2") {
        searchParamNames1[5] = searchParamNames[i];
        searchParamValues1[5] = searchParamValues[i];
      }
      if (searchParamNames[i] === "NAME4") {
        searchParamNames1[6] = searchParamNames[i];
        searchParamValues1[6] = searchParamValues[i];
      }
      if (searchParamNames[i] === "DATEOFBIRTH") {
        searchParamNames1[7] = searchParamNames[i];
        searchParamValues1[7] = searchParamValues[i];
      }
      if (searchParamNames[i] === "NATIONALIDVALUE") {
        searchParamNames1[8] = searchParamNames[i];
        searchParamValues1[8] = searchParamValues[i];
      }
      if (searchParamNames[i] === "CUSTOMERID") {
        searchParamNames1[9] = searchParamNames[i];
        searchParamValues1[9] = searchParamValues[i];
      }
    }
  }
  const dataMap = new Map();
  searchParamNames1.filter((each, index) => {
    dataMap.set(each, searchParamValues1[index]);
  });

  return (
    <Accordion>
      <AccordionSummary
        className={classes.MuiAccordionSummary}
        expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.typographyH}>
          Real Time Scanning Search
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow className={classes.muiTableRow}>
                <TableCell
                  style={{
                    padding: "8px"
                  }}
                  className={clsx(
                    "rounded-tl-lg w-1/4 p-12",
                    classes.muiTableCell
                  )}
                >
                  <b>NAME/NIC 1</b>
                </TableCell>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("w-1/4", classes.muiTableCell)}
                >
                  {dataMap.get("NAME1") ? dataMap.get("NAME1") : ""}
                </TableCell>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("w-1/4", classes.muiTableCell)}
                >
                  <b>NAME/NIC 2</b>
                </TableCell>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("rounded-tr-lg w-1/4", classes.muiTableCell)}
                >
                  {dataMap.get("NAME2") ? dataMap.get("NAME2") : ""}
                </TableCell>
              </TableRow>
              <TableRow className={classes.muiTableRow}>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("w-1/4", classes.muiTableCell)}
                >
                  <b>NAME/NIC 3</b>
                </TableCell>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("w-1/4", classes.muiTableCell)}
                >
                  {dataMap.get("NAME3") ? dataMap.get("NAME3") : ""}
                </TableCell>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("w-1/4", classes.muiTableCell)}
                >
                  <b>NAME/NIC 4</b>
                </TableCell>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("w-1/4", classes.muiTableCell)}
                >
                  {dataMap.get("NAME4") ? dataMap.get("NAME4") : ""}
                </TableCell>
              </TableRow>
              <TableRow className={classes.muiTableRow}>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("w-1/4", classes.muiTableCell)}
                >
                  <b>NAME/NIC 5</b>
                </TableCell>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("w-1/4", classes.muiTableCell)}
                >
                  {dataMap.get("NAME5") ? dataMap.get("NAME5") : ""}
                </TableCell>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("w-1/4", classes.muiTableCell)}
                >
                  <b>DATEOFBIRTH</b>
                </TableCell>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("w-1/4", classes.muiTableCell)}
                >
                  {dataMap.get("DATEOFBIRTH") ? dataMap.get("DATEOFBIRTH") : ""}
                </TableCell>
              </TableRow>
              <TableRow className={classes.muiTableRow}>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("w-1/4", classes.muiTableCell)}
                >
                  <b>PASSPORTNO</b>
                </TableCell>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("w-1/4", classes.muiTableCell)}
                >
                  {dataMap.get("PASSPORTNO") ? dataMap.get("PASSPORTNO") : ""}
                </TableCell>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("w-1/4", classes.muiTableCell)}
                >
                  <b>NIC No</b>
                </TableCell>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("w-1/4", classes.muiTableCell)}
                >
                  {dataMap.get("NATIONALIDVALUE")
                    ? dataMap.get("NATIONALIDVALUE")
                    : ""}
                </TableCell>
              </TableRow>
              <TableRow className={classes.muiTableRow}>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx(" rounded-bl-lg w-1/4", classes.muiTableCell)}
                >
                  <b>ACCOUNTNO</b>
                </TableCell>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("w-1/4", classes.muiTableCell)}
                >
                  {dataMap.get("ACCOUNTNO") ? dataMap.get("ACCOUNTNO") : ""}
                </TableCell>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx("w-1/4", classes.muiTableCell)}
                >
                  <b>CUSTOMERID</b>
                </TableCell>
                <TableCell
                  style={{ padding: "8px" }}
                  className={clsx(" rounded-br-lg w-1/4", classes.muiTableCell)}
                >
                  {dataMap.get("CUSTOMERID") ? dataMap.get("CUSTOMERID") : ""}
                </TableCell>
              </TableRow>
              <TableRow style={{ backgroundColor: "white" }}></TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}
export default RTSUserDataTable;
