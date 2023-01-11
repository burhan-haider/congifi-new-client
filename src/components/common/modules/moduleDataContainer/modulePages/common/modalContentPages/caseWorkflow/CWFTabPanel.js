import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Typography, Divider } from "@mui/material";
import { GenericDatatable } from "@application";
import Box from "@mui/material/Box";
import commonService from "services/common/commonService";
import Grid from "@mui/material/Grid";
import _ from "lodash";
import ActionRegistry from "components/common/modules/actionregistry";

function CWFDetailsTabPanel(props) {
  //console.log(props.data);

  const {
    classes,
    data,
    value,
    index,
    displayType,
    activeTabIndex,
    bottomAction,
    dataRow,
    reloadData,
    inputParams,
    ...other
  } = props;

  const [dataSelected, setDataSelected] = useState([]);
  const [showActionComponent, setShowActionComponent] = useState(false);
  const [actionComponent, setActionComponent] = useState(false);

  function actionHandler(actionComp) {
    if (actionComp && actionComp != null) {
      setShowActionComponent(true);
      setActionComponent(actionComp);
    }
  }

  //console.log(dataSelected);
  const selectionIndex = "all";
  //const selectionIndex = "0,1";
  const currentValue = parseInt(value, 10);
  const currentIndex = parseInt(index, 10);
  //console.log(parseInt(value, 10) !== parseInt(index, 10));
  //console.log(Object.entries(data));

  // 30.06.2020
  const keys =
    data && data !== null && data.length > 0 ? Object.keys(data[0]) : [];
  let values = [];
  //console.log("------");
  values = Object.entries(data).map((dataMap, index) => {
    let eachRow = Object.entries(dataMap[1]).map((map, index) => {
      return map[1];
    });
    //console.log(eachRow);
    return eachRow;
  });

  //console.log("keys = ", keys);
  //console.log("values = ", values);

  const tableData = {
    HEADER: keys,
    DATA: values
  };

  if (displayType === "D") {
    return (
      <div
        role="tabpanel"
        hidden={currentValue !== currentIndex}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        style={{ marginTop: "25px" }}
        {...other}
      >
        {/* <h3>{currentIndex}</h3> */}
        {currentValue === currentIndex ? (
          <React.Fragment>
            {activeTabIndex === value && showActionComponent
              ? actionComponent
              : null}
            {/* {data.length !== 0 ? ( */}
            <Typography className={classes.heading}>
              Comments History
            </Typography>
            {/* ) : null} */}

            <Box p={3} className={classes.tabPanelBox}>
              {values.length !== 0
                ? _.chunk(values, 2).map((eachSet, index) => {
                    
                    return (
                      <React.Fragment key={index}>
                        <div style={{ marginBottom: "25px" }} key={index}>
                          <Grid container spacing={2}>
                            {eachSet.map((rowChunk, index) => {
                              
                              return (
                                <React.Fragment key={index}>
                                  <Grid
                                    item
                                    xs={3}
                                    className={classes.tabPanelGridItems}
                                  >
                                    <Typography
                                      className={clsx(
                                        classes.tabPanelTypography
                                      )}
                                    >
                                      {commonService.getLabel(
                                        rowChunk[0],
                                        rowChunk[0]
                                      )}
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={3}
                                    className={classes.tabPanelGridItems}
                                  >
                                    <Typography
                                      className={clsx(
                                        "rounded-lg bg-white p-1",
                                        classes.tabPanelTypography
                                      )}
                                    >
                                      {rowChunk[1]}
                                    </Typography>
                                  </Grid>
                                </React.Fragment>
                              );
                            })}
                          </Grid>
                        </div>
                        {/* {data.length > 1 ? (
                          <Divider
                            key={index + 1}
                            variant="middle"
                            style={{
                              margin: "0 0 20px 0",
                              backgroundColor: "#052a4f"
                            }}
                          />
                        ) : null} */}
                      </React.Fragment>
                    );
                  })
                : "No comments available"}
              {data.length > 1 ? (
                <Divider
                  key={index + 1}
                  variant="middle"
                  style={{
                    margin: "0 0 20px 0",
                    backgroundColor: "#052a4f"
                  }}
                />
              ) : null}
            </Box>

            <Grid
              container
              alignItems="flex-start"
              justify="flex-end"
              direction="row"
              style={{ marginRight: 15, marginBottom: 10 }}
            >
              {activeTabIndex === value && bottomAction
                ? bottomAction.map((actions, index) =>
                  (
                    <ActionRegistry
                      action={{
                        actionCode: actions.actionCode,
                        actionName: actions.actionName,
                        actionParams: actions.actionParams,
                      }}
                      color="primary"
                      variant="outlined"
                      key={index}
                      data={[dataRow]}
                      marginStyle={{ margin: 10 }}
                      reloadData={reloadData}
                      inputParams={inputParams}
                      fromInfo={true}
                      actionHandler={actionHandler}
                    />
                  )
                  )
                : null}
            </Grid>
            {/* ) : null} */}
          </React.Fragment>
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
            <GenericDatatable
              dataSet={tableData}
              infoEnabled={false}
              moduleCode=""
              isSelection={false}
              isMultipleSelect={false}
              selectionIndex={selectionIndex}
              selected={dataSelected}
              selectHandler={setDataSelected}
            />
          </Box>
        ) : null}
      </div>
    );
  } else {
    return null;
  }
}

CWFDetailsTabPanel.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default CWFDetailsTabPanel;
