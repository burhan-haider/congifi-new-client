/* eslint-disable no-loop-func */
import { useEffect, useState } from 'react'
import {
    Box,
    Breadcrumbs,
    Chip,
    Menu,
    MenuItem,
    // Button,
    IconButton,
    Grid, 
    Link,
    CircularProgress,
    Card,
    Typography,
    Tooltip,
    ClickAwayListener,
    Divider
} from '@mui/material';
import { MdRefresh, MdOutlineClose } from 'react-icons/md'
import { IoMdRefreshCircle } from 'react-icons/io'
import ComponentHolder from 'components/common/componentHolder/ComponentHolder';
import ModuleHolder from 'components/common/ModuleHolder';
import {useDispatch, useSelector} from 'react-redux';
import { useClasses } from '@application'
import { 
    setSelectedModule, 
    addToBreadcrumbs, 
    removeFromBreadcrumbs, 
    addToOpenTabs, 
    removeFromOpenTabs,
    putMapClickedDataInFeatures,
    fetchModuleDetails,
    addToPinnedModules,
    removeFromPinnedModules,
    openPinnedModule,
} from 'redux/features/features.actions';
import featureService from 'services/features/featureService'
import getIconByKey from 'assets';
import ModuleChartFrame from 'components/common/modules/mainModuleSearchFrame/ModuleChartFrame'
import { Sticky, StickyContainer } from 'react-sticky';
import buttonIconMapping from 'assets/buttonIconMapping';
import { motion } from "framer-motion";

// import { handleBreakpoints } from '@mui/system';

const styles = theme => ({
    chipRoot: {
        "& .MuiChip-icon": {
            display: 'none',
        },
        "& .MuiChip-deleteIcon": {
            display: 'none',
        },
        "&:hover":{
            "& .MuiChip-icon": {
                display: 'block',
                order: 1, // the label has a default order of 0, so this icon goes after the label
                marginRight: "5px", // add some space between icon and delete icon
                marginLeft: '-2px',
                cursor: "pointer"
              },
              "& .MuiChip-deleteIcon": {
                display: 'block',
                order: 2 // since this is greater than an order of 1, it goes after the icon
              }
        },
        
      },
    //   inactiveChip: {
    //     "& .MuiChip-deleteIcon": {
    //         display: 'none',
    //     },
    //     "&:hover":{
    //         "& .MuiChip-deleteIcon": {
    //             display: 'block',
    //         }
    //     }
    //   }
})

