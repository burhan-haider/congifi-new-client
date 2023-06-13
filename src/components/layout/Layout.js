import React from 'react';
import Header from './header/Header';
import { Box } from '@mui/material';

const Layout = ({ children }) => {

    return (
        <Box sx={{
            minHeight: '100%',
            paddingBottom: 1,
            transition: 'all 1s ease-in-out',
        }}>
            <Header />
            {children}
        </Box>
    );
}

export default Layout;