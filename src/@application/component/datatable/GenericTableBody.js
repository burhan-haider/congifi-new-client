//Created by Vivek - 20.04.2020
import React from "react";
import { makeStyles } from "@mui/styles";
import {
  TableBody,
  TableCell,
  TableRow,
  Checkbox
} from "@mui/material";
import GenericTooltip from "../tooltip/GenericTooltip";
import masterModuleHyperlinks from "../hyperlinks/MasterModuleHyperlinks";
import Link from "@mui/material/Link";
// import InfoIcon from "@mui/icons-material/InfoOutlined";
import { MdOutlineInfo as InfoIcon } from 'react-icons/md'
import Radio from "@mui/material/Radio";
import { useDispatch } from "react-redux";
import * as ActionManagementActions from "redux/actionManagement/actionManagement.actions";
import { useClasses } from "@application";

const styles = theme => ({
  /// VIVEK - TABLEROW AND TABLECELL
  tableRow: {
    backgroundColor: "#f4f5fa",
    "&$selected, &$selected:hover": {
      backgroundColor: "#494949"
    },
    "&.Mui-selected": {
      backgroundColor: "#494949 !important",
      color: "#fff !important",
    }
  },
  tableCell: {
    fontSize: "13px !important",
    fontFamily: 'GoogleSans-Regular',
    color: "#353535",
  },
  tableCellSelected: {
    fontSize: "13px !important",
    fontFamily: 'GoogleSans-Regular',

    color: "#fff !important",
  },
  hover: {},
  selected: {
    color: "#fff !important",
    fontFamily: 'GoogleSans-Regular',
    backgroundColor: "#494949 !important"
  },
  hyperlink: {
    color: "#052a4f",
    fontFamily: 'GoogleSans-Regular',
    "$selected &": {
      color: "#fff"
    }
  },
  // VIVEK - CHECKBOX
  checkboxRoot: {
    color: "#052a4f",
    "&#checked": {
      color: "#fff"
    },
  },
  checked: {
    color: "#fff !important",
  },

  //
});

// VIVEK - Sorting the columns
function descendingComparator(a, b, columnIndex) {
  // console.log(a[columnIndex] + "---" + isNaN(a[columnIndex]));
  // console.log(b[columnIndex] + "---" + isNaN(b[columnIndex]));
  if (!isNaN(a[columnIndex]) && !isNaN(b[columnIndex])) {
    // console.log("Is Numeric");
    if (parseInt(b[columnIndex], 10) < parseInt(a[columnIndex], 10)) {
      return -1;
    }
    if (parseInt(b[columnIndex], 10) > parseInt(a[columnIndex], 10)) {
      return 1;
    }
    return 0;
  } else {
    // console.log("Not Numeric");
    if (b[columnIndex] < a[columnIndex]) {
      return -1;
    }
    if (b[columnIndex] > a[columnIndex]) {
      return 1;
    }
    return 0;
  }
}

function getComparator(order, columnIndex) {
  //console.log("Vivek - column = ",columnIndex);
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, columnIndex)
    : (a, b) => -descendingComparator(a, b, columnIndex);
}

let sortedData = [];
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  sortedData = stabilizedThis.map(el => el[0]);
  //return stabilizedThis.map(el => el[0]);
  return sortedData;
}

