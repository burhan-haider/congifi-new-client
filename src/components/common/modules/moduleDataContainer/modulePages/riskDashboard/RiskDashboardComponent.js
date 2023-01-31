import {useState, useEffect} from 'react'
import {
    DialogContent,
    Grid,
    FormControl,
    TextField,
    DialogActions,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    MenuItem,
    Box,
    Tabs,
    Tab,
    Typography
} from "@mui/material";
import { GenericButton, GenericDatatable } from "@application";
import Formsy from "formsy-react";
import { 
    TextFieldFormsy, 
    SelectFormsy, 
    DatePickerFormsy 
} from "components/common/formsyComponents";
import { useClasses } from '@application';
import moment from 'moment';
import httpService from 'services/httpservice/httpService'
import RiskDashboardBottomContainer from './RiskDashboardBottomContainer'

const RiskDashboardComponent = () => {

    const [value, setValue] = useState(0);
    const [tableData, setTableData] = useState({});
    const [showTable, setShowTable] = useState(false);
    const [dataSelected, setDataSelected] = useState([]);
    const [searchData, setSearchData] = useState({});

    const listData = [
        "Monthly",
        "Quarterly",
        "Daily",
        "MIS1",
        "CDDMIS"
    ];

    let list = "";

    const token = window.localStorage.getItem("cognifi_token");
    let config = {
        headers: {
            Authorization: "Bearer " + token,
            'Content-Type': `multipart/form-data`,
        }
    };

    const handleSubmit = async(data) => {

        // console.log("Form Data:-", data)

        const formData = new FormData();

        formData.append("FromDate", data.FromDate);
        formData.append("ToDate", data.ToDate);
        formData.append("ReportFrequency", data.ReportFrequency);

        await httpService
            .get("/api/reports/getConsolidatedReportTabView",  formData, config)
            .then(response => {
                // console.log("API Response",response)
                setTableData(response.data);
                let parentTableData = [];
                Object.keys(response.data).map(key => {
                    parentTableData.push([key]);
                }) 
                setSearchData({
                    VIEWTYPE: "ALL",
                    MODULENAME: "Risk Dashboard",
                    GROUP: "RISKDASHBOARD",
                    DATA: parentTableData,
                    HEADER: ["Risk Dashboard Tables"],
                    INTERNALDATA: response.data
                })
                setShowTable(true);
            })
            .catch(err=>{
                console.log(err);
            });
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3}}>
                {children}
              </Box>
            )}
          </div>
        );
      }

    return(
        <div className='p-5' >
            <Formsy onValidSubmit={data=>handleSubmit(data)} >
                <Grid container className="py-5 container" alignItems={'center'}>
                    <Grid item sm={3} className='pr-3'>
                        <DatePickerFormsy
                            variant="outlined"
                            name={`FromDate`}
                            label={`From`}
                            ampm={false} // 24Hr / 12hr clock settings
                            className={undefined} // optional, if you need for styling
                            dateTime={false} // true, if need the Date and Time Picker. false if you need only Date Picker
                            allowKeyboardControl={true} // optional, this will allow keybord to control the picker.
                            value={moment(new Date()).format('L')}
                        />
                    </Grid>
                    <Grid item sm={3} className='pr-3'>
                        <DatePickerFormsy
                            variant="outlined"
                            name={`ToDate`}
                            label={`To`}
                            ampm={false} // 24Hr / 12hr clock settings
                            className={undefined} // optional, if you need for styling
                            dateTime={false} // true, if need the Date and Time Picker. false if you need only Date Picker
                            allowKeyboardControl={true} // optional, this will allow keybord to control the picker.
                            value={moment(new Date()).format('L')}
                        />
                    </Grid>
                    <Grid item sm={3} className='pr-3' >
                        <SelectFormsy 
                            variant="outlined"
                            name="ReportFrequency"
                            label="Report Frequency"
                            className={"w-full text-left"}
                            required={true}
                            value={list}
                        >
                            {/* <option aria-label="None" disabled value="" /> */}
                            {listData.map((item, index) => {
                                return (
                                <MenuItem key={index} value={item}>
                                    {item}
                                </MenuItem>
                                );
                            })}
                        </SelectFormsy>
                    </Grid>
                    <Grid item sm={3} className="text-left align-middle">
                        <GenericButton
                            color="primary"
                            type="submit"
                            className="px-10"
                        >
                            Search
                        </GenericButton>
                    </Grid>
                </Grid>
            </Formsy>
            {showTable && (
            <>
                <Box 
                    sx={{ 
                        borderBottom: 1, 
                        borderColor: 'divider',
                    }}
                >
                    <GenericDatatable
                        dataSet={searchData}
                        moduleCode={searchData.MODULENAME?searchData.MODULENAME:""}
                        moduleName={searchData.MODULENAME?searchData.MODULENAME:""}
                        infoEnabled={true}
                        BottomContainer={RiskDashboardBottomContainer}
                        selected={dataSelected}
                        selectHandler={setDataSelected}
                    ></GenericDatatable>
                    {/* <Tabs 
                        value={value} 
                        onChange={handleChange} 
                        aria-label="basic tabs example" 
                        variant="scrollable"
                    >
                        {Object.keys(tableData).map((item, index)=>(
                            <Tab 
                                key={index} 
                                label={`${item}`} 
                                wrapped
                                sx={{
                                    textAlign: 'left',
                                }}
                                {...a11yProps(index)} 
                            />
                        ))}
                    </Tabs> */}
                    
                </Box>
                {/* {Object.values(tableData).map((item, index)=>{
                    let searchData = {
                        VIEWTYPE: "ALL",
                        MODULENAME: "Risk Dashboard",
                        GROUP: "RISKDASHBOARD",
                        DATA: item.listResultData.length > 0 ? item.listResultData : [],
                        HEADER: item.listResultHeader.length > 0 ? item.listResultHeader[0] : []
                    };

                    return (
                        <TabPanel key={index} value={value} index={index}>
                            <GenericDatatable
                                dataSet={searchData}
                                moduleCode={JSON.stringify(Object.keys(tableData)[index])}
                                moduleName={Object.keys(tableData)[index]}
                                infoEnabled={true}
                                BottomContainer={RiskDashboardBottomContainer}
                                selected={dataSelected}
                                selectHandler={setDataSelected}
                            ></GenericDatatable>
                        </TabPanel>
                        )
                    })} */}
            </>
            )}
            
        </div>
    )

}

export default RiskDashboardComponent