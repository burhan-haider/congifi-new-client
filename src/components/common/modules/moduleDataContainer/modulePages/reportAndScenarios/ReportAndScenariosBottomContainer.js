import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { makeStyles } from "@mui/styles";
import { useClasses } from '@application'
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Typography } from "@mui/material";
import httpService from "services/httpservice/httpService";
import commonService from "services/common/commonService";
import TableContainer from "@mui/material/TableContainer";
import Grid from "@mui/material/Grid";
import { GenericDatatable, GenericTooltip } from "@application";
import * as ScenariosActions from "redux/scenarios/scenariosdetails.actions";
import * as ReportsActions from "redux/reports/reportsdetails.actions";

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
    fontSize: "14px",
    fontWeight: "bold",
    color: "#353535"
  }
});

function ReportAndScenariosBottomContainer(props) {
  //console.log(props);
  const { moduleName, headers, row, changeComponentView } = props;
  const [dataSelected, setDataSelected] = useState([]);
  const [dataSet, setDataSet] = useState([]);
  const classes = useClasses(styles);
  const dispatch = useDispatch();

  let { bottomTableHeader, Url } = "";
  if (moduleName.includes("Reports")) {
    const group = commonService.makeUpperCaseString(moduleName);
    Url = `/api/reports/reportBenchMarksList/${group}/ALL/${row[0]}`;
    bottomTableHeader = "Assigned Report Parameters List";
  } else if (moduleName.includes("Alerts")) {
    Url = `/api/scenarios/alertBenchMarksList/ALL/${row[0]}`;
    bottomTableHeader = "Assigned Alert Parameters List";
  }

  useEffect(() => {
    const fetchBenchMarksList = async () => {
      const result = await new Promise((resolve, reject) => {
        httpService.post(Url).then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        });
      });
      //console.log(result);
      return result;
    };
    fetchBenchMarksList().then(response => {
      setDataSet(response);
    });
    const reducerData = {
      moduleName: moduleName,
      row: row
    };
    if (moduleName.includes("Reports")) {
      dispatch(ReportsActions.reportsDetails(reducerData));
    } else if (moduleName.includes("Alerts")) {
      dispatch(ScenariosActions.scenariosDetails(reducerData));
    }
  }, [Url, dispatch, moduleName, row]);

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
                  padding="none"
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
                    //return <TableCell align="right">{eachColumn}</TableCell>
                    if (eachColumn === null) {
                      eachColumn = "N.A.";
                    }
                    return (
                      <GenericTooltip
                        title={eachColumn}
                        key={index + "~^^~" + eachColumn}
                      >
                        <TableCell
                          //id={eachColumn}
                          id={
                            headers[index]
                              ? headers[index].id
                              : "~^^~" + eachColumn
                          }
                          key={
                            headers[index]
                              ? headers[index].id
                              : "~^^~" + eachColumn
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
          <GenericDatatable
            dataSet={dataSet.BENCHMARKLIST ? dataSet.BENCHMARKLIST : []}
            moduleName={bottomTableHeader}
            isSelection={false}
            isMultipleSelect={false}
            infoEnabled={false}
            selected={dataSelected}
            selectHandler={setDataSelected}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ReportAndScenariosBottomContainer;
