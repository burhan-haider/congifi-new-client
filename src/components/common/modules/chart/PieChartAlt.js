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

  const decalSymbols = [
    'rect', 
    'line', 
    'roundRect', 
    'diamond', 
    'pin',
    'circle', 
    'emptyCircle', 
    'arrow'
  ];
const pieChartCenter = {
    left: 'calc(50% - 100px)', 
  }

  
  const myChart = useRef(null);
  
  const option = {
    tooltip: {
      trigger: 'item',
      textStyle:{
        fontSize: 18,
      }
    },
    legend: {
        top: '5%',
        left: '2%',
        orient: window.innerWidth < '1024' ?'horizontal': 'vertical',
        // type: window.innerWidth < '1024' ? 'scroll' :false,
        // left: window.innerWidth < '1024' ? '0': '30',
        // width: window.innerWidth < '1024' ? '170': '100%',
        // type: 'scroll',
        // width: '170',
        // orient: 'vertical',
        itemHeight: 20,
        itemWidth: 20,
        itemGap: 15,
        textStyle: {
            fontSize: window.innerWidth < '992' ? 12 : 14,
        },
        formatter: name=>{
            const index = props.moduleChartDetail.xaxis.indexOf(name);
            const value = props.moduleChartDetail.yaxis[index];
            return `${name} (${value})`;
        },
    },
    series: [
        {
            name: props.moduleChartDetail.chartName,
            type: 'pie',
            radius: ['40%', '80%'],
            center: ['55%', '50%'],
            // left: 'calc(70% - 175px)',
            left: window.innerWidth < '768' ? 'center' :'25%',
            top: window.innerWidth > '768' ? '10%' : window.innerWidth < '768' ? '20%' : '0%',
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 5,
                borderColor: '#fff',
                borderWidth: 2
            },
            label:{
                show: false,
            },
            // emphasis: {
            //     label: {
            //         show: true,
            //         fontSize: '20',
            //         fontWeight: 'bold'
            //     }
            // },
            labelLine: {
                show: false
            },
            data: moduleChartDetail.yaxis.map((item, index) => ({
                value: item,
                name: moduleChartDetail.xaxis[index],
            }))
        }
    ]
  };

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

//   const cData = {
//     labels: props.moduleChartDetail.xaxis,
//     datasets: [
//       {
//         data: props.moduleChartDetail.yaxis,
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF851B"],
//         hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF851B"]
//       }
//     ]
//   };

  const onEvents = {
    "click": e => chartClick(e),
  }

  return (
    <div 
      style={{ position: "relative"}} 
      onClick={()=>graphClickEvent(null)}
      className="cursor-pointer"
    >
      <ReactEcharts 
        option={option} 
        style={{minWidth: window.innerWidth < '768' ? '250px' : '350px', width: window.innerWidth < '720' ? '250px' : 'auto', cursor: 'pointer'}} 
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
