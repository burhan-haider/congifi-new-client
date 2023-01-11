import React, { useEffect, useState } from "react";
// import { makeStyles } from "@mui/styles";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
  Grid
} from "@mui/material";
import { GenericTooltip } from "@application";
import httpService from "services/httpservice/httpService";
import CWFDetailsBottomPanel from "./CWFDetailsBottomPanel";
import { useClasses } from "@application";

const styles = theme => ({
  table: {
    minWidth: 750,
    cursor: "pointer"
  },
  tableRow: {
    backgroundColor: "#494949"
  },
  tableHead: {
    backgroundColor: "#f4f5fa"
  },
  tableCell: {
    fontSize: "0.75rem",
    color: "#f4f5fa"
  },
  headerLabels: {
    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#353535"
  }
});

function CWFDetailsBottomContainer(props) {
  const {
    headers,
    row,
    changeComponentView,
    bottomAction,
    reloadData,
    inputParams
  } = props;
  const classes = useClasses(styles);
  const caseNo = row[0];
  const [tabDataSet, setTabDataSet] = new useState({});

  useEffect(() => {
    const cwfData = async () => {
      const result = await new Promise((resolve, reject) => {
        httpService
          .post(
            "/caseworkflow/getCWFCaseAndCommentsDetails",
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem(
                  "cognifi_token"
                )}`
              }
            },
            {
              params: { actionCode: "", caseNo: caseNo }
            }
          )
          .then(response => {
            if (response.status === 200) {
              resolve(response.data);
            } else {
              reject(response.data.err);
            }
          });
      });

      return result;
    };

    cwfData().then(response => {
      setTabDataSet(response.CASECOMMENTS);
    });
  }, [caseNo, setTabDataSet]);

  const dataSet = {
    "Case Comments History": tabDataSet
  };

  //console.log("dataSet = ", dataSet);

  return (
    <React.Fragment>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="small"
          aria-label="generic table"
        >
          <TableHead className={classes.tableHead}>
            <TableRow>
              {headers.map(headCell => (
                <TableCell
                  id={headCell.id}
                  key={headCell.id}
                  align="center"
                  padding="default"
                >
                  <Typography className={classes.headerLabels}>
                    {headCell.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              role="checkbox"
              tabIndex={-1}
              className={classes.tableRow}
              onClick={event => changeComponentView(null)}
            >
              {row.length
                ? row.map((eachColumn, index) => {
                    if (eachColumn === null) {
                      eachColumn = "N.A.";
                    }
                    return (
                      <GenericTooltip
                        title={eachColumn}
                        key={index + "~^^~" + eachColumn}
                      >
                        <TableCell
                          id={
                            headers[index]
                              ? headers[index].id
                              : "" + "~^^~" + eachColumn
                          }
                          key={
                            headers[index]
                              ? headers[index].id
                              : "" + "~^^~" + eachColumn
                          }
                          align="center"
                          className={classes.tableCell}
                        >
                          {eachColumn}
                        </TableCell>
                      </GenericTooltip>
                    );
                  })
                : null}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <CWFDetailsBottomPanel
            data={dataSet}
            bottomAction={bottomAction}
            dataRow={row}
            reloadData={reloadData}
            inputParams={inputParams}
          />
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="flex-start"
        justify="flex-end"
        direction="row"
        style={{ marginRight: 15, marginBottom: 10 }}
      ></Grid>
    </React.Fragment>
  );
}

export default CWFDetailsBottomContainer;
