import React, { useEffect } from 'react';
import { Tabs, Tab } from 'components/common/CustomTabs';
import TabScrollButton from '@mui/material/TabScrollButton';
import { styled } from '@mui/system';
import getIconByKey from 'assets';
import {  
    IconButton, 
    Box,  
    Badge,
    Typography
} from '@mui/material';
import { 
    fetchUserFeature,
    setSelectedFeature,
    fetchFeatureModules,
    addToOpenTabs
} from 'redux/features/features.actions';
// import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { addToOpenFeatures, setSelectedFeature } from 'redux/routes/routes.actions';
import logo from 'assets/header/cognifi-logo.png';
import headerBar from 'assets/header/header-bar.png'
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
    // const modules = useSelector(state => state.routes.modules);
    // const currentFeatures = useSelector(state => state.routes.newFeatures.userFeatures);
    const newFeatures = useSelector(state => state.features.features.userFeatures);
    // const openFeatures = useSelector(state => state.routes.newFeatures.features);
    const user = useSelector(state => state.auth.user);
    // const [newFeatures, setNewFeatures] = useState(currentFeatures);
    const features = useSelector(state=>state.features.features.features);

    // const isLoading = useSelector(state=>state.features.features.isLoading);
    // const newStructure = useSelector(state=> state)
    // console.log('state is: ', state)

    // state.map(newbie => {
    //     console.log('newbie:', newbie)
    // })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserFeature(user))
        if(selectedFeature==null){
            dispatch(setSelectedFeature('dashboard'))
            dispatch(fetchFeatureModules('dashboard'))
        }
        // console.log('New Features in Header:', newFeatures)
        // setNewFeatures(currentFeatures)

        // dispatch(addToOpenTabs)
        // const newStructure = 
        
    },[]);




    const handleChange = (event, newValue) => {
        dispatch(setSelectedFeature(newValue));
        if(features.filter(e=>e.featureCode===newValue).length<1){
            dispatch(fetchFeatureModules(newValue));
        }
    };

    



    return (
        <Box className={'flex justify-start align-middle px-3 mb-0 pb-0 bg-[#052a4f]'} >
            <div className='flex justify-start' >
                <img 
                    src={logo} 
                    alt="cognifi-logo" 
                    className="h-8 w-8 m-0 mt-[8px] mx-2 cursor-pointer" 
                    onClick={()=>window.location.reload()}
                />
                {/* <img src={headerBar} alt="header-bar" className="h-9 w-auto m-0 mt-[6px]" /> */}
            </div>
            <Tabs
                value={selectedFeature}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                ScrollButtonComponent={MyTabScrollButton}
            >
                {/* <Tab icon={<MdHome size={24} />} component={Link} value="/" to={'/'} iconPosition="start"  label="Item One" />
                <Tab icon={<MdSettings size={24} />} component={Link} value="/page-one" to={'/page-one'} iconPosition="start"   label="Item Two" />
                <Tab icon={<MdLocationOn size={24} />} component={Link} value="/page-two" to={'/page-two'} iconPosition="start"  label="Item Three" /> */}
                {newFeatures.map((item, index)=>{
                    let currentFeature = features.filter(feature => feature.featureCode === item.featureCode)[0]
                    console.log("Selected Feature", currentFeature)
                    let breadCrumbsCount = currentFeature !== undefined ? currentFeature.breadCrumbs.length : 0
                    return (
                        // console.log('main item is: ', item)
                                <Tab 
                                    key={item.featureCode?item.featureCode:item.featureMapping_Id} 
                                    icon={breadCrumbsCount>1 ? 
                                    <Badge className='inline-flex' overlap='rectangular'  anchorOrigin={{vertical: 'top',horizontal: 'left',}} variant="dot" color="error">
                                        <img src={getIconByKey(item.icon)} style={{height: '1.2rem', width: 'auto'}} className="mr-2" alt={item.featureIcon}/>
                                    </Badge> : 
                                    <Box className='inline-flex'>
                                        <img src={getIconByKey(item.icon)} style={{height: '1.2rem', width: 'auto'}} className="mr-2" alt={item.featureIcon}/>
                                    </Box>
                                    } 
                                    iconPosition="start" 
                                    value={item.featureCode?item.featureCode:item.featureMapping_Id}
                                    className={`text-white border-solid border-0 text-lg font-gSans ${index !== newFeatures.length-1&&"border-r-gray-400 border-r-[1px]"} `}
                                    label={item.featureName}
                                />                        
                            )
                        })}
                

                {/* <Tab label="Item Four" /> */}
                
            </Tabs>
            <div className="flex justify-end align-middle ml-auto" >
                
                {/* <img src={headerBar} alt="header-bar" className="h-9 w-auto m-0 mt-[6px]" /> */}

                <IconButton onClick={()=>{}} color="primary" className="mb-0 ml-5 hidden xl:block h-fit pt-3" >
                    <img src={getIconByKey('searchOne')} alt={'search_icon'} className="h-4 w-auto mb-0 pb-0" />
                </IconButton>

                <HeaderMenu   />

                <div className='ml-3'>
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