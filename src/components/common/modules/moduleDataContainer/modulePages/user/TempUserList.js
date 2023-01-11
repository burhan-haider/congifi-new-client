import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import UserOperationService from "services/user/UserOperationService";
import {GenericButton, GenericDatatable} from "@application";

export default function UserComponent(props) {
  // const [dataSelected, setDataSelected] = useState([]);

  const selectionIndex = "all";
  const [rowData, setRowData] = useState([]);

  const verifyUser = () => {
    let formData = new FormData();
    formData.append("username", rowData[1]);
    formData.append("comment", "Verifying User");
    UserOperationService.verifyUser(formData)
      .then(data => {
        alert("Successful verified");
        props.refreshCurrentModule();
      })
      .catch(err => {
        if (err.response) {
          alert(err.response.data.message);
        } else {
          alert("Error");
        }
      });
  };

  return (
    <div>
      <Grid container>
        <GenericDatatable
          dataSet={props.indexPageData}
          infoEnabled={false}
          moduleName="Temp User"
          isSelection={true}
          isMultipleSelect={false}
          selectionIndex={selectionIndex}
          selected={rowData}
          selectHandler={setRowData}
        ></GenericDatatable>
      </Grid>
      <Grid
        style={{ padding: "2px  8px 10px 3px" }}
        container
        justify="flex-end"
        direction="row"
        spacing={3}
      >
        <GenericButton
          variant="contained"
          color="secondary"
          onClick={() => verifyUser()}
        >
          Verify User
        </GenericButton>
      </Grid>
    </div>
  );
}
