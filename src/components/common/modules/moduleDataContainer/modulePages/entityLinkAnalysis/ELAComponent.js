import React, { useEffect, useState, useRef } from 'react';
import {
    Grid,
    MenuItem,
    Box,
    TextField,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Button,
    Menu,
} from '@mui/material'
import ReactEcharts from 'echarts-for-react';
import { FaAngleDown } from 'react-icons/fa';
import httpService from 'services/httpservice/httpService'
import Formsy from "formsy-react";
import { 
    GenericButton,
    GenericDatagrid,
} from "@application";
import { TextFieldFormsy, DatePickerFormsy } from "components/common/formsyComponents";
import { useClasses } from '@application'
import { 
    MdExpandMore as ExpandMoreIcon, 
    MdOutlineSearch as SearchButtonIcon,
  } from "react-icons/md"
// import GraphComponent from './data/GraphComponent'
import moment from 'moment';
import { tableData, graphDataTree } from './dummyData';

const styles = theme => ({
    root: {
      width: "100%",
  
      "& .MuiExpansionPanelSummary-content": {
        margin: "2px 0"
      },
  
      " & .MuiExpansionPanelSummary-root": {
        backgroundColor: "#f4f5fa"
      }
    },
    formControl: {
      // margin: theme.spacing(1),
      fullWidth: true,
      display: "flex",
      wrap: "nowrap"
    },
    expandedPanel: {
      backgroundColor: "#f4f5fa"
    },
    heading: {
      color: "#052a4f",
      fontSize: theme.typography.pxToRem(18),
      fontWeight: "500"
    },
    rowDesign: {
      paddingTop: 15,
      paddingRight: 20,
      paddingLeft: 20,
    }
  });