const pinnedUl = ({
  root: {
    '& .MuiList-padding': {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }
})

const FeatureHolder = ({feature}) => {

  const [bookMark, toggleBookMark] = useState(null);
//   const [trail, setTrail] = useState(feature.breadCrumbs);
  const [modules, setModules] = useState(null);
  const [isModuleLoading, setIsModuleLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);

  const classes = useClasses(pinnedUl);

  const dispatch =  useDispatch();
  const selectedFeature = useSelector(state => state.features.features.featureCode);
  //   const selectedNewFeature = useSelector(state=> state.features.features.featureCode)
  const isLoading = useSelector(state=>state.features.features.isLoading)

  const pinnedModules = useSelector(state => state.features.features.pinnedModules)
  // const features = useSelector(state => state.features.features);

  const open = Boolean(bookMark);
  const pinnedModule = pinnedModules.map((item)=> item.moduleName)
  // console.log('pinnedModule', pinnedModule[pinnedModule.length - 1])
  const handleBookmark = (event) => {
      toggleBookMark(event.currentTarget);
  }
  const handleBookmarkClose = () => {
      toggleBookMark(null);
  }

  useEffect(()=>{
    //   console.log("Feature:", feature)
      if(feature.featureCode === selectedFeature){
            setModules(feature.modules);
      }
      if(feature.showModule === selectedFeature){
        feature.breadCrumbs.map(crumb=>{
            if(crumb.id!==feature.featureCode){
                dispatch(removeFromBreadcrumbs(feature.featureCode, crumb))
                 return null
            }
            return null
        })
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedFeature,feature])  

  var url = selectedFeature
    ? `/api/features/${selectedFeature}`
    : null;

  let trail = feature.breadCrumbs;

  const makeApiCallUrl = (uniqueNo, moduleCode, parentModule_Id) => {
    let mainUrl = "";

    return new Promise((resolve, reject) => {
      if (trail && trail.filter(mod => mod.id === uniqueNo).length === 0) {

        console.log("If was executed!");
        
        let newStructure = [];

        trail.map(mod => {
            if(mod.code !== feature.featureCode){
                newStructure.push(mod.code);
                return mod;
            }
            return mod;
        })

        if(parentModule_Id !== null){
            if(newStructure.filter(e=>e===parentModule_Id).length === 0){
                newStructure.push(parentModule_Id);
            }
        }
        newStructure.push(moduleCode);

        console.log("Trail:-", trail)
        console.log("newStructure:-", newStructure)

        const finalUrl = url + newStructure.map(x => `~~~${x}`);
        mainUrl = finalUrl.replace(",", "");
        mainUrl = mainUrl.replaceAll(",", "");
        // makes url for first jump / not chart click
        //============================================================
      } else {
        const trailIndex = trail.findIndex(x => x.code === moduleCode);

        console.log("Else was Executed!");

        if (trail.slice(1, trailIndex).length > 0) {
          const finalUrl = `~~~${trail.slice(1, trailIndex)[0].code}`;
          mainUrl = `${url}${finalUrl.replace(
            ",",
            ""
          )}~~~${parentModule_Id}~~~${moduleCode}`;
          mainUrl.replace(",", "");
        } else {
          const finalUrl = `~~~${moduleCode}`;
          mainUrl = `${url}${finalUrl.replace(",", "")}`;
          mainUrl.replaceAll(",", "");
        }
      }
      console.log("mainUrl:-", mainUrl);
      resolve(mainUrl);
    });
  };

  function getModuleChartData(module) {

    console.log("getModuleChartData:-", module);

    const { uniqueNo, moduleCode, parentModule_Id, parentModuleId } = module;
    let moduleDataArray = [];
    moduleDataArray.push({
      uniqueNo: module.uniqueNo,
      moduleCode: module.moduleCode,
      moduleName: module.moduleName,
      parentModule_Id: module.parentModule_Id,
      parentModuleId: module.parentModuleId,
      url: module.moduleURL,
      presentationCategory: module.presentationCategory,
      dataPointClick: module.dataPointClick,
      hasChildren: module.hasMoreChild
    });

    //==========================================================
    if (
      modules.filter(x => x.uniqueNo === uniqueNo).length > 0 &&
      modules.filter(x => x.uniqueNo === uniqueNo)[0].selected
    ) {
    //   dispatch(removeModuleFromDeleted(uniqueNo));
    //   dispatch(selectSpecificModule(false, uniqueNo));
    } else {
			if(module.dataPointClick === true){
				if(module.hasMoreChild === true){
					makeApiCallUrl(parentModuleId, parentModule_Id, null).then(res=>{
						featureService
						.fetchModuleData(res).then(response=>{
							console.log("response:-", response);
							dispatch(putMapClickedDataInFeatures(response, module.parentModuleId, module.parentModule_Id, module.uniqueNo));
							makeApiCallUrl(uniqueNo, moduleCode, parentModule_Id).then(res => {
								dispatch(
									fetchModuleDetails(
											res,
											moduleCode,
											uniqueNo,
											selectedFeature
									)
								);
							});
						})    
					})    
				}
				else{
					makeApiCallUrl(parentModuleId, parentModule_Id, null).then(res=>{
						featureService
						.fetchModuleData(res).then(response=>{
							console.log("response:-", response);
							dispatch(putMapClickedDataInFeatures(response, module.parentModuleId, module.parentModule_Id, module.uniqueNo));
						})
					})
				}
			}
			else{
				if(module.hasChildren === true){
					makeApiCallUrl(uniqueNo, moduleCode, parentModule_Id).then(res => {
						dispatch(
							fetchModuleDetails(
								res,
								moduleCode,
								uniqueNo,
								selectedFeature
							)
						);
					});
				}
			}
    }
  }

  const handleRefresh = (item) => {

    setIsModuleLoading(true);

    // console.log("Refresh Item:", item)
    const module = feature.modules.filter(e => e.uniqueNo === item.id)[0];

    if(module!==undefined&&module!=null){
        const { uniqueNo, moduleCode, parentModule_Id } = module;
        let moduleDataArray = [];
        moduleDataArray.push({
        uniqueNo: module.uniqueNo,
        moduleCode: module.moduleCode,
        moduleName: module.moduleName,
        parentModule_Id: module.parentModule_Id,
        parentModuleId: module.parentModuleId,
        url: module.moduleURL,
        presentationCategory: module.presentationCategory,
        dataPointClick: module.dataPointClick,
        hasChildren: module.hasMoreChild
        });
        // if (dataPointClick !== undefined && dataPointClick === true) {
        //     dispatch(putMapClickedDataInFeatures(moduleDataArray));
        //   }
        if(module.moduleURL != null){
            setIsRefreshing(true);
            // dispatch(
            //     fetchModuleDetails(
            //         module.moduleURL,
            //         moduleCode,
            //         uniqueNo,
            //         selectedFeature
            //     )
            // );
            setIsModuleLoading(false);
        }
        else{
            makeApiCallUrl(uniqueNo, moduleCode, parentModule_Id).then(res => {
                // console.log("Final URL",res)
                dispatch(
                    fetchModuleDetails(
                    res,
                    moduleCode,
                    uniqueNo,
                    selectedFeature
                    )
                );
                setIsModuleLoading(false);
            });
        }
          

    }
    
  }
  
  
  const handleClick = (item) => {
    dispatch(setSelectedModule(feature.featureCode, item.id));
    //   console.log("Item in Tabs", item)

    const currentModule = feature.modules.filter(e => e.uniqueNo === item.id)[0] || "";
    const parentModule = feature.modules.filter(e=>e.uniqueNo===currentModule.parentModuleId)[0] || "";
      
      // to check if there is any value in array 
      if(feature.breadCrumbs.filter(e=>e.id===item.id).length<1){

        if(currentModule.parentModuleId!==null){

            let tempCurrentModule = currentModule;
            let tempParentModule = parentModule;
            let itemLevel = item.level;

            while(tempCurrentModule.parentModuleId!==null){
                

                if(feature.breadCrumbs.filter(e=>e.id===tempParentModule.uniqueNo).length<1){
                    console.log('tempParentModule:',tempParentModule);
                    dispatch(addToBreadcrumbs(feature.featureCode, {id: tempParentModule.uniqueNo, code: tempParentModule.moduleCode, label: tempParentModule.moduleName, level: itemLevel-1}));   
                }
                tempCurrentModule = tempParentModule;
                tempParentModule = feature.modules.filter(e=>e.uniqueNo===tempParentModule.parentModuleId)[0];
                itemLevel--; 
                
            }


            dispatch(addToBreadcrumbs(feature.featureCode, item));
        }
        else{

            dispatch(addToBreadcrumbs(feature.featureCode, item));
        }
      }

    //   //  if there is any breadcrumb with level higer than selected breadcrumb, it will be removed
      feature.breadCrumbs.map(crumb=>{
          if(crumb.level>=item.level&&crumb.id!==item.id){
              dispatch(removeFromBreadcrumbs(feature.featureCode, crumb));
              return crumb
          }
          return crumb;
      })
  }

  const handleDelete = (item) => {
      dispatch(removeFromOpenTabs(feature.featureCode, item))
      dispatch(setSelectedModule(feature.featureCode, feature.featureCode));
      feature.breadCrumbs.map(crumb=>{
          if(crumb.level>=1){
              dispatch(removeFromBreadcrumbs(feature.featureCode, crumb));
              return crumb
          }
          return crumb;
      })
  }

  const handleClickBreadcrumb = (item) => {

    
      dispatch(setSelectedModule(feature.featureCode, item.id));
      if(item.id!==feature.featureCode && feature.openTabs.filter(e=>e.label===item.label).length<1){
          dispatch(addToOpenTabs(feature.featureCode, item));
      }
      feature.breadCrumbs.map(crumb=>{
          if(crumb.id!==item.id&&crumb.level >= item.level){
              dispatch(removeFromBreadcrumbs(feature.featureCode, crumb));
              return crumb
          }
          return crumb;
      }) 
  }

  const handlePin = () => {
    setOpenTooltip(true)
      const currentModuleName = feature.modules.filter(e => e.uniqueNo === feature.showModule)[0].moduleName;
      if(pinnedModules.filter(e=>e.selectedModule===feature.showModule).length<1){
        dispatch(addToPinnedModules({
            featureCode: selectedFeature,
            selectedModule: feature.showModule,
            moduleName: currentModuleName,
            module: feature
        }))
      }
  }

  useEffect(()=>{
    if(openTooltip===true){
      setTimeout(()=>{
        setOpenTooltip(false)
      }, 3000)
    }
  })

  // const handleTooltipClose = () => {
  //   setOpenTooltip(false);
  // };

  const handleOpenPin = (item) => {
      dispatch(openPinnedModule(item.featureCode, item.module));
      handleBookmarkClose();
  }

  const handleRemovePin = (item) => {
    if(pinnedModules.filter(e=>e===item).length>0){
        dispatch(removeFromPinnedModules(item));
    }
  }
  
    return(
    <StickyContainer >
			<Sticky >
				{({ style }) => (
					<div style={{ ...style, zIndex: 1 }}> 
						<div  className={`flex justify-start w-100  bg-[#052a4f] ${feature.openTabs.length<1?'pb-[10px] pt-0':'pb-[10px] pt-0'}`} >
							<div className="w-full " >
								{feature.openTabs.length>0&&(
									<Box className="px-1 pt-1 bottom-1 text-left ml-5" style={{backgroundColor: '#fff'}} >
										{feature.openTabs.length>0 && feature.openTabs.map((item, index)=>(
											<span key={index} >
												{feature.showModule===item.id ? (
													<Chip 
                            sx={{
                              '& .MuiChip-deleteIcon': {
                                color: 'white',
                              },
                            }}
														key={item.id} 
														style={{backgroundColor: '#83a3bb',}} 
														className="text-[12px] m-1 text-white font-gSans" 
														label={item.label}
														icon={
															<MdRefresh 
																	className=" text-white hover:text-[#565f6f]" 
																	onClick={()=>{handleRefresh(item)}} 
															/>
														}
                            deleteIcon={<MdOutlineClose/>}
														size="small" 
														onDelete={()=>handleDelete(item)}
														classes={{
															root: classes.chipRoot,
														}} 
													/>
												):(
													<Chip 
														key={item.id} 
														style={{border: '1px solid #83a3bb'}} 
														className=" bg-transparent font-gSans hover:bg-light-grey hover:text-white text-[12px] m-1" 
														size="small" 
														label={item.label} 
                            deleteIcon={<MdOutlineClose/>}
														onClick={()=>handleClick(item)}  
														onDelete={()=>handleDelete(item)} 
														classes={{
															root: classes.inactiveChip
														}}
													/>
												)}
											</span>
										))}
									</Box>
								)}
								<Box className="flex justify-between border-4 border-solid border-white text-white items-center px-1 ml-5 text-left">
									<div className='flex justify-start items-center' >
										{feature.breadCrumbs.length>1 &&(
											<IconButton onClick={()=>handlePin()} className="m-0 p-0 ml-1 mr-2" >
													<motion.img
                            whileTap={{ translateY: -5 }}
                            transition={{
                              type: "spring",
                              stiffness: 160,
                              damping: 10
                            }}
                           src={getIconByKey('whitePin')} alt="pin Icon" className="container w-auto p-0 h-5 m-0" />
											</IconButton>
                    
										)}
                            
										<Breadcrumbs className="text-white text-base font-gSans" >
											{feature.breadCrumbs.sort((a, b) => a.level > b.level ? 1:-1).map((item)=>(
												<p 
													onClick={()=>handleClickBreadcrumb(item)} 
													className="text-[12px] cursor-pointer my-1 text-white"
													key={item.id}
												> 
													{item.label}{feature.breadCrumbs.indexOf(item) === feature.breadCrumbs.length-1&&' /'}
												</p>
											))}
										</Breadcrumbs>
									</div>
								</Box>
							</div>
              
                <Tooltip
                      open={openTooltip}
                      title={<p style={{fontSize: '16px', margin: '5px'}}>{pinnedModule[pinnedModule.length - 1]} is pinned here!</p>}
                      arrow placement='bottom'>
                        <IconButton id="basic-button"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleBookmark} 
                          className="m-0 p-0 ml-1 mr-3 h-fit self-center"
                      >
                          <img src={getIconByKey('yellowPin')} alt="Pinned Modules Logo" className="w-auto h-11 m-0"  />
                        </IconButton>
                  </Tooltip> 
                                 
							<Menu
                className={classes.root}
								id="basic-menu"
								anchorEl={bookMark}
								open={open}
								onClose={handleBookmarkClose}
								MenuListProps={{
								'aria-labelledby': 'basic-button',
								}}
							>
								{pinnedModules.length>0 ? pinnedModules.map((item)=>(
                  <>
										<MenuItem className='flex justify-between p-3' disableRipple key={item.featureCode}>
												<Link component="button" onClick={()=>handleOpenPin(item)} className="text-sm text-black" underline='false' >{item.moduleName}</Link>
												
												<IconButton className='w-[14px] h-[14px] ml-4' onClick={()=>handleRemovePin(item)} >
														<img src={getIconByKey('closeBlue')} alt="closeIcon" style={{width: '10px', height: '10px'}}  />
												</IconButton>
										</MenuItem>
                    <Divider className='m-0'/>
                  </>
								)):(<div className='min-w-max p-3 flex'>No Pinned Modules!</div>)}

							</Menu>
						</div>
					</div>
				)}
			
			</Sticky>
        {isLoading?(
          <CircularProgress />
        ):(
					<>
						{isModuleLoading?(
							<Box
								className={'bg-white m-5 mt-4 mb-2 pb-2 pt-2 h-[80vh]'}
							>
								<CircularProgress color='primary' />     
							</Box>
						):(
							<>
								<ComponentHolder index={feature.featureCode} type={'main'} value={feature.showModule} >
									<MainPage 
											key={feature.featureCode} 
											feature={feature} 
											getModuleChartData={getModuleChartData} 
											isRefreshing={isRefreshing}
											setIsRefreshing={setIsRefreshing}
									/>
								</ComponentHolder>
								{feature.modules.length > 0 && feature.modules.map((item)=>(
									<ComponentHolder index={item.uniqueNo} key={item.uniqueNo} type={'main'} value={feature.showModule} >
										<ModuleHolder isRefreshing={isRefreshing} setIsRefreshing={setIsRefreshing} feature={feature} module={item} getModuleChartData={getModuleChartData} />
									</ComponentHolder>
								))}
							</>
						)}
							
					</>
        )}
            
    </StickyContainer>
  )
}

const MainPage = ({feature, getModuleChartData, isRefreshing, setIsRefreshing}) =>{

    const dispatch = useDispatch();

    const handleClick = (item) => {
        dispatch(setSelectedModule(feature.featureCode, item.uniqueNo));

        if(feature.breadCrumbs.filter(e=>e.id===item.id).length<1){
            dispatch(addToBreadcrumbs(feature.featureCode, {id: item.uniqueNo, code: item.moduleCode, label: item.moduleName, level: 1}));
        }
        feature.breadCrumbs.map(crumb=>{
            if(crumb.level===1 && crumb.id!==item.uniqueNo){
                dispatch(removeFromBreadcrumbs(feature.featureCode, crumb));
                return crumb
            }
            return crumb;
        })
        if(feature.openTabs.filter(e=>e.id===item.uniqueNo).length<1){
            dispatch(addToOpenTabs(feature.featureCode, {id: item.uniqueNo, code: item.moduleCode, label: item.moduleName, level: 1}));
        }

        getModuleChartData(item);
    }

    return(
      <Grid container direction={'row'} justifyContent={'flex-start'} alignItems={'flex-start'}  className={'rounded-2xl bg-white pl-[15px] pr-[15px]'} >

				{/* mapping all the modules inside a feature as button */}
        {feature.modules.length>0 && feature.modules.map((item, index)=>{

          let ModuleIcon = buttonIconMapping(item.moduleCode)

          return (
            <Grid item key={index} xs={6} className="lg:min-h-[400px] sm:max-h-[380px]" >
              {item.parentModule_Id == null?(
                <>
                  {item.parentModuleId==null&&item.moduleChartDetails!=null?(
                    <div className="text-center mx-2 my-0" >
                      <p>{item.moduleName}</p>
                      <ModuleChartFrame 
                        current={item} 
                        getModuleChartData={getModuleChartData} 
                        feature={feature} 
                        isRefreshing={isRefreshing}
                        setIsRefreshing={setIsRefreshing}
                      />
                    </div>
                  ):(
                    <>
                      {item.parentModuleId==null&&(
                        <Card 
                          elevation={2} 
                          key={item.uniqueNo} 
                          onClick={()=>handleClick(item)} 
                          className='hover:bg-[#eee] cursor-pointer mt-3 mb-3 ml-[7px] pt-10'
                          sx={{
                              height: '100%',
                              minHeight: '300px',
                              width: '90%',
                          }}
                        >
                          <Typography className='font-bold text-xl mb-20' >{item.moduleName}</Typography>
                          {/* {ModuleIcon !== null && (
                              <ModuleIcon className="text-[#aaa]" size={120} />
                          )} */}
                        </Card>
                      )}   
                    </>
                  )}
                </>
              ):""}
            </Grid>
          )
        })}
        
      </Grid>
    )
}

  export default FeatureHolder;