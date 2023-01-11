import React, { useState, useEffect } from "react";

import actionRepository from "./ActionRepository";
import { Grid } from "@mui/material";
import { GenericDialog, GenericButton } from "@application";

import httpService from "services/httpservice/httpService";

function ActionRegistry(props) {
  const [action, setAction] = useState(null);
  const [showComponent, setShowComponent] = useState(false);
  const [detailsForAction, setDetailsForAction] = useState({});
  const [actionParams, setActionParams] = useState(props.action.actionParams);
  //const { actionHandler } = props;
  //console.log(actionHandler);

  useEffect(() => {
    if (props.action && props.action !== null) {
      setAction(props.action);
    }
  }, [props.action]);

  const handleCloseModal = () => {
    setShowComponent(false);
  };

  const token = window.localStorage.getItem("cognifi_token");
  let config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };

  const deligateToComponent = () => {
    const data = props.data;

    if (data && data.length === 1) {
      const paramData = {};
      paramData["actionCode"] = action.actionCode;
      const caseData = props.data[0];
      paramData["caseNo"] = caseData[0];

      const getDetailsForAction = async () => {
        const result = await httpService.post(
          `caseworkflow/getCWFCaseAndCommentsDetails`,
          config,
          { params: paramData }
        );
        const resultData = result.data;
        resultData["caseNo"] = caseData[0];
        resultData["actionCode"] = action.actionCode;
        setDetailsForAction(resultData);
        setActionParams(resultData.ACTIONPARAMS);
      };

      getDetailsForAction();
      setShowComponent(true);
    } else if (data.length >= 1) {
      alert("Please select only one case.");
    } else {
      alert("Please select atleast one case.");
    }
  };

  useEffect(() => {
    //console.log(showComponent, props.fromInfo, detailsForAction, actionParams);
    if (
      showComponent === true &&
      props.fromInfo === true &&
      detailsForAction !== null &&
      actionParams !== null
    ) {
      props.actionHandler(
        <ActionComponent
          open={showComponent}
          handleClose={null}
          data={detailsForAction}
          reloadData={props.reloadData}
          inputParams={props.inputParams}
          actionParams={actionParams}
        ></ActionComponent>
      );
    }
  }, [props.fromInfo, showComponent, actionParams, detailsForAction]);

  //console.log(updateActionHandler);

  const ActionComponent = actionRepository[
    action && action !== null ? action.actionCode : ""
  ]
    ? actionRepository[action && action !== null ? action.actionCode : ""]
    : actionRepository["defaultAction"];

  return (
    <React.Fragment>
      {action && action !== null ? (
        <Grid>
          <GenericButton
            color={props.color}
            variant={props.variant}
            style={props.marginStyle}
            onClick={() => deligateToComponent()}
          >
            {action.actionName}
          </GenericButton>
          {props.fromInfo === false ? (
            <GenericDialog
              closeModal={handleCloseModal}
              state={showComponent}
              property={{
                title: `${action.actionName} : ${detailsForAction.caseNo}`,
                size: "lg"
              }}
            >
              <p>
                {JSON.stringify(actionParams)}
              </p>
              {ActionComponent && (
                <ActionComponent
                  open={showComponent}
                  handleClose={handleCloseModal}
                  data={detailsForAction}
                  reloadData={props.reloadData}
                  inputParams={props.inputParams}
                  actionParams={actionParams}
                ></ActionComponent>
              )}
            </GenericDialog>
          ) : // ) : showComponent === true ? (
          //   <Grid>
          //     {ActionComponent && (
          //       <ActionComponent
          //         data={detailsForAction}
          //         reloadData={props.reloadData}
          //         inputParams={props.inputParams}
          //         actionParams={actionParams}
          //       ></ActionComponent>
          //     )}
          //   </Grid>
          // )
          null}
        </Grid>
      ) : (
        <GenericButton>No Action</GenericButton>
      )}
    </React.Fragment>
  );
}

export default ActionRegistry;
