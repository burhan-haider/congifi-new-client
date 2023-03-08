import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
    Box,
    IconButton,
    Typography,
    Grid,
    Button,
    MenuList,
    MenuItem,
    ListItemText,
    ListItemIcon,
    InputBase,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import {
    BsArrowDownLeftCircle,
    BsReplyAll,
    BsReply,
    BsReplyAllFill,
    BsReplyFill,
    BsForward,
    BsForwardFill,
    BsFolder,
    BsFolderFill,
    BsTrash,
    BsTrashFill,
    BsInbox,
    BsInboxFill,
    BsFileText,
    BsFileTextFill,
    BsPencil,
    BsPaperclip,
    BsFileEarmarkPdf,
    BsFillArrowRightCircleFill,
    BsChevronDown,
    BsChevronUp,
} from 'react-icons/bs'

import { BiCircle, BiSearch } from 'react-icons/bi'

import { IoMdHeart, IoMdHeartEmpty, IoMdClose } from 'react-icons/io'

import { IoPaperPlane, IoPaperPlaneOutline } from 'react-icons/io5'

import JoditEditor from 'jodit-react'
import { FaTimes } from 'react-icons/fa'

import { GenericAlert } from '@application'

import { useSelector } from 'react-redux'
import { actionMapping } from 'components/common/modules/actionregistry/ActionMapping'

const menuOptions = [
    {
        id: '1',
        name: 'Inbox',
        icon: <BsInbox size={24} />,
        iconAlt: <BsInboxFill size={24} color="#052a4f" />,
    },
    {
        id: '2',
        name: 'Liked',
        icon: <IoMdHeartEmpty size={24} />,
        iconAlt: <IoMdHeart size={24} color="#052a4f" />,
    },
    {
        id: '3',
        name: 'Draft',
        icon: <BsFileText size={24} />,
        iconAlt: <BsFileTextFill size={24} color="#052a4f" />,
    },
    {
        id: '4',
        name: 'Sent',
        icon: <IoPaperPlaneOutline size={24} />,
        iconAlt: <IoPaperPlane size={24} color="#052a4f" />,
    },
    {
        id: '5',
        name: 'Trash',
        icon: <BsTrash size={24} />,
        iconAlt: <BsTrashFill size={24} color="#052a4f" />,
    },
]

const mailTemplates = [
    {
        id: '1',
        title: 'Template 1',
        content: "<p>Hey [name]!</p><p>Welcome to [brand name]. We are happy to have you join our community</p><p>[Brand name] goal is to create [add goal and/or mission of your brand].</p><p>We promise to only send you emails [add how many times per week you will be sending an email].All our emails will offer valuable information to help you along your journey and we may occasionally recommend a product that we believe in.</p><p>We hope you enjoy your time with us and, in the meantime, feel free to check our [educational resources of your brand]</p><p>Yours,</p><p>[Brand name]</p>"
    },
    {
        id: '2',
        title: 'Template 2',
        content: "<p>Hey [name],</p><p>Thank you for signing up to my weekly newsletter.</p> <p>Before we get started, you'll have to confirm your email address.</p><p>Click on the button below to verify your email address and you're officially one of us!</p><p>[CTA button]</p>"
    },
]

const labelOptions = [
    {
        id: '1',
        name: 'Work',
        color: '#525ce1',
    },
    {
        id: '2',
        name: 'Clients',
        color: '#009eff',
    },
    {
        id: '3',
        name: 'Personal',
        color: '#e14066',
    },
]