function GenericTableBody(props) {
  const {
    headers,
    rows,
    order,
    orderBy,
    page,
    rowsPerPage,
    selected,
    handleClick,
    getHyperlinkDetails,
    openModal,
    displayProperty,
    changeComponentView,
    infoEnabled,
    selectionIndex,
    isSelection,
    isMultipleSelect,
    handleRadioClick,
    dynamicProps,
    customHyperlinkFunction
  } = props;

  const dispatch = useDispatch();

  // VIVEK - isSelected logic here
  const isSelected = (isMultipleSelect, firstColumnData) => {
    return isMultipleSelect
      ? selected.filter(eachRow => eachRow[0] === firstColumnData).length === 1
      : selected[0] === firstColumnData;
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const classes = useClasses(styles);

  function getColumnIndex(columnName) {
    for (var i = 0; i < headers.length; i++) {
      if (headers[i].id === columnName) {
        return i;
      }
    }
    return -1;
  }

  // VIVEK - 25.08.2020 - NEW LOGIC
  function hyperLinkClick(
    hyperlinkColumn,
    hyperlinkFunction,
    hyperlinkTitle,
    hyperlinkDetailsModule,
    rowIndex,
    columnIndex
  ) {
    console.group("Old Table Log")
    console.log("Hyper Link Column:-", hyperlinkColumn);
    console.log("Hyper Link Function:-", hyperlinkFunction);
    console.log("Hyper Link Title:-", hyperlinkTitle);
    console.log("Hyper Link Details Module:-", hyperlinkDetailsModule);
    console.log("row Index:-", rowIndex);
    console.log("column Index:-", columnIndex);
    console.groupEnd()
    // console.log(
    //   rowIndex + "---" + columnIndex + "---" + rows[rowIndex][columnIndex]
    // );
    const hyperlinkRow = sortedData[rowIndex];
    // console.log("hyperlinkRow:-", hyperlinkRow);
    const data = masterModuleHyperlinks.hyperlinkFunction(
      hyperlinkColumn,
      hyperlinkFunction,
      hyperlinkTitle,
      hyperlinkDetailsModule,
      hyperlinkRow,
      rowIndex,
      columnIndex,
      dynamicProps
    );

    if (!props.customHyperlinkFunction) {
      displayProperty(data);
      openModal();
    } else {
      customHyperlinkFunction();
      const actionCode = hyperlinkRow[columnIndex];
      //console.log(actionCode);
      dispatch(ActionManagementActions.getCWFCases(actionCode));
    }
  }

  return (
    <TableBody>
      {stableSort(rows, getComparator(order, getColumnIndex(orderBy)))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, rowIndex) => {
          // VIVEK - data selection logic here
          const customArray = [];
          const splits = selectionIndex.split(",");
          if (splits.includes("all")) {
            customArray.push(...row);
          } else {
            splits.filter(each => {
              return customArray.push(row[each]);
            });
          }
          //console.log(customArray);
          const isItemSelected = isSelected(isMultipleSelect, row[0]);
          return (
            <TableRow
              hover
              // VIVEK - this is for selecting the row on clicking anywhere
              /*onClick={event =>
                handleClick(event, row[0])
              }*/
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={rowIndex}
              selected={isItemSelected}
              classes={!isItemSelected ? {
                root: classes.tableRow,
                hover: classes.hover,
              } : {
                selected: classes.selected
              }}
            >
              <TableCell padding="checkbox" className="flex items-center w-full py-4 ">
                {isSelection === true ? (
                  isMultipleSelect === true ? (
                    <Checkbox
                      id={row[0] + "_" + rowIndex}
                      onClick={event =>
                        // VIVEK - row[0] is the column data to get after selecting the checkbox
                        handleClick(event, customArray)
                      }
                      checked={isItemSelected}
                      size="small"
                      classes={{
                        root: classes.checkboxRoot,
                        checked: classes.checked
                      }}
                    />
                  ) : (
                    <Radio
                      id={row[0] + "_" + rowIndex}
                      checked={isItemSelected}
                      size="small"
                      onChange={event => handleRadioClick(event, customArray)}
                      value={row[0]}
                      name={row[0] + "_" + rowIndex}
                      classes={!isItemSelected ? {
                        root: classes.checkboxRoot,
                      } : {
                        checked: classes.checked
                      }}
                    />
                  )
                ) : null}
                {infoEnabled ? (
                  <InfoIcon
                    fontSize={"18px"}
                    color="action"
                    onClick={event => changeComponentView(row)}
                    className="ml-2 cursor-pointer"
                  />
                ) : null}
              </TableCell>
              {row.length
                ? row.map((eachColumn, columnIndex) => {
                  if (eachColumn === null) {
                    eachColumn = "N.A.";
                  }
                  const hyperlinkDetails = getHyperlinkDetails(columnIndex);
                  const hyperlinkFunction = hyperlinkDetails
                    ? hyperlinkDetails.split("~^^~")[1]
                    : null;
                  const hyperlinkTitle = hyperlinkDetails
                    ? hyperlinkDetails.split("~^^~")[2]
                    : null;
                  const hyperlinkDetailsModule = hyperlinkDetails
                    ? hyperlinkDetails.split("~^^~")[3]
                    : null;
                  if (
                    hyperlinkDetails &&
                    hyperlinkDetails !== null &&
                    hyperlinkDetails.split("~^^~")[0] === "true"
                  ) {
                    return (
                      <GenericTooltip
                        title={eachColumn}
                        key={columnIndex + "~^^~" + eachColumn}
                      >
                        <TableCell
                          //id={eachColumn}
                          id={headers[columnIndex].id + "~^^~" + eachColumn}
                          key={headers[columnIndex].id + "~^^~" + eachColumn}
                          align="left"
                          className={!isItemSelected ? classes.tableCell : classes.tableCellSelected}
                        >
                          <Link
                            href="#"
                            onClick={event => {
                              hyperLinkClick(
                                headers[columnIndex].id,
                                hyperlinkFunction,
                                hyperlinkTitle,
                                hyperlinkDetailsModule,
                                rowIndex,
                                columnIndex
                              );
                            }}
                            className={classes.hyperlink}
                          >
                            {eachColumn}
                          </Link>
                        </TableCell>
                      </GenericTooltip>
                    );
                  } else {
                    return (
                      <GenericTooltip
                        title={eachColumn}
                        key={columnIndex + "~^^~" + eachColumn}
                      >
                        <TableCell
                          id={
                            headers[columnIndex]
                              ? headers[columnIndex].id
                              : "" + "~^^~" + eachColumn
                          }
                          key={
                            headers[columnIndex]
                              ? headers[columnIndex].id
                              : "" + "~^^~" + eachColumn
                          }
                          align="left"
                          className={!isItemSelected ? classes.tableCell : classes.tableCellSelected}
                        >
                          {eachColumn}
                        </TableCell>
                      </GenericTooltip>
                    );
                  }
                })
                : null}
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 3 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}

export default GenericTableBody;
