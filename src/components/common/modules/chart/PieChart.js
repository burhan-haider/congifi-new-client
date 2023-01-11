import React, {useRef} from "react";
import { Pie, getElementAtEvent } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import {
  setSelectedModule,
  addToBreadcrumbs,
  addToOpenTabs,
} from 'redux/features/features.actions'
import ReactEcharts from 'echarts-for-react';

ChartJS.register(...registerables);

export default function PieChart(props) {
  // console.log(props);
  let {
    moduleCode,
    moduleURL,
    presentationCategory,
    moduleChartDetail,
    hasChildren,
    parentModuleId,
    parentModule_Id,
    uniqueNo
  } = props;

  const myChart = useRef(null);

  const option = {
  title: {
    show: false,
  },
  polar: {
    radius: [10,'90%'],
    center: ['30%', '50%']
  },
  angleAxis: {
    max: Math.max(...props.moduleChartDetail.yaxis),
    startAngle: 75,
    show: false,
  },
  legend:{
    formatter: name=>{
      const index = props.moduleChartDetail.xaxis.indexOf(name);
      const value = props.moduleChartDetail.yaxis[index];
      return `${name} (${value})`;
    },
    orient: 'vertical',
    icon: 'circle',
    right: '5%',
    top: 'middle',
    itemHeight: 25,
    itemWidth: 25,
    itemGap: 15,
    textStyle: {
      fontSize: 16,
    }

  },
  radiusAxis: {
    type: 'category',
    data: props.moduleChartDetail.xaxis,
    show: false,
    axisLine: {
      show: false
    },
    splitLine:{
      show: false,
    }
  },
  roundCap: true,
  
  tooltip: {},
  series: props.moduleChartDetail.yaxis.map((item, index)=>{
    return {
      type: 'bar',
      name: props.moduleChartDetail.xaxis[index],
      data: props.moduleChartDetail.yaxis.map((dataItem, dataIndex)=>(index===dataIndex?dataItem:0)),
      coordinateSystem: "polar",
      barWidth: 15,
      roundCap: true,
      stack: "value",
      showBackground: true,
      backgroundStyle: {
        color: '#dfdfdf',
      },
      label: {
        show: false,
      },
      animation: true,
      animationDuration: 800,
      animationDelay: 100,

    }
  })
}

  const graphClickEvent = (dataIndex) => {


    let dataPointClick;
    let modulename;
    let hasMoreChild;
    
    

    if(hasChildren===true) {

      if(dataIndex != null) {
        parentModule_Id = moduleCode;

        parentModuleId = uniqueNo;

        moduleCode = props.moduleChartDetail.moduleCodeDetailList[dataIndex]["MODULECODE"];

        uniqueNo = moduleChartDetail.moduleCodeDetailList[dataIndex]["UNIQUENO"];

        modulename = props.moduleChartDetail.xaxis[dataIndex];

        moduleURL = props.moduleChartDetail.moduleCodeDetailList[dataIndex]["MODULEURL"];
          
        presentationCategory = props.moduleChartDetail.moduleCodeDetailList[ dataIndex]["PRESENTATIONCATEGORY"];

        hasMoreChild = moduleChartDetail.moduleCodeDetailList[dataIndex]["HASCHILDREN"];
      
        dataPointClick = true;

        let moduleMain = {
          moduleCode,
          moduleURL,
          presentationCategory,
          dataPointClick,
          modulename,
          parentModuleId,
          parentModule_Id,
          hasMoreChild,
          uniqueNo,
          hasChildren
        };
        props.chartClickOperation(moduleMain);
      }
      else{
        let moduleMain = {
          moduleCode,
          moduleURL,
          presentationCategory,
          dataPointClick,
          modulename,
          parentModuleId,
          parentModule_Id,
          hasMoreChild,
          uniqueNo,
          hasChildren
        };
        props.chartClickOperation(moduleMain);
      }
    }
    else{

      let moduleMain = {
        moduleCode,
        moduleURL,
        presentationCategory,
        dataPointClick,
        modulename,
        parentModuleId,
        parentModule_Id,
        hasMoreChild,
        uniqueNo,
        hasChildren
      };
      props.chartClickOperation(moduleMain);

    }

  }

  const chartClick = (e) => {
    console.log("chartClick:-", e);
    console.log("chartClick:-", e.dataIndex);
    graphClickEvent(e.dataIndex);
  }

  const cData = {
    labels: props.moduleChartDetail.xaxis,
    datasets: [
      {
        data: props.moduleChartDetail.yaxis,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF851B"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF851B"]
      }
    ]
  };

  const onEvents = {
    "click": e => chartClick(e),
  }

  return (
    <div 
      style={{ position: "relative"}} 
      onClick={()=>graphClickEvent(null)}
    >
      <ReactEcharts 
        option={option} 
        style={{minHeight: '350px', cursor: 'pointer'}} 
        className="pl-2 pr-3 py-1" 
        onEvents={onEvents}
      />
      {/* <Pie
        data={cData}
        // getElementAtEvent={(elms) => graphClickEvent(elms)}
        onClick={elms => graphClickEvent(elms)}
        ref={ myChart }
        options={{
          responsive: true,
          title: {
            display: true,
            text: props.moduleChartDetail.chartName
          },
          aspectRatio: 2,
          legend: {
            display: true
          },
          layout: {
            padding: {
              left: 10,
              right: 15,
              top: 20,
              bottom: 20
            },
          }
        }}
      /> */}
    </div>
  );
}
