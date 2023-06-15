//Created by Vivek - 23.04.2020
import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { GenericTabPanel } from "../modalContentPages";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from '@mui/material/Divider';
import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import { useClasses } from "@application";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#f4f5fa",
    height: '100%'
    // padding: '10px',
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
    backgroundColor: "#f4f5fa"
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

function GenericDetailsTabContent(props) {
  const classes = useClasses(styles);
  const [modalFetchedData, setModalFetchedData] = useState([]);
  const [modalTabNames, setModalTabNames] = useState([]);
  const [modalTabDisplay, setModalTabDisplay] = useState([]);

  useEffect(() => {
    if (props.data.dataSet !== undefined) {
      props.data.dataSet.then(response => {
        setModalFetchedData(response);
        setModalTabNames(response.TABNAMES);
        setModalTabDisplay(response.TABDISPLAY);
      });
    }
  }, [props.data.dataSet]);

  function selectedTabProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`
    };
  }
  // console.log(modalFetchedData);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //VIVEK - TABS DESIGN
  const Tabs = withStyles(theme => ({
    root: {
      minHeight: "30",
      backgroundColor: "#f4f5fa",
      paddingTop: '10px',
    },
    indicator: {
      backgroundColor: "transparent"
    }
  }))(MuiTabs);

  const Tab = withStyles(theme => ({
    root: {
      minHeight: 30,
      fontFamily: "inherit",
      borderRadius: 20,
      color: "#333333",
      opacity: 1,
      "&$selected, &:focus": {
        backgroundColor: "#052a4f",
        color: "#f4f5fa",
        opacity: 1
      },
      marginRight: 2
    },
    selected: {}
  }))(MuiTab);

  return (
    <div className="min-h-[80vh]">
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {modalTabNames
              ? modalTabNames.map((eachTabName, index) => {
                  //console.log(index + "---" + eachTabName);
                  return (
                    <Tab
                      key={index + "~**~" + eachTabName}
                      value={index}
                      label={eachTabName}
                      {...selectedTabProps(index)}
                    />
                  );
                })
              : null}
          </Tabs>
        </AppBar>
        {modalFetchedData
          ? Object.keys(modalFetchedData).map(function(key) {
              if (!isNaN(key)) {
                return (
                  <GenericTabPanel
                    key={key}
                    value={value}
                    index={key}
                    data={modalFetchedData[key]}
                    classes={classes}
                    displayType={modalTabDisplay[key]}
                  >
                    {/* {console.log(modalFetchedData[key])} */}
                    {/* {modalFetchedData[key]} */}
                  </GenericTabPanel>
                );
              }
            })
          : null}
      </div>
    </div>
  );
}

export default GenericDetailsTabContent;
