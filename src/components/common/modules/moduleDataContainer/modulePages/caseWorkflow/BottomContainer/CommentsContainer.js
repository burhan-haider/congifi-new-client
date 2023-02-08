import React, {useRef} from 'react'
import {
    Box,
    Button,
    Grid,
    MenuItem,
    FormControl,
    Tabs,
    Tab,
} from '@mui/material'


import { TextFieldFormsy, DatePickerFormsy, SelectFormsy } from 'components/common/formsyComponents';

import Formsy from 'formsy-react';

const CommentsContainer = (props) => {

    const formRef = useRef();

    const {
        handleSubmit,
        setIsFormValid,
        currentAction,
        tabName,
        setTabName,
        allTabs,
        totalRes,
        setUserActionType,
        setModalOpen
    } = props;

    return(
        <Box className='min-w-[600px]'>
            <Formsy
                onValidSubmit={data => handleSubmit(data)}
                onValid={() => setIsFormValid(true)}
                onInvalid={() => setIsFormValid(false)}
                ref={formRef}
                className="flex flex-col justify-center w-full"
            >
                {currentAction.actionCode === "addViewComments" && (
                    <Tabs
                        value={tabName}
                        onChange={(e, tabValue) => {
                            console.log("Tab Value OnChange:-",tabValue)
                            setTabName(tabValue)
                        }}
                    >
                        {allTabs.map((tabValue) => {
                            console.log("Tab Value:-", tabValue)
                                return(
                                    <Tab
                                    label={tabValue}
                                    value={tabValue}
                                />
                            )
                        }
                            
                        )}
                        
                    </Tabs>
                )}
                                

                {currentAction.actionParams.map((param, index)=>(   
                    <>
                    {/* {allTabs.map((eachTab)=> (

                    ))} */}
                    
                        {param.paramDataType === "textarea" && tabName === "LEVEL1" && (
                            <Grid item xs={12} >
                                <FormControl className="m-2 w-100 flex flex-nowrap" >
                                    <TextFieldFormsy
                                        variant="outlined"
                                        name={param.paramId}
                                        label={param.paramName}
                                        onChange={() => {}}
                                        validationError=""
                                        required={true}
                                        value= {totalRes[0][0]['app.common.COMMENTS'] || ''}
                                        multiline={true}
                                        rows={4}
                                        sx={{
                                            width: '100%'
                                        }}
                                        disabled={!param.enabled}
                                    ></TextFieldFormsy>
                                </FormControl>
                            </Grid>
                        )}
                        {param.paramDataType === "text" &&  tabName === "LEVEL1" && (
                            <Grid item xs={12} >
                                <FormControl className="m-2 w-100 flex flex-nowrap" >
                                    <TextFieldFormsy
                                        variant="outlined"
                                        name={param.paramId}
                                        label={param.paramName}
                                        className="w-[100%]"
                                        validationError=""
                                        required={true}
                                        //value={param.paramDefaultValues || ''}
                                        // value={res.COMMENTS}
                                        value= {totalRes[0][0]['app.common.LASTREVIEWEDDATE'] || ''}
                                        disabled={!param.enabled}
                                    ></TextFieldFormsy>
                                </FormControl>
                            </Grid>
                        )}
                        
                        {param.paramDataType === "date" && (
                            <Grid item xs={12}>
                                <FormControl className="m-2 w-100 flex flex-nowrap" >
                                    <DatePickerFormsy
                                        variant="filled"
                                        name={param.paramId}
                                        label={param.paramName}
                                        ampm={false}
                                        className={undefined}
                                        dateTime={false}
                                        allowKeyboardControl={true}
                                        required={true}
                                        value={new Date()}
                                        disabled={!param.enabled}
                                    />
                                </FormControl>
                            </Grid>
                        )}
                        {param.paramDataType === 'select' && param.paramStaticValues !== null ? (
                            <Grid item xs={12} key={index}>
                            <FormControl className="m-2 w-100 flex flex-nowrap">
                                <SelectFormsy
                                variant="outlined"
                                name={param.paramId}
                                label={param.paramName}
                                value={
                                    param.paramDefaultValues === null || " "
                                    ? `NA`
                                    : param.paramDefaultValues
                                }
                                className="w-100"
                                onChange={() => {}}
                                validationError=""
                                disabled={!param.enabled}
                                //required={true}
                                >
                                <MenuItem value="">Select One</MenuItem>
                                {param.paramStaticValues.split(',').map((option, index) => {
                                    return (
                                    <MenuItem value={option} key={index}>
                                        {option === null || "" ? `NA` : option}
                                    </MenuItem>
                                    );
                                })}
                                </SelectFormsy>
                            </FormControl>
                            </Grid>
        
                        ):(<></>)}

                    </>
                ))}
                <Grid xs={12} className='flex flex-row justify-end align-center w-full' >
                    
                    {currentAction.actionCode !== "addViewComments" && (
                        <>
                            <Button
                                type="submit"
                                onClick={()=>{setUserActionType('Post')}}
                                className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]">
                                Post
                            </Button>
                            <Button
                                type="submit"
                                onClick={()=>{setUserActionType('PostAndClose')}}
                                className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]">
                                Post And Close
                            </Button>
                            <Button
                                className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]">
                                Attach Evidence
                            </Button>
                        </>
                    )}
                    <Button
                        type="submit"
                        onClick={()=>{setModalOpen(false)}}
                        className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]">
                        Close
                    </Button>
                </Grid>
            </Formsy>
        </Box>
    )
}

export default CommentsContainer;