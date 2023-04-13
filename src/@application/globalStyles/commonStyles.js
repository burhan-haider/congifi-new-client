

const styles = theme => ({
    root: {
      
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
      '& .MuiAccordionDetails-root':{
        padding: '10px'
      },
      '& .MuiCollapse-root': {
        background: '#f4f5fa'
      },
      '& .MuiAccordionSummary-content > .MuiTypography-root': {
        fontWeight: '700',
        fontSize: '14px',
        textAlign: 'left'
      },
      '& .MuiBox-root': {
        background: '#fff'
      },
      '& .MuiBox-root button': {
        float: 'right'
      },
      '& .inputContainer': {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '16px',
        paddingTop: '16px'
      },
      '& .MuiAccordionSummary-root': {
        boxShadow: ''
      },
      '& .MuiAccordionSummary-root.Mui-expanded': {
        minHeight: '50px'
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
        background: '#f4f5fa',
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