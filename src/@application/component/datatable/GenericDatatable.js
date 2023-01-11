//Created by Vivek - 14.04.2020
import React, { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Table,
  TableContainer,
  TablePagination,
  Paper,
  Grid
} from "@mui/material";
import commonService from "services/common/commonService";
import GenericTableHead from "./GenericTableHead";
import GenericTableTopbar from "./GenericTableTopbar";
import GenericTableBody from "./GenericTableBody";
import GenericPaginationActions from "./GenericPaginationActions";
import masterModuleHyperlinks from "../hyperlinks/MasterModuleHyperlinks";
import GenericDialog from "../dialog/GenericDialog";
import HyperlinkModalContentConfig from "../hyperlinks/HyperlinkModalContentConfig";
import _ from "lodash";
import { useClasses } from "@application";

// import SearchButtonIcon from "@mui/icons-material/SearchOutlined";
// import { Button } from "@mui/material";

import ActionRegistry from "components/common/modules/actionregistry";

const styles = theme => ({
  root: {
    width: "100%",
    fontFamily: 'inherit',
  },
  container: {
    maxHeight: 400
  },
  paper: {
    width: "100%",
    borderRadius: 15,
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tablePaginationRoot: {
    "&.MuiTablePagination-input": {
      minWidth: "50px",
      borderRadius: "10px",
      fontFamily: "inherit",
      fontSize: "inherit",
      border: "solid 1px #052a4f",
      color: "#353535",
      marginRight: "15px"
    },
    "&.MuiTablePagination-caption": {
      fontFamily: "inherit",
      fontSize: "inherit",
      color: "#353535"
    }
  }
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#353535",
      secondary: "#494949"
    }
  }
});

let tempPage = 0;

