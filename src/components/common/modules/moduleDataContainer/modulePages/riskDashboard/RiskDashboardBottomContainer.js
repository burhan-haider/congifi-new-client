import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useClasses } from '@application'
import { 
    Table, 
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell,
    TableContainer,
    Grid,
    Typography, 
} from "@mui/material";
import { GenericDatatable, GenericTooltip } from "@application";

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

const RiskDashboardBottomContainer = (props) => {

    const { moduleName, headers, row, changeComponentView, internalData } = props;
    const [dataSelected, setDataSelected] = useState([]);
    const [dataSet, setDataSet] = useState([]);
    const classes = useClasses(styles);
    const dispatch = useDispatch();
    const bottomTableHeader = row[0];

    let searchData = {
        MODULENAME: headers[0].label,
        VIEWTYPE: "ALL",
        MODULENAME: "Risk Dashboard",
        GROUP: "RISKDASHBOARD",
        DATA:  internalData[row[0]] ? internalData[row[0]].listResultData : [],
        HEADER: internalData[row[0]] ? internalData[row[0]].listResultHeader[0] : []
    };
    

    return(
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
                    dataSet={searchData}
                    moduleName={bottomTableHeader}
                    selected={dataSelected}
                    selectHandler={setDataSelected}
                />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default RiskDashboardBottomContainer;