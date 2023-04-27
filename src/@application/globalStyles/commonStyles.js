

const styles = theme => ({
    root: {
      '& .moduleName':{
        width: '100%',
        background: '#EDEEF2',
        padding: '10px',
        color: '#052A4F',
        fontWeight: '700',
        textAlign: 'left',
        fontSize: '14px',
        // marginBottom: '10px'
      },
      '& .MuiAccordion-root': {
        borderRadius: '10px',
        boxShadow: 'none'
      },
      
      "& .MuiOutlinedInput-input": {
        padding: '5px 20px',
      },
      "& .MuiOutlinedInput-root": {
        borderRadius: "70px",
        height: 'auto',
        backgroundColor: '#fff',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .inputContainer > .MuiTypography-root': {
        fontSize: '14px',
        textAlign: 'right',
        minWidth: '110px',
        marginRight: '10px' 
      },
      '& .main_input_container': {
        borderRadius: '0px 0px 10px 10px',
        width: '100%',
        margin:'0px 0px 40px',
        padding: '10px 10px 20px',
        background: '#EDEEF2'
      },
      '& .MuiAccordionDetails-root':{
        padding: '0px',
      },
      '& .MuiAccordionSummary-content > .MuiTypography-root': {
        fontWeight: '700',
        fontSize: '14px',
        textAlign: 'left'
      },
      '& .MuiBox-root button': {
        float: 'right',
      },
      '& .inputContainer': {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '16px',
        // marginTop: '16px'
      },
      '& .MuiAccordionSummary-root': {
        background: '#EDEEF2',
        borderRadius: '10px',
      },
      '& .MuiAccordionSummary-root.Mui-expanded': {
        minHeight: '50px',
        borderRadius: '10px  10px 0px 0px'
      },
      '& .MuiDialog-paper': {
        left: '0',
        right: '0',
        marginX: 'auto',
        top:'12px',
        borderRadius: '8px',
        maxWidth: '83vw'
      },
      '& .MuiDialog-paper > .MuiTypography-root': {
        padding: '10px',
        fontWeight: '700',
        fontSize: '16px',
      },
      '& .MuiDialog-paper .MuiTypography-root':{
        minWidth: '90px'
      },
      '& .modal_shadow_container': {
        boxShadow: '1px 1px 7px 3px rgb(179, 179, 179)',
        background: 'none',
        paddingRight: '40px',
        paddingBottom: '20px',
        borderRadius: '24px',
        marginBottom: '40px'
      }
    },
    formControl: {
      fullWidth: true,
    },
  });

  export default styles;