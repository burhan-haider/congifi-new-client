import React, {useState, useEffect, useRef} from 'react'
import {
    Box,
    Button,
    Grid,
    MenuItem,
    FormControl,
    Dialog,
} from '@mui/material'


import { TextFieldFormsy, DatePickerFormsy, SelectFormsy } from 'components/common/formsyComponents';

import Formsy from 'formsy-react';

import { actionMapping } from 'components/common/modules/actionregistry/ActionMapping';

import CommentsContainer from './CommentsContainer';

import { GenericAlert, GenericFilePicker } from '@application';
import EmailContainer from './CommunicationContainers/EmailContainer';
import CommunicationContainer from './CommunicationContainers/CommunicationContainer';

const CWFBottomContainer = (props) => {

    const { 
        actionButtons, 
        caseNo,
        selectedCaseStatus,
        
    } = props;

    const [modalOpen, setModalOpen] = useState(false)
    const [uploadModalOpen, setUploadModalOpen] = useState(false)
    const [commModalOpen, setCommModalOpen] = useState(false)
    const [currentAction, setCurrentAction] = useState(null)
    const [isFormValid, setIsFormValid] = useState(true)
    const [userActionType, setUserActionType] = useState(null)
    const [tabName, setTabName] = useState('')
    const [allTabs, setAllTabs] = useState([])
    const [totalRes, setTotalRes] = useState({})
    const [uploadFileData, setUploadFileData] = useState(null)
    const [commType, setCommType] = useState('email')
    const [noCaseAlert, setNoCaseAlert] = useState(false);
    const [alertType, setAlertType] = useState('success');
    const [alertMessage, setAlertMessage] = useState('Please Select A Case!');

    const [fileConfig, setFileConfig] = useState({
        allowedFileTypes: '',
        blockedFileTypes: '',
        delimiter: ',',
        maxSize: 0,

    })


    const openNoCaseAlert = () => {
        setNoCaseAlert(true);
    }

    const showCommentActions = [
        'addViewComments'
        //'escalateCasesByBranchManager1'
    ]

    const uploadActions = [
        'closeCasesByLevel3'
    ]

    const emailActions = [
        'sendEmailLEVEL2'
    ]
    const callActions = []
    const smsActions = []
    

    const formRef = useRef()

    useEffect(()=>{
        console.log("Action Buttons", actionButtons)
        console.log("Case No:-", caseNo)
        console.log("Case Status:-", selectedCaseStatus);
    })

    const handleClickClose = () => {
        setModalOpen(false)
    }

    const handleUploadClose = () => {
        setUploadModalOpen(false)
    }
    
    const handleCommOpen = () => {
        setCommModalOpen(true)
    }
    const handleCommClose = () => {
        setCommModalOpen(false)
    }

    const handleUploadModal = (action) => {
        actionMapping['getFileUploadConfig'](action, caseNo, userActionType)
            .then((res)=>{
                console.log("Upload Modal Response:-", res)
                setFileConfig({
                    allowedFileTypes: res.ALLOWFILETYPES,
                    blockedFileTypes: res.BLOCKFILETYPES,
                    delimiter: res.DELIMITER,
                    maxSize: res.FILEMAXSIZE,
                })
                setUploadModalOpen(true)
            })
            .catch(err=>{
                console.error("Upload API:-", err)
            })
    }

    const handleClick = (action) => {

        console.log("Action Fires:-", action.actionCode)

        if(caseNo === "") {
            setAlertMessage('Please Select A Case!')
            setAlertType('error')
            openNoCaseAlert()
        } else {
            setCurrentAction(action)

            if (emailActions.includes(action.actionCode)){
                setCommType('email')
                setCommModalOpen(true)
            } else if (smsActions.includes(action.actionCode)){
                setCommType('sms')
                setCommModalOpen(true)
            } else if (callActions.includes(action.actionCode)){
                setCommType('call')
                setCommModalOpen(true)
            } else if(action.actionCode === 'getFileUploadConfig'){
                actionMapping['getFileUploadConfig'](action, caseNo, userActionType)
                    .then((res)=>{
                        console.log("Upload Modal Response:-", res)
                        setFileConfig({
                            allowedFileTypes: res.ALLOWFILETYPES,
                            blockedFileTypes: res.BLOCKFILETYPES,
                            delimiter: res.DELIMITER,
                            maxSize: res.FILEMAXSIZE,
                        })
                        setUploadModalOpen(true)
                    })
                    .catch(err=>{
                        console.error("Upload API:-", err)
                    })
            }
            else{
                if(showCommentActions.includes(action.actionCode)){
            
                    actionMapping['getCWFCaseAndCommentsDetails'](action, caseNo, userActionType)
                    .then(res=>{
                            var allTabNames = res['TABNAMES']
                            console.log('tabname///////////////////////////',allTabNames)
                            console.log('res in CWFBottomContainer///////////////////////////',res)
                            setAllTabs(allTabNames)
                            setTabName(allTabNames[0])
                            setTotalRes(res)
                        })
                    .catch(err=>{
                        console.log(err)
                    })
                }
                setModalOpen(true)
            }
        }
    }

    const handleSubmit = (data) => {
        if(userActionType !== null){
            console.log("Form Data", data)
            actionMapping[currentAction.actionCode](currentAction, data, caseNo, userActionType)
                .then(res=>{
                    setModalOpen(false)
                    console.log(res)
                })
                .catch(err=>{
                    console.log(err)
                })

        }
    }

    const handleUploadSubmit = () => {

        const data = new FormData()

        data.append('file', uploadFileData)
        
        actionMapping['fileUploadConfig'](data, caseNo)
        .then(res=>{
            console.log("Response:-", res)
            setAlertType('success')
            setAlertMessage(res);
            openNoCaseAlert()
        })
        handleUploadClose()
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

            {/* Upload Dialog */}

            <Dialog
                aria-labelledby="file-upload-modal"
                open={uploadModalOpen}
                onClose={handleUploadClose}
                PaperProps={{
                    className: 'left-0 right-0 mx-auto top-3 min-w-[50vw] rounded-lg p-10',
                    sx: {
                        padding: '30px',
                        borderRadius: '8px'
                    }
                }}
            >
                <GenericFilePicker
                    fileData={uploadFileData}
                    setFile={setUploadFileData}
                    fileConfig={fileConfig}
                />
                <Box className='flex flex-row justify-end items-center mt-5' >
                    <Button
                        onClick={()=>{handleUploadSubmit()}}
                        className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]">
                        Upload
                    </Button>
                    <Button
                        onClick={()=>{setUploadModalOpen(false)}}
                        className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]">
                        Close
                    </Button>
                </Box>
                
            </Dialog>

            <Dialog
                aria-labelledby="file-upload-modal"
                open={commModalOpen}
                onClose={handleCommClose}
                PaperProps={{
                    className: 'left-0 right-0 mx-auto top-3 min-w-[92vw] rounded-lg p-2',
                    sx: {
                        padding: '30px',
                        borderRadius: '8px'
                    }
                }}
            >
                <CommunicationContainer 
                    commType={commType}
                    handleModalOpen={handleCommOpen} 
                    handleModalClose={handleCommClose}
                    handleSubmit={handleSubmit}
                    caseNo={caseNo}
                />
            </Dialog>

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
                    <>
                        {showCommentActions.includes(currentAction.actionCode)?(
                            <>
                                {Object.keys(totalRes).length>0&&(
                                    <CommentsContainer
                                        handleSubmit={handleSubmit}
                                        setIsFormValid={setIsFormValid}
                                        currentAction={currentAction}
                                        tabName={tabName}
                                        setTabName={setTabName}
                                        allTabs={allTabs}
                                        totalRes={totalRes}
                                        setUserActionType={setUserActionType}
                                        setModalOpen={setModalOpen}
                                    />
                                )}
                            </>
                            
                        ):(
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
                                                                //  value= {previousComments || ''}
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
                                                                //value={param.paramDefaultValues || ''}
                                                                // value={res.COMMENTS}
                                                            //    value= {accountReviewDate || ''}
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
                                                                format="dd/MM/yyyy"
                                                                inputFormat="dd/MM/yyyy"
                                                                toolbarFormat="dd/MM/yyyy"
                                                                dateTime={false}
                                                                allowKeyboardControl={true}
                                                                required={true}
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

                                        
                                        <Grid item xs={12} className='flex flex-row justify-end align-center w-full' >
                                
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
                                                    {uploadActions.includes(currentAction.actionCode)&&(
                                                        <Button
                                                            onClick={()=>{handleUploadModal(currentAction)}}
                                                            className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]">
                                                            Attach Evidence
                                                        </Button>
                                                    )}
                                                    
                                                </>
                                            )}
                                            <Button
                                                type="submit"
                                                onClick={()=>{setModalOpen(false)}}
                                                className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]">
                                                Close
                                            </Button>
                                        </Grid>
                                    
                                    </Grid>
                                </Formsy>
                            </Box>
                        )}
                    </>
                    
                ):'Action Not Found'}
            </Dialog>
            <GenericAlert
                message={alertMessage}
                type={alertType}
                snackbarOpen={noCaseAlert}
                setSnackbarOpen={setNoCaseAlert}
            />
        </Box>
    )
}

export default CWFBottomContainer;