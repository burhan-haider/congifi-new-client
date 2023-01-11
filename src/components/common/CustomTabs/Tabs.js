import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';

const CustomTabs = styled(Tabs)({
    background: '#052a4f',
    color: '#fff',
    height: '3rem',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: '0.25rem',
    paddingRight: '0.25rem',
    alignItems: 'center',
    '& .MuiTabs-indicator': {
        background: 'transparent',
    },
    transition: 'all 0.s ease-in-out',
})

export default CustomTabs;