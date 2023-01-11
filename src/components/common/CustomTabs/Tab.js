import Tab from '@mui/material/Tab';
import {styled} from '@mui/material/styles';

const CustomTabComponent = styled(props=><Tab disableRipple {...props} />)(({theme})=>({
    color: '#000',
    fontSize: '14px',
    backgroundColor: 'inherit',
    minHeight: '2.25rem',
    textTransform: 'none',
    paddingTop: '0.1rem',
    paddingBottom: '0.1rem',
    lineHeight: '0.825rem',
    '&.Mui-selected': {
        backgroundColor: '#617990 !important',
        color: '#ffffff',
    },
    transition: 'all 0.1s ease-in-out',
}));

export default CustomTabComponent;