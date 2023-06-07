import React, {useState, useEffect, useRef, Fragment} from 'react'
import {
    Box,
    Button,
    Grid,
    MenuItem,
    FormControl,
    Dialog,
    Typography,
    IconButton
} from '@mui/material'
import { AiOutlineClose } from "react-icons/ai";
// import CloseIcon from '@mui/icons-material/Close';
import { TextFieldFormsy, DatePickerFormsy, SelectFormsy } from 'components/common/formsyComponents';

import Formsy from 'formsy-react';

import { actionMapping } from 'components/common/modules/actionregistry/ActionMapping';

import CommentsContainer from './CommentsContainer';

import { GenericAlert, GenericFilePicker, useClasses, styles } from '@application';
import CommunicationContainer from './CommunicationContainers/CommunicationContainer';



const CWFBottomContainer = (props) => {

    const { 
        actionButtons, 
        caseNo,
        selectedCaseStatus,
        
    } = props;

    // const styles = theme => ({
    //     root: {
    //         "& .MuiOutlinedInput-input": {
    //             padding: '5px 20px',

    //           },
    //         "& .MuiOutlinedInput-root": {
    //         borderRadius: "70px",
    //         height: 'auto',
    //         backgroundColor: '#fff',
    //         },
          
    //     },
    //     formControl: {
    //         margin: 1,
    //         fullWidth: true,
    //         display: "flex",
    //         wrap: "nowrap",
    //         padding: '5px'
    //       },
    // })

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
    const [modalAction, setModalAction]= useState()
    const classes = useClasses(styles);


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
            setModalAction(action.actionName)

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
                actionMapping['getFileUploadConfig'](action, caseNo[0], userActionType)
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
            
                    actionMapping['getCWFCaseAndCommentsDetails'](action, caseNo[0], userActionType)
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
        console.log("User Action Type:-", userActionType);
        if(userActionType !== null){
            console.log("Form Data", data)
            actionMapping[currentAction.actionCode](currentAction, data, caseNo[0], userActionType)
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
        
        actionMapping['fileUploadConfig'](data, caseNo[0])
        .then(res=>{
            console.log("Response:-", res)
            setAlertType('success')
            setAlertMessage(res);
            openNoCaseAlert()
        })
        handleUploadClose()
    }

    const checkDisabled = (action) => {
        let tempDisabled = false;
        if(selectedCaseStatus.length>1){
            if(action.isMultiselect === 'Y'){
                if(!selectedCaseStatus.every((status)=>action.enabledFor.includes(status))){
                    tempDisabled = true;
                }
                return tempDisabled;
            }
            else{
                return true
            }
        }
        else{
            if(selectedCaseStatus.length === 1){
                if(action.enabledFor.includes('ALL') || action.enabledFor.includes(selectedCaseStatus[0])){
                    return false
                }
                else{
                    return true
                }
            }
            else{
                return true
            }  
        }
    }
// console.log('currentAction is:', currentAction)
    return (
        <Box className={`${classes.root} flex flex-row justify-end items-center`} >
            {actionButtons.length > 0 && actionButtons.map((action, index)=>(
                <Button
                    onClick={()=>handleClick(action)}
                    disabled={checkDisabled(action)}
                    className="action-btn px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f] disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none">
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
                className={`${classes.root}`}
                // className='mx-auto rounded-lg p-3' 
                // PaperProps={{
                //     className: 'left-0 right-0 mx-auto top-3 min-w-[70vw] rounded-lg p-3',
                //     sx: {
                //         padding: '30px',
                //         borderRadius: '8px'
                //     }
                // }}
            >
                <Typography className='pl-5 bg-[#f4f5fa]'>{modalAction}</Typography>
                    <IconButton
                    aria-label="close"
                    onClick={()=>{setModalOpen(false)}}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 5,
                        color: 'black',
                        fontSize: '18px'
                    }}
                    >
                        <AiOutlineClose />
                    </IconButton>
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
                            <Box className={`${classes.root} bg-[#f4f5fa] p-[10px] m-[10px] rounded-[8px]`}>
                                <Formsy
                                    onValidSubmit={data => handleSubmit(data)}
                                    onValid={() => setIsFormValid(true)}
                                    onInvalid={() => setIsFormValid(false)}
                                    ref={formRef}
                                    className="flex flex-col justify-center w-full"
                                >    
                                    <Grid
                                        className='p-[20px] pb-0'
                                        container>
                                        <Box className='modal_shadow_container w-full'>
                                            <Grid container>
                                            {currentAction.actionParams.map((param, index)=>( 
                                                <>
                                                    {param.paramDataType === "text" && (
                                                        <Grid className="inputContainer" item xs={4} >
                                                            <Typography>{param.paramName}</Typography>
                                                            <FormControl fullWidth >
                                                                <TextFieldFormsy
                                                                    variant="outlined"
                                                                    name={param.paramId}
                                                                    // label={param.paramName}
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
                                                        <Grid className="inputContainer" item xs={4}>
                                                            <Typography>{param.paramName}</Typography>
                                                            <FormControl fullWidth>
                                                                <DatePickerFormsy
                                                                    variant="filled"
                                                                    name={param.paramId}
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
                                                        <Grid  className="inputContainer" item xs={4} key={index}>
                                                            <Typography>{param.paramName}</Typography>
                                                            <FormControl fullWidth>
                                                                <SelectFormsy
                                                                variant="outlined"
                                                                name={param.paramId}
                                                                // label={param.paramName}
                                                                value={
                                                                    param.paramDefaultValues === null || " "
                                                                    ? `NA`
                                                                    : param.paramDefaultValues
                                                                }
                                                                className={classes.root}
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

                                                    {param.paramDataType === "textarea" && (
                                                        <Grid  className="inputContainer" item xs={12} >
                                                            <Typography>{param.paramName}</Typography>
                                                            <FormControl fullWidth>
                                                                <TextFieldFormsy
                                                                    variant="outlined"
                                                                    name={param.paramId}
                                                                    // label={param.paramName}
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

                                                </>
                                            ))}
                                            </Grid>
                                            
                                        </Box>
                                        
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
                                                Close Case
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