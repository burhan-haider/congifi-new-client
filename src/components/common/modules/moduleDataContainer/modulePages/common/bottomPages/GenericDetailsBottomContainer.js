//Created by Vivek - 20.04.2020
import React from "react";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Typography } from "@mui/material";
import { GenericTooltip, GenericButton } from "@application";
import commonService from "services/common/commonService";
import TableContainer from "@mui/material/TableContainer";
import Grid from "@mui/material/Grid";
import { GenericDetailsBottomPanel } from "../bottomPages";
import { useClasses } from "@application";

// import SearchButtonIcon from "@mui/icons-material/SearchOutlined";
import { MdOutlineSearch as SearchButtonIcon } from 'react-icons/md'

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

function GenericDetailsBottomContainer(props) {
  //console.log(props);
  const { headers, row, changeComponentView, bottomAction } = props;
  const classes = useClasses(styles);

  const dataSet = {
    "Customer Details": commonService.fetchModuleDetails(
      "customerMaster",
      row[1]
    ),
    "Account Details": commonService.fetchModuleDetails(
      "customerMaster",
      row[1]
    )
  };

  // console.log("dataSet = ", dataSet);

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
                              ? headers[index].id + "~^^~" + eachColumn
                              : eachColumn
                          }
                          key={
                            headers[index]
                              ? headers[index].id + "~^^~" + eachColumn
                              : eachColumn
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
          <GenericDetailsBottomPanel data={dataSet} />
        </Grid>
      </Grid>
      <div>
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
                        style={{ margin: 10 }}
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
      </div>
    </React.Fragment>
  );
}

export default GenericDetailsBottomContainer;
