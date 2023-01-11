//Created by Vivek - 18.04.2020
import React from "react";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import { useClasses } from "@application";

const styles = theme => ({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  headerLabels: {
    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#353535"
    // align: "left"
  },
  tableHead: {
    backgroundColor: "#f4f5fa"
  },
  // VIVEK - CHECKBOX
  checkboxRoot: {
    color: "#052a4f",
    "&$checked": {
      color: "#052a4f"
    }
  },
  checked: {},

  tableHeadertoBeHide: {
    display: "none"
  }
});

function RTSGenericTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headers,
    isSelection,
    isMultipleSelect
  } = props;
  const classes = useClasses(styles);
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        <TableCell padding="checkbox">
          {isSelection === true ? (
            isMultipleSelect === true ? (
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                size="small"
                color="default"
                classes={{
                  root: classes.checkboxRoot,
                  checked: classes.checked
                }}
              />
            ) : null
          ) : null}
        </TableCell>

        {headers.map(headCell => (
          <TableCell
            id={headCell.id}
            key={headCell.id}
            align={headCell.numeric ? "left" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={
              headCell.id === "app.common.UNIQUENUMBER"
                ? classes.tableHeadertoBeHide
                : null
            }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography className={classes.headerLabels}>
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

RTSGenericTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headers: PropTypes.array.isRequired
};

export default RTSGenericTableHead;
