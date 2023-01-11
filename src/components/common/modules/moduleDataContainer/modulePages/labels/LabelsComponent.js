import React, { useState, useEffect, useCallback } from "react";
import GenericDatatable from "@application/component/datatable/GenericDatatable";

function LabelsComponent(props) {
  const [dataSelected, setDataSelected] = useState([]);
  const selectionIndex = "all";

  return (
    <div className="px-8">
      <GenericDatatable
        dataSet={props.indexPageData}
        moduleName="Generic Labels"
        isSelection={true}
        isMultipleSelect={false}
        selectionIndex={selectionIndex}
        infoEnabled={false}
        selected={dataSelected}
        selectHandler={setDataSelected}
      />
    </div>
  );
}

export default LabelsComponent;
