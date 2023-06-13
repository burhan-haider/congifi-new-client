import React, { useState, useEffect } from "react";
import { GenericDatagrid, GenericDatatable, useClasses, styles } from "@application";
import ReportAndScenariosBottomContainer from "./ReportAndScenariosBottomContainer";
import { Paper, Box } from "@mui/material";

function ReportAndScenariosComponent(props) {

  const feature = props.feature;
  const classes = useClasses(styles);

  const selectionIndex = "all";

  const [dataSelected, setDataSelected] = useState([]);

  useEffect(() => {
    console.log("Reports Index Page Data:-", props.indexPageData);
    console.log("Page Data Type:-", typeof props.indexPageData)
  })

  return (
    <Paper className={`${classes.root} shadow-none`}>
      <Box className="moduleName">{feature.breadCrumbs[feature.breadCrumbs.length - 1].label}</Box>
      {/* <GenericDatatable
        dataSet={props.indexPageData}
        // moduleName="IBA Alerts"
        moduleName={
          props.indexPageData.length > 0
            ? props.indexPageData.MODULENAME
            : "IBA ALerts"
        }
        isSelection={false}
        isMultipleSelect={false}
        selectionIndex={selectionIndex}
        infoEnabled={true}
        BottomContainer={ReportAndScenariosBottomContainer}
        selected={dataSelected}
        selectHandler={setDataSelected}
      /> */}
      <div className="p-5" >
        {(props.indexPageData && Object.keys(props.indexPageData).length > 0) && (
          <GenericDatagrid
            tableData={props.indexPageData}
            title={
              props.indexPageData && Object.keys(props.indexPageData).length > 0
                ? props.indexPageData.MODULENAME
                : "IBA ALerts"
            }
            utilColumn={'info'}
            // selectedData={dataSelected}
            // setSelectedData={setDataSelected}
            ComponentBottomContainer={ReportAndScenariosBottomContainer}
          />
        )}
      </div>

    </Paper>
  );
}
export default ReportAndScenariosComponent;
