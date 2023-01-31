import React, { useRef } from "react";
import Formsy from "formsy-react";
import {
  TextFieldFormsy,
  DatePickerFormsy,
  SelectFormsy
} from "components/common/formsyComponents";
import { MenuItem, FormControl, Paper, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import httpService from "services/httpservice/httpService";
import { useClasses } from "@application";
import { CWFTabContent } from "../../moduleDataContainer/modulePages/common/modalContentPages";

const styles = theme => ({
  root: {
    width: "100%"
  },
  formControl: {
    margin: 1,
    fullWidth: true,
    display: "flex",
    wrap: "nowrap"
  },
  expandedPanel: {
    backgroundColor: "#f4f5fa"
  },
  heading: {
    color: "#052a4f",
    fontSize: 18,
    fontWeight: "500"
  },
  rowDesign: {
    paddingTop: 15
  }
});

function CWFApproveCase(props) {
  const classes = useClasses(styles);
  const formRef = useRef(null);

  const token = window.localStorage.getItem("cognifi_token");
  let config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };

  //console.log(props);
  const paramData = {};
  //console.log(props.data);
  paramData["actionCode"] = props.data.actionCode;
  paramData["caseNo"] = props.data.caseNo;

  const dataSet = {
    "Case Comments History": new Promise((resolve, reject) => {
      httpService
        .post(`/caseworkflow/getCWFCaseAndCommentsDetails`, config, {
          params: paramData
        })
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
            //console.log(response.data);
          } else {
            reject(response.data.err);
          }
        });
    })
  };

  return (
    <Paper style={{ padding: 16 }}>
      <CWFTabContent data={dataSet} />
      {/* {dataSet
        ? Object.keys(dataSet).map(function(key) {
            const eachDetail = {
              dataSet: dataSet
            };
            return <CWFTabContent data={eachDetail} key={key} />;
          })
        : null} */}
    </Paper>
  );
}

export default CWFApproveCase;
