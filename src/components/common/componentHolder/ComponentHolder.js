import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ComponentHolder = (props) => {

    const selectedFeature = useSelector(state=>state.features.features.featureCode);
    const features = useSelector(state=>state.features.features.features);
    const feature = features.filter(item=>item.featureCode===selectedFeature)[0];

    const { children, value, index, type,  ...other } = props;

    return(
        <Box
            role="componentHolder"
            id={`componentHolder-${index}`}
            hidden={value !== index}
            className={  type === 'main' && feature && ( 'bg-white pt-2 transform-gpu'+' '+
                    (feature.openTabs.length > 0 ? 'min-h-[100%]' : ' min-h-[100%]')
                )
            }
            {...other}
        >
            {children}
        </Box>
    )
}

export default ComponentHolder;