function GenericDatatable(props) {

  const classes = useClasses(styles);

  const completeHeader = props.dataSet.HEADER ? props.dataSet.HEADER : [];
  const completeData = props.dataSet.DATA ? props.dataSet.DATA : [];
  const actionButtons = props.dataSet.ACTIONBUTTONS ? props.dataSet.ACTIONBUTTONS : [];
  const internalData = props.dataSet.INTERNALDATA ? props.dataSet.INTERNALDATA : [];

  const [isDatatableShown, setIsDatatableShown] = useState(true);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  //const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(tempPage);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState(completeData);
  // VIVEK - using resettedData only for filtering the fields based on resetted columns data
  const [resettedData, setResettedData] = useState(completeData);

    
  //console.log("reloadDataFunc :>> ", props.reloadData);
  // console.log("inputParams :>> ", props.inputParams);
  //console.log("Vivek - CompleteHeader", completeHeader);
  //console.log("Vivek - CompleteData", completeData);
  //console.log("Vivek - CompleteActionButton", actionButtons);
  const selectionIndex = props.selectionIndex ? props.selectionIndex : "all";
  const isSelection = props.isSelection ? props.isSelection : false;
  const isMultipleSelect = props.isMultipleSelect;
  const selected = props.selected ? props.selected : [];
  const { BottomContainer, selectHandler } = props;

  const hyperlinksMap = masterModuleHyperlinks.getAllHyperlinksData();
  const [allHeadCells, setAllHeadCells] = useState([]);
  const [resetColumnHeaders, setResetColumnHeaders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [property, setProperty] = useState({});
  const [hyperlinkContent, setHyperlinkContent] = useState({});
  const [resetColumns, setResetColumns] = useState([]);
  const [rowComponentView, setRowComponentView] = useState([]);
  const dynamicProps = props.dynamicProps ? props.dynamicProps : {};

  const hyperlinkFunction = props.hyperlinkFunction;

  //console.log("VIVEK------");
  // VIVEK - setting rows data
  useEffect(() => {
    // console.log("useEffect 1");
    // console.log("Rows:-", rows);
    console.log('Selected Data', selected)
  });

  useEffect(() => {
    console.log("useEffect 3");
    console.log("Headers:-", headers);
  },[rowComponentView]);

  useEffect(() => {
    console.log("useEffect 2");
    console.log("Props Dataset:-", props.dataSet);
    console.log("Props Dataset Length:-", props.dataSet.length);
    const intermediateAllHeadCells = [];
    const intermediateResetColumnHeaders = [];

    if(props.dataSet !== null && props.dataSet !== undefined && props.dataSet.length !== 0) {
      for (var i = 0; i < completeHeader.length; i++) {
        intermediateAllHeadCells.push({
          id: completeHeader[i],
          disablePadding: false,
          label: commonService.getLabel(completeHeader[i], completeHeader[i]),
          hyperlink: hyperlinksMap.has(completeHeader[i]),
          hyperlinkFunction: hyperlinksMap.has(completeHeader[i])
            ? hyperlinksMap.get(completeHeader[i])["function"]
            : "",
          hyperlinkTitle: hyperlinksMap.has(completeHeader[i])
            ? hyperlinksMap.get(completeHeader[i])["title"]
            : "",
          hyperlinkDetailsModule: hyperlinksMap.has(completeHeader[i])
            ? hyperlinksMap.get(completeHeader[i])["detailsModule"]
            : ""
        });
        intermediateResetColumnHeaders.push(
          i +
            "~!!~" +
            completeHeader[i] +
            "~!!~" +
            commonService.getLabel(completeHeader[i], completeHeader[i])
        );
      }
      setAllHeadCells(intermediateAllHeadCells);
      setHeaders(intermediateAllHeadCells);
      setResetColumnHeaders(intermediateResetColumnHeaders);
    }
    
  }, [
    // completeHeader, 
    hyperlinksMap
  ]);

  

  useEffect(() => {
    console.log("useEffect 4");
    if(props.dataSet !== null && props.dataSet !== undefined && Object.keys(props.dataSet).length !== 0) {
      if (resetColumns.length === 0) {
        setHeaders(allHeadCells);
        setRows(completeData);
        setResettedData(completeData);
      } else {
        var updatedHeaderList = allHeadCells;
        var updatedDataList = completeData;
        resetColumns.filter(eachItem => {
          let mainIndex = "";
          updatedHeaderList.filter((eachHeader, eachIndex) => {
            return eachHeader.id === eachItem ? (mainIndex = eachIndex) : "";
          });
  
          if (mainIndex !== "") {
            updatedHeaderList = removeItem(updatedHeaderList, mainIndex);
            setHeaders(updatedHeaderList);
  
            updatedDataList = updatedDataList.map(eachRow => {
              return removeItem(eachRow, mainIndex);
            });
            setRows(updatedDataList);
            setResettedData(updatedDataList);
          }
        });
      }
    }
    
  }, [
    allHeadCells, 
    // completeData, 
    // resetColumns
  ]);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const displayProperty = data => {
    setProperty(data.modalData);
    setHyperlinkContent(data);
  };

  const handleRequestSort = (event, requestedProperty) => {
    const isAsc = orderBy === requestedProperty && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(requestedProperty);
  };

  // VIVEK - 22.05.2020 - selection logic revamped
  const handleSelectAllClick = event => {
    if (event.target.checked) {
      // VIVEK - rows.map is for selecting the whole table data
      // const newSelecteds = rows.map((n) => n[selectionIndex]);
      const currentPageRows = _.chunk(rows, rowsPerPage)[page];
      const splits = selectionIndex.split(",");
      const newSelecteds = currentPageRows.map(n => {
        let customArray = [];
        if (splits.includes("all")) {
          customArray = n;
        } else {
          splits.filter(each => (customArray = [...customArray, n[each]]));
        }
        return customArray;
      });
      selectHandler(newSelecteds);
      return;
    }
    selectHandler([]);
  };

  const handleClick = (event, selectedRow) => {
    const selectedArray = selected.filter(elm => elm[0] === selectedRow[0]);
    let newSelected = [];
    if (selectedArray.length === 0) {
      newSelected = [...selected, selectedRow];
    } else {
      newSelected = selected.filter(elm => elm[0] !== selectedRow[0]);
    }
    selectHandler(newSelected);
  };
  //console.log("VIVEK - selected = ", selected);

  const handleRadioClick = (event, selectedRow) => {
    selectHandler(selectedRow);
  };

  const handleChangePage = (event, newPage) => {
    setPage(Number(newPage - 1));
    tempPage = Number(newPage - 1);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    tempPage = 0;
  };

  // VIVEK - datatable filter
  const filterData = event => {
    var updatedDataList = resettedData;
    updatedDataList = updatedDataList.filter(eachRow => {
      return eachRow.some(x => {
        return x !== null
          ? x.toLowerCase().search(event.target.value.toLowerCase()) !== -1
          : false;
      });
    });
    setRows(updatedDataList);
    // VIVEK - updating pagination after filtering to remove the page count exception
    setPage(0);
    tempPage = 0;
  };

  // VIVEK - reset columns
  const handleResetChange = event => {
    setResetColumns(event.target.value);
  };

  const removeItem = (items, i) => {
    const index = Number(i);
    return items.slice(0, index).concat(items.slice(index + 1, items.length));
  };

  const changeComponentView = row => {
    setIsDatatableShown(!isDatatableShown);
    if (row !== null) {
      setRowComponentView(row);
    }
  };

  // const deligateAction = actionCode => {
  //   ActionRegistry.generateAction(actionCode);
  // };

  function getHyperlinkDetails(index) {
    if (headers[index]) {
      return (
        headers[index].hyperlink +
        "~^^~" +
        headers[index].hyperlinkFunction +
        "~^^~" +
        headers[index].hyperlinkTitle +
        "~^^~" +
        headers[index].hyperlinkDetailsModule
      );
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        {isDatatableShown ? (
          //VIVEK - GenericDatatable part started
          <Paper className={classes.paper}>
            {/* VIVEK - TOPBAR PART */}
            <GenericTableTopbar
              moduleName={props.moduleName}
              filterData={filterData}
              handleResetChange={handleResetChange}
              resetColumns={resetColumns}
              resetColumnHeaders={resetColumnHeaders}
              rows={rows}
              headers={headers}
            />
            <TableContainer className={classes.container}>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size="small"
                aria-label="generic table"
              >
                {/* VIVEK - HEADER PART */}
                <GenericTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  //rowCount={rows.length}
                  rowCount={
                    rows.length < rowsPerPage ? rows.length : rowsPerPage
                  }
                  headers={headers}
                  isSelection={isSelection}
                  isMultipleSelect={isMultipleSelect}
                />
                {/* VIVEK - BODY PART */}
                <GenericTableBody
                  headers={headers}
                  rows={rows}
                  order={order}
                  orderBy={orderBy}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  selected={selected}
                  handleClick={handleClick}
                  getHyperlinkDetails={getHyperlinkDetails}
                  openModal={handleClickOpenModal}
                  displayProperty={displayProperty}
                  changeComponentView={changeComponentView}
                  infoEnabled={props.infoEnabled}
                  isSelection={isSelection}
                  selectionIndex={selectionIndex}
                  isMultipleSelect={isMultipleSelect}
                  handleRadioClick={handleRadioClick}
                  customHyperlinkFunction={hyperlinkFunction}
                  dynamicProps={dynamicProps}
                />
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 50]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={GenericPaginationActions}
              classes={{
                root: classes.tablePaginationRoot
              }}
            />

            <Grid item xs={12}>
              <Grid
                container
                alignItems="flex-start"
                justify="flex-end"
                direction="row"
                style={{ marginRight: 15, marginBottom: 10 }}
              >
                {actionButtons.length>0
                  ? actionButtons.map((actions, index) =>
                              <ActionRegistry
                                action={{
                                  actionCode: actions.actionCode,
                                  actionName: actions.actionName,
                                  actionParams: actions.actionParams
                                }}
                                color="primary"
                                variant="outlined"
                                key={index}
                                data={selected}
                                marginStyle={{ margin: 10 }}
                                reloadData={props.reloadData}
                                inputParams={props.inputParams}
                                fromInfo={false}
                                actionHandler={null}
                              />
                            )
                    
                  : null}
              </Grid>
            </Grid>
          </Paper>
        ) : (
          //VIVEK - GenericDetailsBottomContainer part started
          <BottomContainer
            moduleName={props.moduleName}
            headers={headers}
            row={rowComponentView}
            internalData={internalData}
            changeComponentView={changeComponentView}
            bottomAction={actionButtons}
            reloadData={props.reloadData}
            inputParams={props.inputParams}
          />
        )}
        <GenericDialog
          closeModal={handleCloseModal}
          state={openModal}
          property={property}
        >
          <HyperlinkModalContentConfig
            data={hyperlinkContent}
            closeModal={handleCloseModal}
          />
        </GenericDialog>
      </div>
    </ThemeProvider>
  );
}

export default GenericDatatable;
