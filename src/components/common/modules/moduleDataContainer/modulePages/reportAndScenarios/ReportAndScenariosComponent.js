import React, { useState, useEffect } from "react";
import { GenericDatatable } from "@application";
import ReportAndScenariosBottomContainer from "./ReportAndScenariosBottomContainer";

function ReportAndScenariosComponent(props) {
  const selectionIndex = "all";

  const [dataSelected, setDataSelected] = useState([]);

  useEffect(() => {
    console.log("Reports Index Page Data:-",props.indexPageData);
  })

  return (
    <div className="px-5">
      <GenericDatatable
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
      />
    </div>
  );
}
export default ReportAndScenariosComponent;
