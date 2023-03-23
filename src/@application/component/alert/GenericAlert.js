import {
    Alert,
    AlertTitle,
    Slide, 
    Snackbar,
    Typography
} from '@mui/material'

const SlideTransition = (props) => {
    return <Slide {...props} direction="down" />
}

const defaultMessage = {
    success: "Successful!",
    info: "Something Happened!",
    warning: "Partially Successful!",
    error: "Something Went Wrong!",
}

const alertTitles = {
    success: "Success",
    info: "Info",
    warning: "Warning",
    error: "Error",
}

const GenericAlert = (props) => {

    const {
        title,
        message,
        type,
        snackbarOpen=false,
        setSnackbarOpen,
    } = props;

    const snackbarType = type || 'success'
    const snackbarMessage = message || defaultMessage[snackbarType]
    const alertTitle = title || alertTitles[snackbarType]

    return(
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={()=>setSnackbarOpen(false)}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={()=>setSnackbarOpen(false)}
                severity={snackbarType}
                sx={{ width: '100%', maxWidth: '400px' }}
            >
                <AlertTitle className="text-left font-bold text-lg font-gSans" >{alertTitle}</AlertTitle>
                <Typography className="text-left text-base font-gSans" >{snackbarMessage}</Typography>
            </Alert>
        </Snackbar>
    )
}

export default GenericAlert;