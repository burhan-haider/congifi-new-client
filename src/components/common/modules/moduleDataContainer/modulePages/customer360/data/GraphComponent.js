import React, { useEffect, useState, useRef, useLayoutEffect } from  'react';
import getIconByKey from 'assets';
// import { useD3 } from '@application';
// import * as d3 from 'd3';
import ReactEcharts from 'echarts-for-react';

const GraphComponent = (props) => {

    const data = props.data || null;

    const root = props.data!=null?{
        ...data, 
        itemStyle: {
            color: 'rgb(0, 0, 4)'
        },
        children: data.children.map((item, index) =>{
        return {
            ...item,
            itemStyle: {
                color: "rgb(81, 19, 124)"
            },
            children: item.children.map((child, index)=>{
                return {
                    ...child,
                    itemStyle: {
                        color: "rgb(182, 55, 122)"
                    },
                    children: child.children.map((grandChild, index)=>{
                        return {
                            ...grandChild,
                            itemStyle: {
                                color: "rgb(251, 135, 98)"
                            }
                        }
                    })
                }
            })
        }
    })}:null;

    const parentRef = useRef();
    const chartRef = useRef();

    //get root path
    const rootPath = window.location.pathname;
    const [d3Config, setD3Config] = useState("")
    const [parentHeight, setParentHeight] = useState(0)
    const [parentWidth, setParentWidth] = useState(0)
    const [options, setOptions] = useState({
        tooltip:{
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: (params) => {
                return(
                    `${params.value}`
                )
            }
        },
        toolbox: {
            show: true,
            itemSize: 20,
            itemGap: 12,
            showTitle: true,
            feature: {
                saveAsImage: { 
                    show: true 
                },
                restore: {
                    show: true,
                    title: "Restore"
                },
                dataView: {
                    show: true,
                    title: "Data View",
                    lang: ["Data View", "Close", "Refresh"],
                    readOnly: true,
                    optionToContent: (opt) => {
                        console.log("opt:-",opt.series)
                        return(
                            `<div>${JSON.stringify(opt.series[0].data)}</div>`
                        )
                    }
                },
                myExpandAll:{
                    show: true,
                    title: "Expand All",
                    icon: 'path://M0,10 L10,10 L10,0 L0,0z M0,10 L10,10 L10,0 L0,0z M0,10 L10,10 L10,0 L0,0z',
                    onclick: (e) => {
                        setOptions({
                            ...options,
                            series: [
                                {
                                    ...options.series[0],
                                    initialTreeDepth: -1,
                                }
                            ]
                        })
                    },
                },
                myCollapseAll:{
                    show: true,
                    title: "Collapse All",
                    icon: 'path://M0,10 L10,10 L10,0 L0,0z M0,10 L10,10 L10,0 L0,0z M0,10 L10,10 L10,0 L0,0z',
                    onclick: (e) => {
                        setOptions({
                            ...options,
                            series: [
                                {
                                    ...options.series[0],
                                    initialTreeDepth: 0,
                                }
                            ]
                        })
                    },
                }
            },
            
          },
        series: [
            {
                type: 'tree',
                data: root != null ? [root] : [],
                top: '8%',
                roam: true,
                bottom: '20%',
                layout: 'radial',
                symbol: 'circle',
                symbolSize: 7,
                initialTreeDepth: 1,
                animationDurationUpdate: 550,
                emphasis: {
                    focus: 'descendant',
                },
                label: {
                    distance: 10
                }
            }
        ]
    });


    useLayoutEffect(() => {
        // console.log("Parent Height:-", parentRef.current.clientHeight)
        // console.log("Parent Width:-", parentRef.current.clientWidth)
        setParentHeight(parentRef.current.clientHeight)
        setParentWidth(parentRef.current.clientWidth)
    },[parentRef.current])

    useEffect(()=>{

        setOptions({
            ...options, 
            series:[
                {
                    ...options.series[0], 
                    data:[root]
                }
            ]
        })

        console.log("Use Effect Called", rootPath)
        console.log("Graph Data:-",root)
        console.log("Charts Ref:-", chartRef.current)
        // console.log("Image:-", getIconByKey('expand'));
    },[data])

    

    const handleClick = (e) => {
        console.log("Clicked:-", e);
    };

    // Event Listeners for individual nodes eg. "click", "mousemove", "mouseover", "mouseout"
    const onEvents = {
        "click": (e) => handleClick(e),
    }


    return(
        <div 
            ref={parentRef}
            className="mb-5" 
        >
            <ReactEcharts
                style={{
                    width: parentWidth - 50, 
                    height: parentWidth - 800,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    border: '2px solid #ccc',
                }}
                onEvents={onEvents}
                option={options} 
                ref={chartRef}
            />
        </div>
    )

}

export default GraphComponent;