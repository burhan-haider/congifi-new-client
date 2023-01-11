import React, { useEffect, useState } from 'react';
import Header from './header/Header';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {

    // const [hideHeader, setHideHeader] = useState(false);

    return (
        <Box sx={{
            minHeight: '100%',
            paddingBottom: 1,
            transition: 'all 0.1s ease-in-out',
        }}>
            <Header />
            {children}
        </Box>
    );
}

export default Layout;