import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'components/common/CustomTabs';
import TabScrollButton from '@mui/material/TabScrollButton';
import { styled } from '@mui/system';
import getIconByKey from 'assets';
import {
    IconButton,
    Box,
    Badge,
    InputBase,
    ClickAwayListener,
    createTheme,
    ThemeProvider
} from '@mui/material';
import {
    fetchUserFeature,
    setSelectedFeature,
    fetchFeatureModules,
} from 'redux/features/features.actions';
// import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { addToOpenFeatures, setSelectedFeature } from 'redux/routes/routes.actions';
import logo from 'assets/header/conquer-icon.png';
import UserMenuList from './userMenu/UserMenu';
// import commonService from 'services/common/commonService'
import HeaderMenu from './headerMenu/HeaderMenu';


const MyTabScrollButton = styled(TabScrollButton)({
    // display: 'none',
    width: 12,
    marginLeft: 10,
    marginRight: 10,
    root: {
        display: 'none',
        width: 28,
        overflow: 'hidden',
        transition: 'width 5s',
        '&.Mui-disabled': {
            width: 0,
        },
    },
});

const Header = () => {

    const selectedFeature = useSelector(state => state.features.features.featureCode);
    const newFeatures = useSelector(state => state.features.features.userFeatures);
    const user = useSelector(state => state.auth.user);
    const features = useSelector(state => state.features.features.features);

    const [searchOpen, setSearchOpen] = useState(false)
    const [searchString, setSearchString] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserFeature(user))
        if (selectedFeature == null) {
            dispatch(setSelectedFeature('dashboard'))
            dispatch(fetchFeatureModules('dashboard'))
        }

    }, []);




    const handleChange = (event, newValue) => {
        dispatch(setSelectedFeature(newValue));
        if (features.filter(e => e.featureCode === newValue).length < 1) {
            dispatch(fetchFeatureModules(newValue));
        }
    };

    const toggleSearch = () => {
        if (searchOpen === true) {
            setSearchOpen(false);
        }
        else {
            setSearchOpen(true);
        }
    }


    return (
        <Box className={'flex justify-start align-middle px-3 mb-0 pb-0 bg-[#052a4f]'} >
            <div className='flex justify-center items-center' >
                <img
                    src={logo}
                    alt="cognifi-logo"
                    className="h-[30px] w-auto m-0 my-1 mx-2 mr-4 cursor-pointer"
                    onClick={() => window.location.reload()}
                />
            </div>

            {!searchOpen && (
                <Tabs
                    value={selectedFeature}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    ScrollButtonComponent={MyTabScrollButton}
                    className='max-w-[77%] transition-all delay-150 duration-300 ease-in-out mt-[2px] mb-[2px]'
                >
                    {newFeatures.map((item, index) => {
                        let currentFeature = features.filter(feature => feature.featureCode === item.featureCode)[0]
                        console.log("Selected Feature", currentFeature)
                        let breadCrumbsCount = currentFeature !== undefined ? currentFeature.breadCrumbs.length : 0
                        return (
                            <Tab
                                key={item.featureCode ? item.featureCode : item.featureMapping_Id}
                                icon={breadCrumbsCount > 1 ?
                                    <Badge
                                        className='inline-flex'
                                        overlap='rectangular'
                                        anchorOrigin={{ vertical: 'top', horizontal: 'left', }}
                                        variant="dot"
                                        sx={{
                                            '& .MuiBadge-badge': {
                                                bgcolor: '#CCCB2C'
                                            }
                                        }}
                                    >
                                        <img src={getIconByKey(item.icon)} style={{ height: '1.2rem', width: 'auto' }} className="mr-2" alt={item.featureIcon} />
                                    </Badge> :
                                    <Box className='inline-flex'>
                                        <img src={getIconByKey(item.icon)} style={{ height: '1.2rem', width: 'auto' }} className="mr-2" alt={item.featureIcon} />
                                    </Box>
                                }
                                iconPosition="start"
                                value={item.featureCode ? item.featureCode : item.featureMapping_Id}
                                className={`text-white border-solid border-0 text-lg font-gSans ${index !== newFeatures.length - 1 && "border-r-gray-400 border-r-[1px]"} `}
                                label={item.featureName}
                            />
                        )
                    })}

                </Tabs>
            )}

            <div className="flex justify-end align-middle ml-auto" >
                <ClickAwayListener onClickAway={() => setSearchOpen(false)}>
                    <Box className={`mt-3 mb-2 mr-2 ${searchOpen && 'bg-white rounded-full'} flex flex-row justify-start items-center`} >
                        {searchOpen && (
                            <InputBase
                                value={searchString}
                                onChange={(e) => setSearchString(e.target.value)}
                                className="px-3"
                                placeholder='Search Module'
                            />
                        )}
                        <IconButton onClick={() => toggleSearch()} color="primary" className="mb-0 ml-5 py-0 hidden xl:block h-fit" disableRipple>
                            <img src={getIconByKey('searchOne')} alt={'search_icon'} className="h-4 w-auto mb-0 pb-0" />
                        </IconButton>

                    </Box>
                </ClickAwayListener>
                <HeaderMenu />
                <div className='ml-3 flex items-center'>
                    <ul className="p-0 m-0 mt-1 mr-2">
                        <li className="inline-block z-50">
                            <UserMenuList />
                        </li>
                    </ul>
                </div>

            </div>

        </Box>
    );
}

export default Header;