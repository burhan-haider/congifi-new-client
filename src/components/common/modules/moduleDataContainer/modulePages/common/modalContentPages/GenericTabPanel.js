import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import { GenericDatatable, GenericDatagrid } from "@application";
import Box from "@mui/material/Box";
import commonService from "services/common/commonService";
import Grid from "@mui/material/Grid";
import _ from "lodash";

function GenericDetailsTabPanel(props) {
  //console.log(props.data);
  const { classes, data, value, index, displayType, ...other } = props;
  const [dataSelected, setDataSelected] = useState([]);
  //console.log(dataSelected);
  const selectionIndex = "all";
  //const selectionIndex = "0,1";
  const currentValue = parseInt(value, 10);
  const currentIndex = parseInt(index, 10);
  //console.log(parseInt(value, 10) !== parseInt(index, 10));

  // VIVEK - 30.06.2020
  const keys =
    data && data !== null && data.length > 0 ? Object.keys(data[0]) : [];
  let values = [];
  values = Object.entries(data).map((dataMap, index) => {
    let eachRow = Object.entries(dataMap[1]).map((map, index) => {
      return map[1];
    });
    //console.log(eachRow);
    return eachRow;
  });
  const tableData = {
    HEADER: keys,
    DATA: values
  };
  //console.log("values = ", values);

  if (displayType === "D") {
    return (
      <div
      className="min-h-[70vh]"
        role="tabpanel"
        hidden={currentValue !== currentIndex}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {/* <h3>{currentIndex}</h3> */}
        {currentValue === currentIndex ? (
          <Box p={3} className={classes.tabPanelBox}>
            {_.chunk(keys, 2).map(rowChunk => (
              <Grid container spacing={2} key={rowChunk[0]}>
                {rowChunk.map(row => (
                  <React.Fragment key={row}>
                    <Grid item xs={3} className={classes.tabPanelGridItems}>
                      <Typography className={clsx(classes.tabPanelTypography)}>
                        {`${commonService.getLabel(row, row)}: `}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.tabPanelGridItems}>
                      <Typography
                        className={clsx(
                          "p-1",
                          classes.tabPanelTypography
                        )}
                      >
                        {data[0][row]}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            ))}
          </Box>
        ) : null}
      </div>
    );
  } else if (displayType === "T") {
    return (
      <div
        role="tabpanel"
        hidden={currentValue !== currentIndex}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {/* <h3>{currentIndex}</h3> */}
        {currentValue === currentIndex ? (
          <Box p={3} className={classes.tabPanelBox}>
            <GenericDatagrid
              tableData={tableData}
              // infoEnabled={false}
              moduleCode=""
              isSelection={false}
              isMultipleSelect={false}
              selectionIndex={selectionIndex}
              selectedData={dataSelected}
              setSelectedData={setDataSelected}
              // inputParams={inputParams}
              // title={`${moduleHeader[0]} Results`}
            />
          </Box>
        ) : null}
      </div>
    );
  } else {
    return null;
  }
}

GenericDetailsTabPanel.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default GenericDetailsTabPanel;
