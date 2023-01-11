import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@mui/styles";
import commonService from "services/common/commonService";
import featureService from "services/features/featureService";
import { GenericDialog, GenericButton } from "@application";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { TextField, Grid, Slider, Typography } from "@mui/material";
// import { Remove } from "@material-ui/icons";
import { MdRemove as Remove } from 'react-icons/md'
import ModulesDropDown from "./ModulesDropDown";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css";
import * as TDU from "@application/util/TreeDataUtils";
import * as MessageActions from "redux/message/message.actions";
import { useClasses } from "@application";

const styles = theme => ({
  root: {
    paddingLeft: "20px",
    paddingRight: "20px"
  },
  treeview: {
    flexGrow: 1,
    maxHeight: "450px",
    //maxWidth: "400px",
    overflowY: "auto"
  },
  // VIVEK - CHECKBOX
  checkboxRoot: {
    color: "#052a4f",
    "&$checked": {
      color: "#052a4f"
    }
  },
  checked: {},
  textFieldRoot: {
    width: "80%",
    // background: "linear-gradient(45deg, #89f7fe 30%, #66a6ff 90%)",
    margin: "3% 3% 5% 3%",
    borderRadius: 50,
    //border: 0,
    //boxShadow: '0 3px 5px 2px rgba(124, 217, 254, 1)',
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        //borderColor: "#353535",
        border: "solid 1px #3a3a3a"
      },
      "&:hover fieldset": {
        border: "solid 2px #3a3a3a"
      },
      "&.Mui-focused fieldset": {
        border: "solid 2px #3a3a3a"
      }
    }
  },
  textFieldInput: {
    color: "#333333",
    // padding: "10px",
    borderRadius: "50px"
  },
  MuiOutlinedInput: {
    borderRadius: "50px",
    padding: "0px"
  },
  MuiButton: {
    textTransform: "initial",
    borderRadius: "15px",
    borderColor: "#052a4f",
    padding: "2px 2.5% 2px 2.5%",
    "&:hover": {
      backgroundColor: "#052a4f",
      color: "white"
    }
  }
});

