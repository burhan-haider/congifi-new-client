import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles, withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { CWFTabPanel } from "../../modalContentPages";
import AppBar from "@mui/material/AppBar";
import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import { useClasses } from "@application";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#f4f5fa"
    //borderRadius: 20,
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
  buttonRoot: {
    borderRadius: "25px",
    marginRight: "1%",
    color: "#052a4f",
    backgroundColor: "#fff",
    border: "1px solid #052a4f",
    "&:hover, &:focus": {
      color: "#fff",
      backgroundColor: "#052a4f"
    }
  },
  buttonLabel: {
    textTransform: "capitalize"
    //color: "white"
  },
  tabPanelBox: {
    maxHeight: "400px",
    overflowY: "auto",
    backgroundColor: "#f4f5fa"
  },
  tabPanelGridItems: {
    display: "flex",
    textAlign: "left",
    justifyContent: "center"
  },
  tabPanelTypography: {
    width: "100%",
    fontSize: "13px",
    minHeight: "25px",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    whiteSpace: "normal"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    textAlign: "left",
    paddingLeft: "10px"
  }
});

function CWFTabContent(props) {
  const classes = useClasses(styles);
  const activeRole = useSelector(state => state.auth.user.roleName);

  const [modalFetchedData, setModalFetchedData] = useState([]);
  const [modalTabNames, setModalTabNames] = useState([]);
  const [modalTabDisplay, setModalTabDisplay] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(null);

  useEffect(() => {
    if (props.data.dataSet !== undefined) {
      const commentsData = props.data.dataSet;
      //console.log(commentsData);
      setModalFetchedData(commentsData);
      setModalTabNames(commentsData.TABNAMES);
      setModalTabDisplay(commentsData.TABDISPLAY);
    }
  }, [props.data.dataSet]);

  function selectedTabProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`
    };
  }
  //console.log(modalTabNames);
  // console.log(modalTabDisplay);

  useEffect(() => {
    modalTabNames.map((eachTabName, index) => {
      if (activeRole === eachTabName) {
        handleChange(null, index);
        setActiveTabIndex(index);
      }
      return null;
    });
  }, [modalTabNames, activeRole]);

  const [value, setValue] = React.useState(4);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Tabs = withStyles(theme => ({
    root: {
      minHeight: theme.typography.pxToRem("30"),
      backgroundColor: "#f4f5fa"
    },
    indicator: {
      backgroundColor: "transparent"
    }
  }))(MuiTabs);

  const Tab = withStyles(theme => ({
    root: {
      minHeight: theme.typography.pxToRem("30"),
      borderRadius: theme.typography.pxToRem("20"),
      color: "#333333",
      opacity: 1,
      "&$selected": {
        backgroundColor: "#052a4f",
        color: "#f4f5fa",
        opacity: 1
      },
      "&:focus": {
        backgroundColor: "#f4f5fa",
        opacity: 1
      },
      marginRight: theme.typography.pxToRem("2")
    },
    selected: {}
  }))(MuiTab);

  return (
    <div>
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
                  <CWFTabPanel
                    key={key}
                    value={value}
                    index={key}
                    data={modalFetchedData[key]}
                    classes={classes}
                    displayType={modalTabDisplay[key]}
                    activeTabIndex={activeTabIndex}
                    bottomAction={props.bottomAction}
                    dataRow={props.dataRow}
                    reloadData={props.reloadData}
                    inputParams={props.inputParams}
                  >
                    {/* {console.log(key, value)} */}
                    {/* {modalFetchedData[key]} */}
                  </CWFTabPanel>
                );
              }
            })
          : null}
      </div>
    </div>
  );
}

export default CWFTabContent;
