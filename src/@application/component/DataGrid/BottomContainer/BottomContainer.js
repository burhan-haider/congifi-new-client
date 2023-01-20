import React, {useState, useEffect, useRef} from 'react'
import {
    Box,
    Button,
    Grid,
    IconButton,
    InputBase,
    Typography,
    Select,
    Menu,
    MenuItem,
    InputLabel,
    FormControl,
    Dialog,
} from '@mui/material'

import { GenericButton } from '@application'

import { TextFieldFormsy, DatePickerFormsy, SelectFormsy } from 'components/common/formsyComponents';

import Formsy from 'formsy-react';

import { actionMapping } from 'components/common/modules/actionregistry/ActionMapping';

const BottomContainer = (props) => {

    const { 
        actionButtons, 
        selectedData = null,
        moduleType,
        caseNo
    } = props;

    const [modalOpen, setModalOpen] = useState(false)
    const [currentAction, setCurrentAction] = useState(null)
    const [isFormValid, setIsFormValid] = useState(true)

    const formRef = useRef()

    useEffect(()=>{
        console.log("Action Buttons", actionButtons)
    })

    const handleClickOpen = () => {
        setModalOpen(true)
    }

    const handleClickClose = () => {
        setModalOpen(false)
    }

    const handleClick = (action) => {
        
        setCurrentAction(action)
        if(moduleType === 'caseworkflow'){
            setModalOpen(true)
        }
        else{
            actionMapping[action.actionCode](action).then(res=>{
                console.log(res)
            })
        }
    }

    const handleSubmit = (data) => {
        console.log("Form Data", data)
        actionMapping[currentAction.actionCode](currentAction, data, caseNo).then(res=>{
            console.log(res)
        })
    }
 
    return (
        <Box className="flex flex-row justify-end items-center" >
            {actionButtons.length > 0 && actionButtons.map((action, index)=>(
                <Button
                    onClick={()=>handleClick(action)}
                    className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]">
                        {action.actionName}
                </Button>
            ))}

            <Dialog
                aria-labelledby="custom-modal"
                open={modalOpen}
                onClose={handleClickClose}
                PaperProps={{
                    className: 'left-0 right-0 mx-auto top-3 w-[93vw] rounded-lg p-10',
                    sx: {
                        padding: '30px',
                        borderRadius: '8px'
                    }
                }}
            >
                {currentAction!=null&&currentAction.actionParams.length>0?(
                    <Box className='min-w-[600px]'>
                        <Formsy
                            onValidSubmit={data => handleSubmit(data)}
                            onValid={() => setIsFormValid(true)}
                            onInvalid={() => setIsFormValid(false)}
                            ref={formRef}
                            className="flex flex-col justify-center w-full"
                        >
                            <Grid container gap={2}>
                                {currentAction.actionParams.map((param, index)=>(
                                    <>
                                        {param.paramDataType === "textarea" && (
                                            <Grid item xs={12} >
                                                <FormControl className="m-2 w-100 flex flex-nowrap" >
                                                    <TextFieldFormsy
                                                        variant="outlined"
                                                        name={param.paramId}
                                                        label={param.paramName}
                                                        onChange={() => {}}
                                                        validationError=""
                                                        required={true}
                                                        value={param.paramDefaultValues || ''}
                                                        multiline={true}
                                                        rows={4}
                                                        sx={{
                                                            width: '100%'
                                                        }}
                                                    ></TextFieldFormsy>
                                                </FormControl>
                                            </Grid>
                                        )}
                                        {param.paramDataType === "text" && (
                                            <Grid item xs={12} >
                                                <FormControl className="m-2 w-100 flex flex-nowrap" >
                                                    <TextFieldFormsy
                                                        variant="outlined"
                                                        name={param.paramId}
                                                        label={param.paramName}
                                                        className="w-[100%]"
                                                        validationError=""
                                                        required={true}
                                                        value={param.paramDefaultValues || ''}
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
                                    <Button
                                        type="submit"
                                        className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]">
                                        Post
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]">
                                        Post And Close
                                    </Button>
                                    <Button
                                        className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]">
                                        Attach Evidence
                                    </Button>
                                </Grid>
                            </Grid>
                        </Formsy>
                    </Box>
                ):'Action Not Found'}
            </Dialog>
        </Box>
    )
}

export default BottomContainer;