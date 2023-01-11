//Created by Vivek - 20.04.2020
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Typography } from "@mui/material";
import { GenericTooltip, GenericButton } from "@application";
import caseWorkflowService from "services/caseWorkflow/caseWorkflowService";
import TableContainer from "@mui/material/TableContainer";
import Grid from "@mui/material/Grid";
import { ActionsBottomPanel } from "components/common/modules/moduleDataContainer/modulePages/common/bottomPages";
// import SearchButtonIcon from "@mui/icons-material/SearchOutlined";
import { MdOutlineSearch as SearchButtonIcon } from 'react-icons/md'
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

function ActionsBottomContainer(props) {
  const { headers, row, changeComponentView, bottomAction } = props;
  const classes = useClasses(styles);
  const [dataSet, setDataSet] = useState({});
  //console.log(props.moduleName);
  const moduleName = props.moduleName;
  const paramData = {};
  paramData["actionCode"] = row[2];
  if (moduleName !== "Actions List") {
    paramData["paramId"] = row[6];
  }

  /* const actionDetails = async () => {
    let unmounted = false;
    console.log(moduleName);
    const result = await new Promise((resolve, reject) => {
      if (moduleName === "Actions List") {
        caseWorkflowService
          .getActionDetails(paramData)
          .then(response => {
            if (!unmounted) {
              setDataSet(response);
            }
          })
          .catch(error => {
            if (!unmounted) {
              console.log(error);
            }
          });
      } else {
        caseWorkflowService
          .getActionParamDetails(paramData)
          .then(response => {
            setDataSet(response);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
    return () => {
      unmounted = true;
    };
  };
*/

  useEffect(() => {
    //actionDetails();
    let unmounted = false;
    if (moduleName === "Actions List") {
      caseWorkflowService
        .getActionDetails(paramData)
        .then(response => {
          if (!unmounted) {
            setDataSet(response);
          }
        })
        .catch(error => {
          if (!unmounted) {
            console.log("caseworkflow Service Error:-",error);
          }
        });
    } else {
      caseWorkflowService
        .getActionParamDetails(paramData)
        .then(response => {
          if (!unmounted) {
            setDataSet(response);
          }
        })
        .catch(error => {
          if (!unmounted) {
            console.log("caseworkflow Service Error:-",error);
          }
        });
    }
    return () => {
      unmounted = true;
    };
  });

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
          <ActionsBottomPanel data={dataSet} moduleName={props.moduleName} />
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="flex-start"
        justify="flex-end"
        direction="row"
        style={{ marginRight: 15, marginBottom: 10 }}
      >
        {bottomAction
          ? bottomAction.map(actions =>
              actions != null
                ? Object.entries(actions).map((key, value) => {
                    return (
                      <GenericButton
                        type="submit"
                        variant="outlined"
                        color="primary"
                        aria-label={key[1]}
                        className={classes.button}
                        style={{
                          margin: 10
                        }}
                        startIcon={
                          `${key[0]}`.includes("search") ? (
                            <SearchButtonIcon />
                          ) : (
                            ""
                          )
                        }
                        //disabled={!isFormValid}
                        value={key[0]}
                        key={value}
                      >
                        {key[1]}
                      </GenericButton>
                    );
                  })
                : null
            )
          : null}
      </Grid>
    </React.Fragment>
  );
}

export default ActionsBottomContainer;
