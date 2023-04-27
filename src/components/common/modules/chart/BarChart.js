import React, {useRef} from "react";
import { Chart as ChartJS, registerables } from 'chart.js'
import { Bar, getElementAtEvent } from "react-chartjs-2";
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

ChartJS.register(...registerables);

export default function BarChart(props) {
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

  const labelOption = {
    show: true,
    position: ['50%', '90%'],
    distance: 15,
    align: 'left',
    verticalAlign: 'middle',
    rotate: 90,
    fontSize: 16,
    color: '#fff',
  };

  const option = {
    legend: {},
    aria: {
      enabled: true,
      decal:{
        show: true,
        decals:{
          symbol: 'circle'
        },
      }
    },
    xAxis: {
      name: props.moduleChartDetail.xaxisName,
      type: 'category',
      data: props.moduleChartDetail.xaxis,
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: props.moduleChartDetail.yaxisName,
        data: props.moduleChartDetail.yaxis,
        type: 'bar',
        showBackground: true,
        label: labelOption,
        barCategoryGap: '-10%',
        barGap: '-100%',  // this changed // this changed
        barWidth: '40%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ]),
          borderRadius: [10,10,0,0],
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
      // {
      //   name: props.moduleChartDetail.yaxisName,
      //   data: props.moduleChartDetail.yaxis.map((item, index)=>{
      //     return parseFloat(item) - (parseFloat(item) * 0.10);
      //   }),
      //   type: 'bar',
      //   showBackground: true,
      //   barGap: '-100%',  
      //   barCategoryGap: '-0%',
      //   barWidth: '35%',
      //   itemStyle: {
      //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //       { offset: 0, color: '#f9ffa1' },
      //       { offset: 0.5, color: '#f2db00' },
      //       { offset: 1, color: '#f0c200' }
      //     ]),
      //     borderRadius: [10,10,0,0],
      //   },
      //   emphasis: {
      //     itemStyle: {
      //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //         { offset: 0, color: '#e7a300' },
      //         { offset: 0.7, color: '#e7a300' },
      //         { offset: 1, color: '#f9ffa1' }
      //       ])
      //     }
      //   },
      //   backgroundStyle: {
      //     color: 'rgba(180, 180, 180, 0.2)'
      //   }
      // },
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
  // const cData = {
  //   labels: moduleChartDetail.xaxis,
  //   datasets: [
  //     {
  //       label: moduleChartDetail.labelName,
  //       backgroundColor: "#f8fab8",
  //       borderColor: "rgba(255,99,132,1)",
  //       borderWidth: 1,
  //       hoverBackgroundColor: "rgba(255,99,132,0.4)",
  //       hoverBorderColor: "rgba(255,99,132,1)",
  //       data: moduleChartDetail.yaxis
  //     }
  //   ]
  // };

  const chartClick = (e) => {
    console.log("chartClick:-", e);
    console.log("chartClick:-", e.dataIndex);
    graphClickEvent(e.dataIndex);
  }

  const onEvents = {
    "click": e => chartClick(e),
  }

  return (
    <div 
      style={{ position: "relative" }}
      onClick={()=>graphClickEvent(null)}
    >
      <ReactEcharts 
        ref={myChart} 
        option={option} 
        style={{minHeight: window.innerWidth < '992' ? '250px' : '350px', cursor: 'pointer', }} 
        className="pl-2 pr-3 py-1" 
        onEvents={onEvents}
      />
      {/* <Bar
        data={cData}
        // getElementAtEvent={elms => graphClickEvent(elms)}
        onClick={elms => graphClickEvent(elms)}
        ref={myChart}
        options={{
          responsive: true,
          title: {
            display: true,
            text: moduleChartDetail.chartName
          },
          legend: {
            display: false
          },
          layout: {
            padding: {
              left: 10,
              right: 15,
              top: 20,
              bottom: 20
            }
          },
          scales: {
            yAxes: {
                //stacked: true,
                gridLines: {
                  display: true,
                  color: "E0E0EB"
                },
                scaleLabel: {
                  display: true,
                  labelString: moduleChartDetail.yaxisName
                },
                ticks: {
                  beginAtZero: true
                }
              },
            xAxes: 
              {
                gridLines: {
                  display: true
                },
                scaleLabel: {
                  display: true,
                  labelString: moduleChartDetail.xaxisName
                },
                //barPercentage: 0.3,
                ticks: {}
              },
            // scaleShowGridLines: true
          }
        }}
      /> */}
    </div>
  );
}