const ELAComponent = () => {

    const horParentRef = useRef();
    const horChartRef = useRef();
    
    const verParentRef = useRef();
    const verChartRef = useRef();
    
    const [customerData, setCustomerData] = useState({});
    const [showTree, setShowTree] = useState(false);
    const [graphMenu, setGraphMenu] = useState(null)
    const [expandedPanel, setExpandedPanel] = useState(true);
    const [showData, setShowData] = useState(false)
    const [displayType, setDisplayType] = useState('table')

    const [horOptions, setHorOptions] = useState({
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          series: [
            {
              type: 'tree',
              data: [graphDataTree],
              top: '10%',
              left: '20%',
              bottom: '10%',
              right: '20%',
              height: '',
              symbolSize: 15,
              symbol: 'circle',
              itemStyle: {
                color: '#052a4f'
              },
              
              label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize:18
              },
              leaves: {
                label: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left'
                }
              },
              emphasis: {
                focus: 'descendant'
              },
              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750,
              
            }
          ]
    })

    const [verOptions, setVerOptions] = useState({
        ...horOptions,
        series: [
            {
                ...horOptions.series[0],
                orient: 'vertical',
            }
        ]
    })

    // const token = window.localStorage.getItem("cognifi_token");
    // let config = {
    //     headers: {
    //         Authorization: "Bearer " + token,
    //         'Content-Type': `multipart/form-data`,
    //     }
    // };
    const openGraphMenu = Boolean(graphMenu)

    const handleOpen = (event) => {
        setGraphMenu(event.currentTarget)
    }
    const handleClose = () => {
        setGraphMenu(null)
    }

    const classes = useClasses(styles);

    const handlePanelExpansion = panel => (event, expandedPanel) => {
        //console.log(expandedPanel, panel);
        setExpandedPanel(expandedPanel ? panel : false);
    };

    const handleSubmit = async(formData) => {
        // console.log("Form Data:-", formData)
        setShowData(true)
        setExpandedPanel(false)
        // await httpService
        //     .post("/investigation/searchCustomer360Data", config, {
        //         params: formData
        //     })
        //     .then(response => {
        //         console.log("Response:-", response)
        //         setCustomerData(response.data);
        //         setShowTree(true);
        //     })
        //     .catch(err=>{
        //         console.log(err);
        //     });
    };

    const handleClickNode = (e) => {
        console.log("Clicked:-", e);
    };

    const onEvents = {
        "click": (e) => handleClickNode(e),
    }

    return(
        <div className='p-5' >
            <Accordion 
                expanded={expandedPanel}
                onChange={()=>setExpandedPanel(!expandedPanel)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="searchPanelHeader"
                    classes={{
                        root: classes.root,
                        expanded: classes.expandedPanel
                    }}
                >
                    <Typography className={classes.heading} id="searchHeader">
                        Entity Link Analysis
                    </Typography>
                </AccordionSummary>
                <AccordionDetails
                    align="left"
                    id="searchExpansionPanelDetails"
                    style={{ padding: 5 }}
                >
                    <Formsy onValidSubmit={data=>handleSubmit(data)} >
                        <Grid
                            container
                            alignItems="flex-start"
                            spacing={2}
                            className={classes.rowDesign}
                        >
                            <Grid item sm={4} className="w-[100%]">
                                <DatePickerFormsy
                                    variant="outlined"
                                    name={`FromDate`}
                                    label={`From`}
                                    ampm={false}
                                    dateTime={false}
                                    allowKeyboardControl={true}
                                    value={moment(new Date()).format('L')}
                                    className={"w-[800px]"}
                                    sx={{
                                        background: 'red',
                                    }}
                                />
                            </Grid>
                            <Grid item sm={4}>
                                <DatePickerFormsy
                                    variant="outlined"
                                    name={`ToDate`}
                                    label={`To`}
                                    ampm={false}
                                    className={undefined}
                                    dateTime={false}
                                    allowKeyboardControl={true}
                                    value={moment(new Date()).format('L')}
                                />
                            </Grid>
                            <Grid item xs={4} className="" >
                                <TextFieldFormsy
                                    variant="outlined"
                                    name={`accNo`}
                                    label={`Account Number`}
                                    className="w-[100%]"
                                    required={true}
                                    value=""
                                ></TextFieldFormsy>   
                                
                            </Grid>
                            
                        </Grid>
                        <Box className={classes.rowDesign} alignItems={'flex-end'}>
                            <Grid item xs={2}>
                                <GenericButton
                                    color="primary"
                                    type="submit"
                                    className="px-10 mb-5"
                                >
                                    Search
                                </GenericButton>
                            </Grid>
                        </Box>
                    </Formsy>
                </AccordionDetails>
            </Accordion>
            {showData&&(
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="searchPanelHeader"
                        classes={{
                        root: classes.root,
                        expanded: classes.expandedPanel
                        }}
                    >
                        <Typography className={classes.heading} id="searchHeader">
                            Entity Link Data
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        align="left"
                        id="searchExpansionPanelDetails"
                        style={{ padding: '15px' }}
                    >
                        <Box className="flex flex-row justify-start items-center" >
                            <Button
                                className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]"
                                variant="contained"
                                size="small"
                                onClick={()=>setDisplayType('table')}
                            >
                                Show Table View
                            </Button>
                            <Button
                                className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]"
                                aria-controls={openGraphMenu ? 'freeze-dropdown-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openGraphMenu ? 'true' : undefined}
                                variant="contained"
                                size="small"
                                onClick={handleOpen}
                                endIcon={<FaAngleDown size={12} />}
                            >
                                Show Graph View
                            </Button>
                            <Menu
                                id="freeze-dropdown-menu"
                                anchorEl={graphMenu}
                                open={openGraphMenu}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={()=>{
                                    setDisplayType('horizontalTree')
                                    handleClose()
                                }} >
                                    Horizontal View
                                </MenuItem>
                                <MenuItem onClick={()=>{
                                    setDisplayType('verticalTree')
                                    handleClose()
                                }} >
                                    Vertical View
                                </MenuItem>
                            </Menu>
                        </Box>
                        {displayType==='table'&&(
                            <GenericDatagrid 
                                title={'Entity List Tab View'} 
                                tableData={tableData} 
                                utilColumn={'select'}
                            />
                        )}

                        {displayType==='horizontalTree'&&(
                            <div 
                                ref={horParentRef}
                                className="mb-5 p-5" 
                            >
                                <ReactEcharts
                                    style={{
                                        minHeight: '600px',
                                        maxWidth: '80%',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        border: '2px solid #ccc',
                                    }}
                                    onEvents={onEvents}
                                    option={horOptions} 
                                    ref={horChartRef}
                                />
                            </div>
                        )}

                        {displayType==='verticalTree'&&(
                            <div 
                                ref={verParentRef}
                                className="mb-5 p-5" 
                            >
                                <ReactEcharts
                                    style={{
                                        minHeight: '601px',
                                        maxWidth: '80%',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        border: '2px solid #ccc',
                                    }}
                                    onEvents={onEvents}
                                    option={verOptions} 
                                    ref={verChartRef}
                                />
                            </div>
                        )}
                    </AccordionDetails>
                </Accordion>
            )}
            
            
        </div>
    )
}

export default ELAComponent;
