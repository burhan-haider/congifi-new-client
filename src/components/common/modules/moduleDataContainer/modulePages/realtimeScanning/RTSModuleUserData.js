import React, { useState, useEffect } from "react";
import {
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Table,
} from "@mui/material";
import { makeStyles } from '@mui/styles'
import clsx from "clsx";
import { useClasses } from "@application";

const styles = theme => ({
  typographyH: {
    backgroundColor: "#003463",
    color: "white",
    marginRight: "1%"
  },

  muiTableCell: {
    padding: "10px"
    //backgroundColor: "#f4f5fa"
  },
  muiTableRow: {
    backgroundColor: "#f4f5fa"
  }
});
function RTSModuleUserData(props) {
  const [userData, setUserData] = useState({});
  const userInputData = props.userData;
  //console.log("useData = ", userData);
  useEffect(() => {
    setUserData(userInputData);
  }, [userInputData]);

  const classes = useClasses(styles);
  let searchParamValues = userData["SEARCHPARAMETERSVALUE"];
  let searchParamNames = userData["SEARCHPARAMETERSNAME"];
  let loggedUser = props.loggedUser;
  let serialNumber = props.serialNo;
  let currentDate = props.currentDate;
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
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow className={classes.muiTableRow}>
            <TableCell className={clsx("border w-1/4 ", classes.muiTableCell)}>
              NAME 1
            </TableCell>
            <TableCell className={clsx("border w-1/4")}>
              {dataMap.get("NAME1") ? dataMap.get("NAME1") : ""}
            </TableCell>
          </TableRow>
          <TableRow className={classes.muiTableRow}>
            <TableCell className={clsx("border w-1/4", classes.muiTableCell)}>
              NAME 2
            </TableCell>
            <TableCell className={clsx("border w-1/4")}>
              {dataMap.get("NAME2") ? dataMap.get("NAME2") : ""}
            </TableCell>
          </TableRow>
          <TableRow className={classes.muiTableRow}>
            <TableCell className={clsx("border w-1/4", classes.muiTableCell)}>
              NAME 3
            </TableCell>
            <TableCell className={clsx("border w-1/4")}>
              {dataMap.get("NAME3") ? dataMap.get("NAME3") : ""}
            </TableCell>
          </TableRow>
          <TableRow className={classes.muiTableRow}>
            <TableCell className={clsx("border w-1/4", classes.muiTableCell)}>
              NAME 4
            </TableCell>
            <TableCell className={clsx("border w-1/4")}>
              {dataMap.get("NAME4") ? dataMap.get("NAME4") : ""}
            </TableCell>
          </TableRow>
          <TableRow className={classes.muiTableRow}>
            <TableCell className={clsx("border w-1/4", classes.muiTableCell)}>
              NAME 5
            </TableCell>
            <TableCell className={clsx("border w-1/4")}>
              {dataMap.get("NAME5") ? dataMap.get("NAME5") : ""}
            </TableCell>
          </TableRow>
          <TableRow className={classes.muiTableRow}>
            <TableCell className={clsx("border w-1/4", classes.muiTableCell)}>
              DATEOFBIRTH
            </TableCell>
            <TableCell className={clsx("border w-1/4")}>
              {dataMap.get("DATEOFBIRTH") ? dataMap.get("DATEOFBIRTH") : ""}
            </TableCell>
          </TableRow>
          <TableRow className={classes.muiTableRow}>
            <TableCell className={clsx("border w-1/4", classes.muiTableCell)}>
              PASSPORTNO
            </TableCell>
            <TableCell className={clsx("border w-1/4")}>
              {dataMap.get("PASSPORTNO") ? dataMap.get("PASSPORTNO") : ""}
            </TableCell>
          </TableRow>
          <TableRow className={classes.muiTableRow}>
            <TableCell className={clsx("border w-1/4", classes.muiTableCell)}>
              PANNO
            </TableCell>
            <TableCell className={clsx("border w-1/4")}>
              {dataMap.get("NATIONALIDVALUE")
                ? dataMap.get("NATIONALIDVALUE")
                : ""}
            </TableCell>
          </TableRow>
          <TableRow className={classes.muiTableRow}>
            <TableCell className={clsx("border w-1/4", classes.muiTableCell)}>
              ACCOUNTNO
            </TableCell>
            <TableCell>
              {dataMap.get("ACCOUNTNO") ? dataMap.get("ACCOUNTNO") : ""}
            </TableCell>
          </TableRow>
          <TableRow className={classes.muiTableRow}>
            <TableCell className={clsx("border w-1/4", classes.muiTableCell)}>
              CUSTOMERID
            </TableCell>
            <TableCell className={clsx("border w-1/4")}>
              {dataMap.get("CUSTOMERID") ? dataMap.get("CUSTOMERID") : ""}
            </TableCell>
          </TableRow>
          <TableRow className={classes.muiTableRow}>
            <TableCell className={clsx("border w-1/4", classes.muiTableCell)}>
              USERCODE
            </TableCell>
            <TableCell className={clsx("border w-1/4")}>{loggedUser}</TableCell>
          </TableRow>
          <TableRow className={classes.muiTableRow}>
            <TableCell className={clsx("border w-1/4", classes.muiTableCell)}>
              SERIALNO
            </TableCell>
            <TableCell className={clsx("border w-1/4")}>
              {serialNumber}
            </TableCell>
          </TableRow>
          <TableRow className={classes.muiTableRow}>
            <TableCell className={clsx("border w-1/4", classes.muiTableCell)}>
              UPLOADEDDATE
            </TableCell>
            <TableCell className={clsx("border w-1/4")}>
              {currentDate}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default RTSModuleUserData;