const dummyMails = [
    {
        id: '1',
        toName: 'Sarah Townseed',
        subject: 'MoodBoard Update',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dolor augue, mattis ut ligula id, porttitor pretium velit. In in ornare felis, sed interdum mi. Phasellus rutrum augue gravida nisl malesuada iaculis. Aenean auctor est quis nisl consequat condimentum. Pellentesque eget posuere mi. Duis luctus est ac ligula aliquam, sit amet tristique mauris egestas. Nulla laoreet arcu nec venenatis accumsan. Sed vehicula urna sed sollicitudin condimentum. Fusce et magna posuere, egestas justo in, tristique lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse nec rhoncus felis, sed interdum felis. Praesent gravida maximus massa vel accumsan.',
        label: 'Work',
        color: '#525ce1',
    },
    {
        id: '2',
        toName: 'Sarah Townseed',
        subject: 'MoodBoard Update',
        body: 'Lorem Ipsum Dolor Sit Amet Consectur Alpin Dolor Sit Conscetore Amit Lorem Dem Ipsum!',
        label: 'Personal',
        color: '#e14066',
        attachments: [
            {
                id: '1',
                name: 'AuditFile.pdf',
                filePath: '',
            },
            {
                id: '2',
                name: 'AutoPDF.pdf',
                filePath: '',
            },
            {
                id: '3',
                name: 'AutoPDF.pdf',
                filePath: '',
            },
        ],
    },
    {
        id: '3',
        toName: 'Sarah Townseed',
        subject: 'MoodBoard Update',
        body: 'Lorem Ipsum Dolor Sit Amet Consectur Alpin Dolor Sit Conscetore Amit Lorem Dem Ipsum!',
        label: 'Work',
        color: '#525ce1',
    },
    {
        id: '4',
        toName: 'Sarah Townseed',
        subject: 'MoodBoard Update',
        body: 'Lorem Ipsum Dolor Sit Amet Consectur Alpin Dolor Sit Conscetore Amit Lorem Dem Ipsum!',
        label: 'Clients',
        color: '#009eff',
    },
    {
        id: '5',
        toName: 'Sarah Townseed',
        subject: 'MoodBoard Update',
        body: 'Lorem Ipsum Dolor Sit Amet Consectur Alpin Dolor Sit Conscetore Amit Lorem Dem Ipsum!',
        label: 'Personal',
        color: '#e14066',
    },
    {
        id: '6',
        toName: 'Sarah Townseed',
        subject: 'MoodBoard Update',
        body: 'Lorem Ipsum Dolor Sit Amet Consectur Alpin Dolor Sit Conscetore Amit Lorem Dem Ipsum!',
        label: 'Clients',
        color: '#009eff',
    },
]

