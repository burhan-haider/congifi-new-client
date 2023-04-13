import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@mui/styles";
import CreateAction from "./CreateAction";
import httpService from "services/httpservice/httpService";
import AppBar from "@mui/material/AppBar";
import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { useClasses } from "@application";
import ActionParamsForm from "./ActionParamsForm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function selectedTabProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const Tabs = withStyles(theme => ({
  root: {
    minHeight: 30,
    backgroundColor: "#f4f5fa",
    padding: '10px 10px'
  },
  indicator: {
    backgroundColor: "transparent"
  }
}))(MuiTabs);

const Tab = withStyles(theme => ({
  root: {
    minHeight: 30,
    borderRadius: 20,
    color: "#333333",
    opacity: 1,
    "&$selected": {
      backgroundColor: "#052a4f",
      color: "#f4f5fa",
      opacity: 1
    },
    "&:focus": {
      backgroundColor: "#052a4f",
      color: "#f4f5fa",
      opacity: 1
    },
    marginRight: 2,
  },
  selected: {}
}))(MuiTab);

const styles = theme =>({
  root: {
    flexGrow: 1,
    width: "100%",
    // backgroundColor: "#f4f5fa"
    //borderRadius: 20
  },
  textFieldRoot: {
    width: "40%",
    // background: "linear-gradient(45deg, #89f7fe 30%, #66a6ff 90%)",
    //marginBottom: 20,
    borderRadius: 50,
    marginLeft: "5%",
    marginRight: "5%"
    //border: 0,
    //boxShadow: '0 3px 5px 2px rgba(124, 217, 254, 1)',
  },
  textFieldInput: {
    color: "Black",
    // padding: "10px",
    borderRadius: "50px"
  },
  MuiOutlinedInput: {
    borderRadius: "50px",
    padding: "0px"
  },
  tabPanelBox: {
    // maxHeight: "400px",
    // overflowY: "auto",
    // backgroundColor: "#f4f5fa"
  },
  tabPanelGridItems: {
    display: "flex",
    textAlign: "left",
    justifyContent: "center"
  },
  tabPanelTypography: {
    width: "100%",
    fontFamily: "inherit",
    fontSize: "13px",
    minHeight: "25px",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    whiteSpace: "normal"
  }
});

export default function ActionMasterComponent(props) {
  const classes = useClasses(styles);
  const [paramsForAction, setParamsForAction] = useState({});
  const [allActionsList, setAllActionsList] = useState({});
  const [isFromDetails, setIsFromDetails] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  //const [tabEvent, setTabEvent] = useState(null);

  const handleTabChange = (event, newValue, fromDetails) => {
    //setTabEvent(event);
    //console.log(fromDetails);
    setIsFromDetails(fromDetails);
    setTabValue(newValue);
  };

  useEffect(() => {
    getActionParams();
    getAllActionsList();
  }, []);

  const getActionParams = async () => {
    const result = await httpService.get(`/api/action/getActionParams`);
    
    setParamsForAction(result.data);
    //console.log(result.data);
  };
  //getActionParams();

  const getAllActionsList = async () => {
    const result = await httpService.get(`/api/action/getAllActionsList`);
    setAllActionsList(result.data);
    //console.log(result.data);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Action Details" {...selectedTabProps(0)} />
          <Tab label="Action Parameters" {...selectedTabProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <CreateAction
          data={paramsForAction}
          fieldMap={null}
          isCreate={true}
          isUpdate={false}
          openActionParamTab={() => handleTabChange({}, 1, true)}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <ActionParamsForm
          allActionsList={allActionsList}
          fromDetails={isFromDetails}
        ></ActionParamsForm>
      </TabPanel>
    </div>
  );
}
