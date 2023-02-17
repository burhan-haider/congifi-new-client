import React, { useEffect } from "react";
import { Card, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box'
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from 'react-redux'

import LineChart from "components/common/modules/chart/LineChart";
import BarChart from "components/common/modules/chart/BarChart";
import PieChart from "components/common/modules/chart/PieChart";
import PieChartAlt from "components/common/modules/chart/PieChartAlt";
import { useClasses } from "@application";
import {
  setSelectedModule,
  addToBreadcrumbs,
  addToOpenTabs,
} from 'redux/features/features.actions'

const styles = theme => ({
  chartContentContainer: {
    width: "auto",
    margin: 0,
    height: "450px"
  },
  root: {
    flexGrow: 1,
    padding: "20px"
    // borderRadius: "8px"
    // backgroundColor: "gray"
  }
});

function ModuleChartFrame(props) {

  const { current, getModuleChartData, feature } = props;

  const dispatch = useDispatch();
  const currentModule = feature?feature.showModule:"";

  useEffect(()=>{
    if(currentModule===current.parentModuleId){
      props.setIsRefreshing(false);
    }
  },[props.isRefreshing])

  const chartClickOperation = (chartModule) => {

    console.log("chart click operations module:- ", chartModule);
    console.log("chart click operations current:- ", current);

    if(chartModule.dataPointClick !== true){

      if(current.moduleCode === chartModule.moduleCode){

        if(current.hasChildren === true){
          dispatch(setSelectedModule(feature.featureCode, current.uniqueNo))
          getModuleChartData(current);
        }
        else{
          dispatch(setSelectedModule(feature.featureCode, current.uniqueNo))
        }
  
        const lastCrumbLevel = feature.breadCrumbs[feature.breadCrumbs.length-1].level;
  
        if(feature.openTabs.filter(e=>e.id===current.uniqueNo).length<1){
          dispatch(addToOpenTabs(feature.featureCode, {
            id: current.uniqueNo, 
            code: current.moduleCode, 
            label: current.moduleName, 
            level: lastCrumbLevel+1
          }));
        }
  
        feature.breadCrumbs.map(crumb=>{
          if(feature.breadCrumbs.filter(e=>e.id===current.uniqueNo).length<1){
            if(crumb.id === current.parentModuleId){
              dispatch(addToBreadcrumbs(feature.featureCode, {
                id: current.uniqueNo,
                code: current.moduleCode,
                label: current.moduleName,
                level: crumb.level+1
              }))
            }
          }
        })

        if(feature.breadCrumbs.length<2){
          if(feature.breadCrumbs.filter(e=>e.id===current.uniqueNo).length<1){
            dispatch(addToBreadcrumbs(feature.featureCode, {
              id: current.uniqueNo,
              code: current.moduleCode,
              label: current.moduleName,
              level: 1
            }))
          }
        }
  
      }
      else{
        console.log("Module From Chart Click:-", chartModule);

        dispatch(setSelectedModule(feature.featureCode, chartModule.uniqueNo))
        getModuleChartData(chartModule);
      }
    } 
    else {
      console.log("Module From DataPoint Click:-", chartModule);
      
      dispatch(setSelectedModule(feature.featureCode, chartModule.uniqueNo))
      getModuleChartData(chartModule);

      if(current.parentModuleId === null){
        dispatch(addToBreadcrumbs(feature.featureCode, {
          id: current.uniqueNo,
          code: current.moduleCode,
          label: current.moduleName,
          level: 1
        }))
        dispatch(addToBreadcrumbs(feature.featureCode, {
          id: chartModule.uniqueNo,
          code: chartModule.moduleCode,
          label: chartModule.modulename,
          level: 2
        }))
        if(feature.openTabs.filter(e=>e.id===chartModule.uniqueNo).length === 0 ){
          dispatch(addToOpenTabs(feature.featureCode,{
            id: chartModule.uniqueNo,
            code: chartModule.moduleCode,
            label: chartModule.modulename,
            level: 2
          }))
        }
      }
      else{
        feature.breadCrumbs.map(crumb=>{
          if(crumb.id === current.parentModuleId){
            dispatch(addToBreadcrumbs(feature.featureCode, {
              id: current.uniqueNo,
              code: current.moduleCode,
              label: current.moduleName,
              level: crumb.level+1
            }))
            dispatch(addToBreadcrumbs(feature.featureCode, {
              id: chartModule.uniqueNo,
              code: chartModule.moduleCode,
              label: chartModule.modulename,
              level: crumb.level+2
            }))
            if(feature.openTabs.filter(e=>e.id===chartModule.uniqueNo).length === 0 ){
              dispatch(addToOpenTabs(feature.featureCode,{
                id: chartModule.uniqueNo,
                code: chartModule.moduleCode,
                label: chartModule.modulename,
                level: crumb.level+2
              }))
            }
          }
        })
      }

      

    }
    
  }

  function selectSpecificChart(
    selectedModule
  ) {
    let chartType = selectedModule.moduleChartDetails && selectedModule.moduleChartDetails.chartType;
    switch (chartType) {
      case "LINE":
        return (
          <LineChart
            moduleChartDetail={selectedModule.moduleChartDetails}
            moduleCode={selectedModule.moduleCode}
            moduleURL={selectedModule.moduleURL}
            chartClickOperation={chartClickOperation}
            hasChildren={selectedModule.hasChildren}
            presentationCategory={selectedModule.presentationCategory}
            parentModuleId={selectedModule.parentModuleId}
            parentModule_Id={selectedModule.parentModule_Id}
            uniqueNo={selectedModule.uniqueNo}
          ></LineChart>
        );
      case "BAR":
        return (
          <BarChart
            moduleChartDetail={selectedModule.moduleChartDetails}
            moduleCode={selectedModule.moduleCode}
            moduleURL={selectedModule.moduleURL}
            chartClickOperation={chartClickOperation}
            hasChildren={selectedModule.hasChildren}
            presentationCategory={selectedModule.presentationCategory}
            parentModuleId={selectedModule.parentModuleId}
            parentModule_Id={selectedModule.parentModule_Id}
            uniqueNo={selectedModule.uniqueNo}
          ></BarChart>
        );
      case "PIE":
        return (
          <PieChartAlt
            moduleChartDetail={selectedModule.moduleChartDetails}
            moduleCode={selectedModule.moduleCode}
            moduleURL={selectedModule.moduleURL}
            chartClickOperation={chartClickOperation}
            hasChildren={selectedModule.hasChildren}
            presentationCategory={selectedModule.presentationCategory}
            parentModuleId={selectedModule.parentModuleId}
            parentModule_Id={selectedModule.parentModule_Id}
            uniqueNo={selectedModule.uniqueNo}
          ></PieChartAlt>
        );
      default:
        return (
          <LineChart
            moduleChartDetail={selectedModule.moduleChartDetails}
            moduleCode={selectedModule.moduleCode}
            moduleURL={selectedModule.moduleURL}
            chartClickOperation={chartClickOperation}
            hasChildren={selectedModule.hasChildren}
            presentationCategory={selectedModule.presentationCategory}
            parentModuleId={selectedModule.parentModuleId}
            parentModule_Id={selectedModule.parentModule_Id}
            uniqueNo={selectedModule.uniqueNo}
          ></LineChart>
        );
    }
  }
  const classes = useClasses(styles);
  return (
    <Box className="w-auto m-0 h-[400px] sm:h-[350px]">
      {
            current.moduleChartDetails !== null ? (
                <Card elevation={2} className="max-h-[3500px]">
                  {selectSpecificChart(current)}
                </Card>
            ) : (
              <Grid item md={4} lg={6} key={current.moduleCode}>
                {/* <Paper
                  elevation={3}
                  onClick={() => {
                    current.hasChildren
                      ? getModuleChartData(current)
                      : getmoduleDetails(current);
                  }}
                >
                  {current.moduleCode}
                </Paper> */}
              </Grid>
            )
          }
    </Box>
  );
}
export default ModuleChartFrame;

