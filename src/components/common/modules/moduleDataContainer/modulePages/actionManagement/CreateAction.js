import React, { useState, useRef } from "react";
import Formsy from "formsy-react";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdExpandMore as ExpandMoreIcon } from 'react-icons/md'

import { useDispatch, useSelector } from "react-redux";
import { GenericDatatable, GenericButton, GenericDatagrid } from "@application";
import { ActionsBottomContainer } from "../common/bottomPages";
import * as Actions from "redux/caseWorkflow/cwfbottomframedata/cwfbottomframedata.actions";
import caseWorkflowService from "services/caseWorkflow/caseWorkflowService";
import ActionDetailsForm from "./ActionDetailsForm";
import { useClasses } from "@application";

const styles = theme => ({
  root: {
    width: "100%"
  },
  expandedPanel: {
    backgroundColor: "#f4f5fa"
  },
  heading: {
    color: "#052a4f",
    fontSize: theme.typography.pxToRem(18),
    fontWeight: "500"
  }
});

export default function CreateAction(props) {
  const classes = useClasses(styles);
  const paramObj = props.data;
  const dataMap = props.fieldMap;

  const workflowList = paramObj.WORKFLOW;
  const allowedRolesList = paramObj.ALLOWEDROLES;
  const allowedModulesList = paramObj.ALLOWEDMODULES;
  const previousActionsList = paramObj.PREVIOUSACTIONS;

  const formRef = useRef(null);

  const [isFormValid, setIsFormValid] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState("actionExpansionPanel");
  const [actionData, setActionData] = useState({});
  const [submitType, setSubmitType] = useState(null);
  const [dataSelected, setDataSelected] = useState([]);
  const [openMappingDiv, setOpenMappingDiv] = useState(false);
  const [showActionForm2, setShowActionForm2] = useState(false);

  //console.log(dataSelected);
  const selectionIndex = "all";
  //const selectionIndex = "0,1";

  const handlePanelExpansion = panel => (event, expandedPanel) => {
    setExpandedPanel(expandedPanel ? panel : false);
  };

  const handleActionRoleTrayMapping = e => {
    setOpenMappingDiv(true);
  };

  const searchAction = () => {
    const searchFormData = formRef.current.getModel();
    //(searchFormData);
    caseWorkflowService
      .searchAction(searchFormData)
      .then(data => {
        setActionData(data);
        setShowResults(true);
        setExpandedPanel(false);
        setIsFormValid(true);
      })
      .catch(error => {
        console.log("caseworkflow Service Error:-",error);
      });
  };

  const createAction = () => {
    setSubmitType("create");
  };

  const updateAction = () => {
    setSubmitType("update");
  };
  // const addParam = () => {
  //   setShowActionForm2(true);
  // };

  const handleActionSubmit = paramData => {
    setIsFormValid(false);
    //console.log("Form JSON data ", JSON.stringify(paramData));
    if (submitType === "create") {
      caseWorkflowService
        .createAction(paramData)
        .then(data => {
          // console.log(data);
          setActionData(data);
          setShowResults(true);
          setExpandedPanel(false);
          setIsFormValid(true);
          //setShowActionForm2(true);
        })
        .catch(error => {
          console.log("caseworkflow Service Error:-",error);
        });
    } else if (submitType === "update") {
      caseWorkflowService
        .updateAction(paramData)
        .then(data => {
          alert(data);
        })
        .catch(error => {
          console.log("caseworkflow Service Error:-",error);
        });
    }
  };

  // useEffect(() => {
  //   if (isFormValid === true) {
  //     setShowActionForm2(true);
  //   }
  // }, [isFormValid]);

  const ResultFrame = () => (
    <div id="bottomFrame" className={classes.root} style={{ paddingTop: 20 }}>
      {actionData && actionData !== null ? (
        <>
          {/* <GenericDatatable
              dataSet={actionData}
              infoEnabled={true}
              moduleName="Actions List"
              isSelection={false}
              isMultipleSelect={false}
              selectionIndex={selectionIndex}
              selected={dataSelected}
              selectHandler={setDataSelected}
              BottomContainer={ActionsBottomContainer}
              hyperlinkFunction={props.openActionParamTab}
          ></GenericDatatable> */}
          <GenericDatagrid 
                title={'Actions List'} 
                tableData={actionData} 
                utilColumn={'info'}
          />
        </>
      ) : (
        "No data available"
      )}
    </div>
  );

  return (
    // <Paper style={{ padding: 16 }}>
    <React.Fragment>
      <div id="topFrame" className={classes.root}>
        <Accordion
          expanded={expandedPanel === "actionExpansionPanel"}
          onChange={handlePanelExpansion("actionExpansionPanel")}
          id="actionExpansionPanel"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="actionPanelcontent"
            id="actionPanelHeader"
            classes={{
              root: classes.root,
              expanded: classes.expandedPanel
            }}
          >
            <Typography
              component={"p"}
              className={classes.heading}
              id="actionHeader"
            >
              Action Master
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            align="left"
            id="actionExpansionPanelDetails"
            style={{ padding: 5 }}
          >
            <Formsy
              onValidSubmit={data => handleActionSubmit(data)}
              onValid={() => setIsFormValid(true)}
              onInvalid={() => setIsFormValid(false)}
              ref={formRef}
              className="flex flex-col justify-center w-full"
            >
              <ActionDetailsForm
                workflowList={workflowList}
                allowedRolesList={allowedRolesList}
                allowedModulesList={allowedModulesList}
                previousActionsList={previousActionsList}
                dataMap={dataMap}
                isExisting={props.isUpdate}
              ></ActionDetailsForm>
              {props.isCreate === true ? (
                <Grid
                  container
                  alignItems="flex-start"
                  justify="flex-end"
                  direction="row"
                  style={{ marginRight: 15, marginBottom: 10 }}
                >
                  <GenericButton
                    type="submit"
                    variant="outlined"
                    color="primary"
                    aria-label="create"
                    className={classes.button}
                    id="create"
                    style={{ margin: 10 }}
                    disabled={!isFormValid}
                    value="create"
                    onClick={() => createAction()}
                  >
                    Create
                  </GenericButton>
                  <GenericButton
                    type="button"
                    variant="outlined"
                    color="primary"
                    aria-label="search"
                    className={classes.button}
                    id="search"
                    style={{ margin: 10 }}
                    //disabled={!isFormValid}
                    value="search"
                    onClick={() => searchAction()}
                  >
                    Search
                  </GenericButton>
                </Grid>
              ) : (
                <Grid
                  container
                  alignItems="flex-start"
                  justify="flex-end"
                  direction="row"
                  style={{ marginRight: 15, marginBottom: 10 }}
                >
                  <GenericButton
                    type="submit"
                    variant="outlined"
                    color="primary"
                    aria-label="update"
                    className={classes.button}
                    id="update"
                    style={{ margin: 10 }}
                    disabled={!isFormValid}
                    value="update"
                    onClick={() => updateAction()}
                  >
                    Update
                  </GenericButton>
                </Grid>
              )}
            </Formsy>
          </AccordionDetails>
        </Accordion>
        {/* {showActionForm2 ? <ActionForm2></ActionForm2> : null} */}
      </div>
      {showResults ? <ResultFrame /> : null}
    </React.Fragment>
    // </Paper>
  );
}
