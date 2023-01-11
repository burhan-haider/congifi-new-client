//Created by Vivek - 23.04.2020
import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@mui/styles";
import httpService from "services/httpservice/httpService";
import CreateAction from "components/common/modules/moduleDataContainer/modulePages/actionManagement/CreateAction";
import ActionParamsUpdateForm from "components/common/modules/moduleDataContainer/modulePages/actionManagement/ActionParamsUpdateForm";
import { useClasses } from "@application";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#ece4e4"
    //borderRadius: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
    // flexBasis: "33.33%",
    // flexShrink: 0,
  }
});

function ActionsDataPanel(props) {
  const classes = useClasses(styles);

  const [paramsForAction, setParamsForAction] = useState({});

  const actionsDetails = props.data;
  const moduleName = props.moduleName;

  useEffect(() => {
    getActionParams();
  }, []);

  const getActionParams = async () => {
    const result = await httpService.get(`/api/action/getActionParams`);
    setParamsForAction(result.data);
    //console.log(result.data);
  };

  return (
    <div className={classes.root}>
      <div>
        {moduleName === "Actions List" ? (
          <CreateAction
            data={paramsForAction}
            fieldMap={actionsDetails}
            isCreate={false}
            isUpdate={true}
          ></CreateAction>
        ) : (
          <ActionParamsUpdateForm
            fieldMap={actionsDetails}
          ></ActionParamsUpdateForm>
        )}
      </div>
    </div>
  );
}

export default ActionsDataPanel;