export default function FeaturesModules(props) {
  const classes = useClasses(styles);
  const dispatch = useDispatch();
  const [allModules, setAllModules] = useState([]);
  const [allMasterModules, setAllMasterModules] = useState([]);
  const [allCombinedModules, setAllCombinedModules] = useState([]);
  const [orderNo, setOrderNo] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [property, setProperty] = useState({});
  const [path, setPath] = useState(0);
  const [treeData, setTreeData] = useState([]);
  const [featureName, setFeatureName] = useState("");
  const { selectedFeature, actionType } = props;
  const [featureData, setFeatureData] = useState({});
  const keys_short = ["title", "children"];
  const keys_long = ["moduleCode", "subModulesList"];

  const CustomSlider = withStyles({
    root: {
      width: "80%",
      margin: "2% 3% 2% 3%",
      color: "#052a4f",
      height: 8
    },

    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      marginTop: -8,
      marginLeft: -12,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit"
      }
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 4px)"
    },
    track: {
      height: 8,
      borderRadius: 4
    },
    rail: {
      height: 8,
      borderRadius: 4
    }
  })(Slider);

  const onSliderChange = val => {
    setOrderNo(val);
  };

  const sliderMarks = [
    {
      value: 1,
      label: "1"
    },
    {
      value: 2,
      label: "2"
    },
    {
      value: 3,
      label: "3"
    },
    {
      value: 4,
      label: "4"
    },
    {
      value: 5,
      label: "5"
    },
    {
      value: 6,
      label: "6"
    },
    {
      value: 7,
      label: "7"
    },
    {
      value: 8,
      label: "8"
    },
    {
      value: 9,
      label: "9"
    },
    {
      value: 10,
      label: "10"
    }
  ];

  const modalData = {
    addChildModules: {
      title: "Add Child Modules",
      size: "sm"
    }
  };

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const displayProperty = data => {
    setProperty(modalData[data]);
  };

  const createUpdateFeature = () => {
    const finalData = {};
    finalData["featureName"] = featureName;
    finalData["orderNo"] = orderNo;
    finalData["icon"] = "default";
    let newData = deepMapKeys(
      treeData,
      key => keys_long[keys_short.indexOf(key)] || key
    );
    newData = Object.entries(newData).map(each => each[1]);
    finalData["mainModulesList"] = newData;
    //console.log(finalData);
    if (
      actionType === "updateFeature" &&
      finalData["featureName"] !== "" &&
      finalData["mainModulesList"].length > 0
    ) {
      finalData["featureCode"] = featureData.featureCode;
      featureService.updateFeature(finalData).then(response => {
        setFeatureData(response);
        dispatch(
          MessageActions.showMessage({
            message: "Feature updated successfully",
            variant: "success"
          })
        );
      });
    } else if (
      actionType === "createFeature" &&
      finalData["featureName"] !== "" &&
      finalData["mainModulesList"].length > 0
    ) {
      featureService.createFeature(finalData).then(response => {
        dispatch(
          MessageActions.showMessage({
            message: "Feature created successfully",
            variant: "success"
          })
        );
        props.closeModal();
      });
    } else {
      dispatch(
        MessageActions.showMessage({
          message: "Please check every field",
          variant: "warning"
        })
      );
    }
  };

  const addNode = selected => {
    const data = TDU.addNodeUnderParent({
      treeData: treeData,
      parentKey: path[path.length - 1],
      expandParent: true,
      newNode: { title: selected, children: [] },
      getNodeKey: ({ treeIndex }) => treeIndex
    });
    if (selected.length > 0) {
      setTreeData(data.treeData);
    }
  };

  const deleteNode = (title, path) => {
    //console.log(title + "---" + path);
    const data = TDU.removeNodeAtPath({
      treeData: treeData,
      path: path, // You can use path from here
      getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
        return number;
      },
      ignoreCollapsed: false
    });
    setTreeData(data);
  };

  const iterateModuleChildren = useCallback(subModulesList => {
    //console.log(subModulesList);
    return subModulesList.map(each => {
      return {
        title: each.moduleName,
        children: iterateModuleChildren(each.subModulesList)
      };
    });
  }, []);

  function deepMapKeys(originalObject, callback) {
    if (typeof originalObject !== "object") {
      return originalObject;
    }

    return Object.keys(originalObject || {}).reduce((newObject, key) => {
      const newKey = callback(key);
      const originalValue = originalObject[key];
      let newValue = originalValue;
      if (Array.isArray(originalValue)) {
        newValue = originalValue.map(item => deepMapKeys(item, callback));
      } else if (typeof originalValue === "object") {
        newValue = deepMapKeys(originalValue, callback);
      }
      if (newObject["moduleCode"] !== undefined) {
        let text = newObject["moduleCode"];
        text = commonService.makeCamelCaseString(text);
        newObject["moduleCode"] = text;
      }
      return {
        ...newObject,
        [newKey]: newValue
      };
    }, {});
  }

  useEffect(() => {
    featureService.fetchAllModules().then(response => {
      setAllModules(response);
    });
  }, []);

  useEffect(() => {
    if (actionType === "updateFeature") {
      featureService.getFeaturesHierarchy(selectedFeature[0]).then(response => {
        setFeatureData(response);
      });
    }
  }, [actionType, selectedFeature]);

  useEffect(() => {
    //console.log(featureData);
    setOrderNo(featureData.orderNo);
    setFeatureName(featureData.featureName);
    const mainModulesList = featureData.mainModulesList
      ? featureData.mainModulesList
      : [];
    setTreeData(
      mainModulesList.map(each => {
        //console.log(each);
        return {
          title: each.moduleName,
          children: iterateModuleChildren(each.subModulesList)
        };
      })
    );
  }, [featureData, iterateModuleChildren]);

  useEffect(() => {
    let allMasters = [];
    let combined = [];
    allModules.map(each => {
      Object.entries(each).filter(eachArray => {
        allMasters.push(eachArray[0]);
        combined.push(eachArray[0]);
        eachArray[1].map(eachModule => combined.push(eachModule));
        return null;
      });
      return null;
    });
    setAllMasterModules(allMasters);
    setAllCombinedModules(combined);
    //console.log(combined);
  }, [allModules]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div className="w-full">
              <TextField
                onChange={e => {
                  //console.log(e.target.value);
                  setFeatureName(e.target.value);
                }}
                variant="outlined"
                name="featureName"
                label={commonService.getLabel(
                  "app.common.FEATURENAME",
                  "Feature Name"
                )}
                classes={{
                  root: classes.textFieldRoot,
                  label: classes.textFieldLabel
                }}
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  shrink: "true"
                }}
                value={featureName ? featureName : ""}
              />
            </div>
            <div className="w-full mt-2">
              <CustomSlider
                value={orderNo ? orderNo : 1}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                //valueLabelDisplay="on"
                onChange={(event, val) => onSliderChange(val)}
                step={1}
                marks={sliderMarks}
                min={1}
                max={10}
              />
              <Typography id="discrete-slider" style={{ paddingLeft: "10px" }}>
                Order No
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6} style={{ height: "480px" }}>
            {treeData ? (
              treeData.length !== 0 ? (
                <SortableTree
                  treeData={treeData}
                  onChange={treeData => setTreeData(treeData)}
                  generateNodeProps={({ node, path }) => ({
                    title: <a href={node.url}>{node.title}</a>,
                    buttons: [
                      <button
                        onClick={() => {
                          setPath(path);
                          handleClickOpenModal();
                          displayProperty("addChildModules");
                        }}
                      >
                        <SpeedDialIcon />
                      </button>,
                      <button onClick={() => deleteNode(node.title, path)}>
                        <Remove />
                      </button>
                    ]
                  })}
                />
              ) : (
                <div className="flex">
                  <GenericButton
                    style={{ margin: "auto", marginTop: "20px" }}
                    onClick={() => {
                      handleClickOpenModal();
                      displayProperty("addChildModules");
                    }}
                  >
                    Add Master Modules
                    <SpeedDialIcon />
                  </GenericButton>
                </div>
              )
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </div>
      <div className="flex justify-end mr-4 my-4">
        <GenericButton
          variant="outlined"
          onClick={() => {
            createUpdateFeature();
          }}
          autoFocus
          className={classes.MuiButton}
        >
          {actionType === "updateFeature" ? "Update" : "Create"}
        </GenericButton>
        <GenericButton
          variant="outlined"
          onClick={props.closeModal}
          autoFocus
          className={classes.MuiButton}
        >
          Close
        </GenericButton>
      </div>
      <GenericDialog
        closeModal={handleCloseModal}
        state={openModal}
        property={property}
      >
        <ModulesDropDown
          closeModal={handleCloseModal}
          modulesList={
            treeData
              ? treeData.length !== 0
                ? allCombinedModules
                : allMasterModules
              : ""
          }
          addNode={addNode}
        />
      </GenericDialog>
    </React.Fragment>
  );
}
