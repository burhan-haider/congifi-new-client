

const styles = theme => ({
    root: {
      width: "100%",
      "& .MuiOutlinedInput-input": {
        padding: '5px 20px',
      },
      '& MuiTypography-body1': {
        fontSize: '12px',
        align: 'right',
        minWidth: '100px',
        marginRight: '10px' 
      }
    },
    formControl: {
      margin: '10px',
      fullWidth: true,
      display: "flex",
      wrap: "nowrap",

    },
    typoGraphy: {
        
    }
  });

  export default styles;