const EmailContainer = ({ handleModalClose, handleModalOpen, handleSubmit, caseNo }) => {
    const placeholder = 'Start Typing...'

    const editor = useRef(null)

    const userEmail = useSelector(state=>state.auth.user.data.email) || 'burhanhp5158@gmail.com'

    const [content, setContent] = useState('')
    const [subjectValue, setSubjectValue] = useState('')
    const [to, setTo] = useState('')
    const [cc, setCc] = useState('')
    const [bcc, setBcc] = useState('')
    const [ccActive, setCcActive] = useState(false)
    const [hovered, setHovered] = useState(null)
    const [composing, setComposing] = useState(false)
    const [expandedMail, setExpandedMail] = useState(null)
    const [alertOpen, setAlertOpen] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [selectedList, setSelectedList] = useState(0)
    const [hoveredLogo, setHoveredLogo] = useState('')
    const [snackbarType, setSnackbarType] = useState('success')
    const [snackbarMessage, setSnackbarMessage] = useState('Mail Sent Successfully!')
    const [tempModalOpen, setTempModalOpen] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [sending, setSending] = useState(false)

    const handleAlertOpen = () => {
        setAlertOpen(true)
    }
    const handleAlertClose = () => {
        setAlertOpen(false)
    }
    const handleAlertAccept = () => {
        setComposing(false)
        setAlertOpen(false)
    }
    const handleAlertDismiss = () => {
        setContent('')
        setComposing(false)
        setAlertOpen(false)
    }

    const handleTempModalOpen = () => {
        setTempModalOpen(true)
    }

    const handleTempModalClose = () => {
        setTempModalOpen(false)
    }

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: placeholder || 'Start Typing...',
            height: 300,
            showCharsCounter: false,
            showWordsCounter: false,
            showXPathInStatusbar: false,
            allowResizeX: false,
            allowResizeY: false,
            toolbarAdaptive: false,
            buttons: [
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'ul',
                'ol',
                'superscript',
                'subscript',
                'spellcheck',
                'selectall',
                'link' 
            ],
        }),
        [placeholder]
    )

    const handleCompose = () => {
        if (composing === false) {
            setComposing(true)
            return
        }
        if (composing === true) {
            if (content !== '') {
                handleAlertOpen()
                return
            }
            setComposing(false)
            return
        }
    }

    const handleSend = () => {

        setSending(true);

        const formData = new FormData();

        formData.append('to', to)
        formData.append('cc', cc)
        formData.append('bcc', bcc)
        formData.append('subject', subjectValue)
        formData.append('content', content)
        attachments.forEach(attachment=>{
            formData.append('files', attachment)
        })
        formData.append('caseNo', caseNo)

        actionMapping['sendEmailByLEVEL2'](formData)
        .then(res=>{
            console.log("Email Response:-",res);  
            setSnackbarMessage('Mail Sent Successfully!')
            setSnackbarType('success')
            setComposing(false)
            setSnackbarOpen(true)
            setSending(false)
            setContent('')
            setCc('')
            setBcc('')
            setTo('')
            setAttachments([]);
            setSubjectValue('');
        })
        .catch(error=>{
            console.error("Email Error",error)
            setSnackbarMessage('Something Went Wrong!')
            setSnackbarType('error')
            setSnackbarOpen(true)
            setSending(false)
        })

        
    }

    const handleMailClick = (mail) => {
        if (expandedMail === null) {
            setExpandedMail(mail)
        }
    }

    const handleSelectTemplate = (content, subject) => {
        setSubjectValue(subject)
        setContent(content)
        handleTempModalClose()
    }

    const handleFileChange = (e) => {

        let files = e.target.files
        console.log("files", files)
        let tempFileArray = [];

        Array.from(files).forEach(file => {
            tempFileArray.push(file);
        })
        setAttachments([...attachments, ...tempFileArray]);
    }

    useEffect(() => {
        console.log("Email Attachements", attachments)
    }, [attachments]);

    return (
        <Box className=" bg-[#f5f6fa] overflow-hidden max-h-[89vh]">
            <Grid container className="transition-all duration-300" wrap="wrap">
                {/* Grid One */}

                <Grid item xs={2} className="w-[100%] bg-[#fff] py-5 px-5">
                    <Button
                        variant="contained"
                        className="px-5 py-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white text-lg rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f] mb-8"
                        onClick={() => handleCompose()}
                    >
                        {composing ? (
                            <>
                                <IoMdClose size={18} className="mr-2" />
                                Close
                            </>
                        ) : (
                            <>
                                <BsPencil size={18} className="mr-2" />
                                Compose
                            </>
                        )}
                    </Button>
                    <MenuList className="mb-12">
                        {menuOptions.map((option, index) => (
                            <MenuItem
                                className="mb-6"
                                onMouseEnter={() => {
                                    setHovered(index)
                                }}
                                onMouseLeave={() => {
                                    setHovered(null)
                                }}
                                onClick={() => {
                                    setSelectedList(index)
                                }}
                                key={index}
                                sx={{
                                    bgcolor:
                                        selectedList === index
                                            ? '#f5f5f5'
                                            : 'transparent',
                                }}
                            >
                                <ListItemIcon className="mr-4">
                                    {hovered === index || selectedList === index
                                        ? option.iconAlt
                                        : option.icon}
                                </ListItemIcon>
                                <ListItemText>{option.name}</ListItemText>
                            </MenuItem>
                        ))}
                    </MenuList>
                    <Typography variant="h6" className="font-bold mb-4">
                        Labels
                    </Typography>
                    <MenuList className="mb-6">
                        {labelOptions.map((option, index) => (
                            <MenuItem className="mb-3" key={index}>
                                <ListItemIcon className="mr-4">
                                    <BiCircle size={24} color={option.color} />
                                </ListItemIcon>
                                <ListItemText>{option.name}</ListItemText>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Grid>

                {/* Grid Two */}

                <Grid
                    item
                    xs={composing ? 4 : 10}
                    className="w-[100%] bg-[#f5f6fa] py-5 px-5 transition-all duration-300"
                >
                    <Box className="flex flex-row justify-between items-center mb-10">
                        <Box className="bg-[#e0e1e7] p-2 rounded-lg flex flex-row justify-between items-center w-[100%]">
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search mails' }}
                            />
                            <IconButton>
                                <BiSearch size={24} />
                            </IconButton>
                        </Box>
                        {!composing && (
                            <IconButton
                                onClick={() => handleModalClose()}
                                className="ml-8"
                            >
                                <BsArrowDownLeftCircle color="black" />
                            </IconButton>
                        )}
                    </Box>

                    <MenuList className="max-h-[70vh] overflow-auto px-2">
                        {dummyMails.map((mail, index) => (
                            <MenuItem
                                onClick={() => handleMailClick(mail)}
                                className="bg-white hover:bg-[#ddd] p-0 py-2 mb-4 flex flex-col justify-center items-start"
                                key={index}
                            >
                                {/* <Box> */}
                                <Box
                                    className="pl-10 pr-3 py-3 mt-3 mb-3 flex flex-row justify-between items-center"
                                    sx={{
                                        borderLeftColor: mail.color,
                                        borderLeftStyle: 'solid',
                                        borderLeftWidth: 5,
                                        width: composing ? '80%' : '90%',
                                    }}
                                >
                                    <Box className="flex flex-row justify-start items-center">
                                        <Typography className="text-xl font-bold">
                                            {mail.toName}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography className="text-sm">
                                            few minutes ago
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className="pl-11 w-[80%] pr-5 py-2 pb-3">
                                    <Typography className="mb-5">
                                        {mail.subject}
                                    </Typography>
                                    <Typography className="truncate text-sm">
                                        {mail.body}
                                    </Typography>
                                </Box>
                                {mail.attachments && mail.attachments.length && (
                                    <Box className="flex flex-row justify-start items-center px-10 my-2">
                                        <BsPaperclip size={24} />
                                        <Box className="flex flex-row justify-start items-center ml-5 mr-4 border-[0.5px] border-solid border-slate-400">
                                            <Box className="border-r-[0.5px] border-solid border-slate-400 border-l-0 border-t-0 border-b-0 px-2 align-center pt-2">
                                                <BsFileEarmarkPdf size={18} />
                                            </Box>

                                            <Typography className="font-bold ml-2 mr-2 text-sm">
                                                {mail.attachments[0].name},
                                            </Typography>
                                        </Box>

                                        <Typography className="font-bold">
                                            +{mail.attachments.length - 1}
                                        </Typography>
                                    </Box>
                                )}

                                {/* </Box> */}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Grid>

                {/* Grid Three */}

                {composing && (
                    <Grid
                        item
                        xs={6}
                        className="bg-[#fff] py-5 px-5 transition-all"
                    >
                        <Box className="flex flex-row justify-between items-center w-[100%] mb-14 ">
                            <Box className="flex flex-row justify-start items-center">
                                <IconButton
                                    className="mr-2"
                                    onMouseEnter={() => setHoveredLogo('heart')}
                                    onMouseLeave={() => setHoveredLogo('')}
                                >
                                    {hoveredLogo === 'heart' ? (
                                        <IoMdHeart size={30} />
                                    ) : (
                                        <IoMdHeartEmpty size={30} />
                                    )}
                                </IconButton>
                                <IconButton
                                    className="mr-2"
                                    onMouseEnter={() => setHoveredLogo('reply')}
                                    onMouseLeave={() => setHoveredLogo('')}
                                >
                                    {hoveredLogo === 'reply' ? (
                                        <BsReplyFill size={30} />
                                    ) : (
                                        <BsReply size={30} />
                                    )}
                                </IconButton>
                                <IconButton
                                    className="mr-2"
                                    onMouseEnter={() =>
                                        setHoveredLogo('replyall')
                                    }
                                    onMouseLeave={() => setHoveredLogo('')}
                                >
                                    {hoveredLogo === 'replyall' ? (
                                        <BsReplyAllFill size={30} />
                                    ) : (
                                        <BsReplyAll size={30} />
                                    )}
                                </IconButton>
                                <IconButton
                                    className="mr-2"
                                    onMouseEnter={() => setHoveredLogo('fwd')}
                                    onMouseLeave={() => setHoveredLogo('')}
                                >
                                    {hoveredLogo === 'fwd' ? (
                                        <BsForwardFill size={30} />
                                    ) : (
                                        <BsForward size={30} />
                                    )}
                                </IconButton>
                                <IconButton
                                    className="mr-2"
                                    onMouseEnter={() =>
                                        setHoveredLogo('folder')
                                    }
                                    onClick={()=>handleTempModalOpen()}
                                    onMouseLeave={() => setHoveredLogo('')}
                                >
                                    {hoveredLogo === 'folder' ? (
                                        <BsFolderFill size={30} />
                                    ) : (
                                        <BsFolder size={30} />
                                    )}
                                </IconButton>
                                <IconButton
                                    className="mr-2"
                                    onMouseEnter={() => setHoveredLogo('trash')}
                                    onMouseLeave={() => setHoveredLogo('')}
                                >
                                    {hoveredLogo === 'trash' ? (
                                        <BsTrashFill size={30} />
                                    ) : (
                                        <BsTrash size={30} />
                                    )}
                                </IconButton>
                            </Box>
                            <IconButton onClick={() => handleModalClose()}>
                                <BsArrowDownLeftCircle color="black" />
                            </IconButton>
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight={'bold'}>
                                Compose mail
                            </Typography>
                        </Box>
                        <Box className="mt-8">
                            <Box className="bg-[#f5f6fa] p-2 rounded-t-lg flex flex-row justify-between items-center border-solid border-[0.5px] border-gray-300 border-b-0">
                                <Typography className="font-bold mr-3 ml-1">
                                    To:
                                </Typography>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="example@email.com...."
                                    value={to}
                                    onChange={(e)=>setTo(e.target.value)}
                                />
                                <Button 
                                    variant="text" 
                                    className='text-inherit' 
                                    onClick={()=>setCcActive(!ccActive)} 
                                >
                                    Cc 
                                    {ccActive?(
                                        <BsChevronUp size={12} />
                                    ):(
                                        <BsChevronDown size={12} />
                                    )}
                                </Button>
                            </Box>
                            <Box className={`bg-[#f5f6fa] p-2 flex flex-row justify-between items-center  border-solid border-[0.5px] border-gray-300 border-b-0 ${ccActive===false&&'hidden'}`}>
                                <Typography className="font-bold mr-3 ml-1">
                                    Cc:
                                </Typography>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="example@email.com...."
                                    value={cc}
                                    onChange={(e)=>setCc(e.target.value)}
                                />
                            </Box>
                            <Box className={`bg-[#f5f6fa] p-2 flex flex-row justify-between items-center  border-solid border-[0.5px] border-gray-300 border-b-0 ${ccActive===false&&'hidden'}`}>
                                <Typography className="font-bold mr-3 ml-1">
                                    Bcc:
                                </Typography>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="example@email.com...."
                                    value={bcc}
                                    onChange={(e)=>setBcc(e.target.value)}
                                />
                            </Box>
                            <Box className="bg-[#f5f6fa] p-2 flex flex-row justify-between items-center  border-solid border-[0.5px] border-gray-300 border-b-0">
                                <Typography className="font-bold mr-3 ml-1">
                                    Subject:
                                </Typography>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Subject of the mail...."
                                    value={subjectValue}
                                    onChange={(e)=>setSubjectValue(e.target.value)}
                                />
                            </Box>

                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={(newContent) => {}}
                            />
                            <Box className={`max-h-[80px] overflow-auto border-solid border-[0.5px] border-gray-300 border-b-0 border-t-0 py-2 px-4 ${attachments.length<1&&'hidden'}`} >
                                {attachments.map((file, index)=>(
                                    <Box className="flex flex-row justify-between items-center min-w-[180px] mr-5 bg-gray-200 pl-2 mb-2" >
                                        <Typography className="text-ellipsis truncate"  >
                                            {file.name}
                                        </Typography>
                                        <IconButton className="ml-2" onClick={()=>{
                                            setAttachments(attachments.filter((e, eIndex)=>eIndex !== index))
                                        }} >    
                                            <FaTimes className="text-sm" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>

                            <Box className="bg-[#f5f6fa] p-2 flex flex-row justify-between items-center mb-3 border-solid border-[0.5px] border-gray-300 py-4 rounded-b-lg">
                                <label
                                    className="flex flex-row justify-center items-center px-3 py-1 font-bold mr-3 ml-1 text-[#052a4f] border border-solid border-[#052a4f] hover:bg-gray-200"
                                    htmlFor='email-attach'
                                >
                                    <BsPaperclip size={24} />
                                    Attach
                                </label>
                                <input 
                                    type="file" 
                                    id='email-attach'
                                    name='email-attach'
                                    className='hidden'
                                    multiple
                                    value={''}
                                    onChange={(e)=>handleFileChange(e)}
                                />
                                
                                <LoadingButton
                                    variant="contained"
                                    loadingPosition='start'
                                    startIcon={ <BsFillArrowRightCircleFill size={26} className="ml-1" /> }
                                    className="bg-[#052a4f] text-white normal-case py-2 px-0 pl-2 pr-3 rounded-full text-lg"
                                    onClick={() => handleSend()}
                                    loading={sending}
                                >
                                    Send Mail
                                </LoadingButton>
                            </Box>
                        </Box>
                    </Grid>
                )}
            </Grid>
            <Dialog
                open={alertOpen}
                onClose={handleAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogTitle id="alert-dialog-title">
                    {'Save To Draft?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You have Unsaved Changes in your editor. Would you like
                        to save them to draft?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="pb-5 pr-5">
                    <Button
                        variant="contained"
                        className="bg-green-600 text-white hover:bg-green-800"
                        onClick={handleAlertAccept}
                        autoFocus
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        className="bg-red-600 text-white hover:bg-red-800"
                        onClick={handleAlertDismiss}
                    >
                        Don't Save
                    </Button>
                    <Button
                        variant="contained"
                        className="bg-app-dark text-white hover:bg-[#000]"
                        onClick={handleAlertClose}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <GenericAlert
                message={snackbarMessage}
                type={snackbarType}
                snackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
            />

            <Dialog
                open={tempModalOpen}
                onClose={handleTempModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    className: 'max-w-[40vw] w-[100%]'
                }}
            >
                <DialogTitle className="font-bold" id="alert-dialog-title">
                    {'Pick a Template'}
                    <IconButton
                        aria-label="close"
                        onClick={handleTempModalClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <FaTimes />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <MenuList className="max-h-[70vh] overflow-auto px-2">
                        {mailTemplates.map(template=>(
                            <MenuItem
                                onClick={() => handleSelectTemplate(template.content, template.title)}
                                className="bg-white hover:bg-[#ddd] p-5 py-2 mb-4 flex flex-col justify-center items-start max-w-[50vw] truncate border-[#ddd]"
                                key={template.id}
                            >
                                <Typography className="font-bold text-lg mb-3" >
                                    {template.title}
                                </Typography>
                                <Typography>
                                    {template.content.replaceAll("<p>", "").replaceAll("</p>","")}
                                </Typography>
                                
                            </MenuItem>
                        ))}
                    </MenuList>
                </DialogContent>
            </Dialog>

        </Box>
    )
}

export default EmailContainer
