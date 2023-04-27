import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedModule, addToBreadcrumbs, addToOpenTabs } from 'redux/features/features.actions';
import ModuleDataContainer from 'components/common/modules/moduleDataContainer/ModuleDataContainer';
import ModuleChartFrame from 'components/common/modules/mainModuleSearchFrame/ModuleChartFrame';
import { Grid, Card, Typography } from '@mui/material';
import buttonIconMapping from 'assets/buttonIconMapping';
// import ModuleFrame from './ModuleFrame';

const ModuleHolder = ({feature, module, getModuleChartData, isRefreshing, setIsRefreshing}) => {
    
    const dispatch = useDispatch();
    const selectedFeature = useSelector(state=>state.features.features.featureCode);
    
    let modules = feature.modules.filter(item=>item.parentModule_Id === module.moduleCode);


    
    const handleClick = (item) => {
        // if(feature.modules.filter(e=>e.uniqueNo === item.uniqueNo).length<1){
        //     dispatch(addToModules(feature.featureCode, item))
        // }
        // console.log("BreadCrumbs:-",feature.breadCrumbs)
        // console.log("Item Parent Id:-", item.parentModuleId)
        feature.breadCrumbs.map(crumb=>{
            if(item.parentModuleId === crumb.id){
                dispatch(addToBreadcrumbs(feature.featureCode, {
                    id:item.uniqueNo, 
                    code: item.moduleCode,
                    label: item.moduleName, 
                    level: crumb.level + 1,
                }))
                if(feature.openTabs.filter(e=>e.id===item.uniqueNo).length<1){
                    dispatch(addToOpenTabs(feature.featureCode, {
                        id: item.uniqueNo, 
                        code: item.moduleCode,
                        label: item.moduleName,
                        level: crumb.level + 1,
                    }))
                }
            }
        })

        dispatch(setSelectedModule(feature.featureCode, item.uniqueNo))
        if(item.hasChildren == true){
            getModuleChartData(item);
        }
    }

    

    return(
        <div>
            {module.hasChildren===false ? (
                <>
                    {module.presentationCategory!==null ? (
                        <ModuleDataContainer 
                            // className={'bg-app-primary pb-5 pl-3 pr-3'} 
                            moduleCode={module.moduleCode}
                            moduleURL={module.url}
                            presentationCategory={module.presentationCategory}
                            moduleId={module.uniqueNo}
                            feature={feature}
                            isRefreshing={isRefreshing}
                            setIsRefreshing={setIsRefreshing}
                        />
                    ):(
                        <>
                            {module.moduleChartDetails!=null?(
                                <ModuleChartFrame 
                                    // className={'bg-app-primary pb-5 pl-3 pr-3'}
                                    current={module} 
                                    getModuleChartData={getModuleChartData} 
                                    feature={feature}
                                    isRefreshing={isRefreshing}
                                    setIsRefreshing={setIsRefreshing}
                                />
                            ):(
                                <div>
                                    <h1 className="text-red-700 pt-20 font-bold text-5xl" >{module.moduleName}</h1>
                                    
                                </div>
                            )}
                        </>
                    )}
                </>
                
            ):(
                <Grid container className="px-5 py-3 h-[100%]" >
                    {modules.map(item=>{
                        if(item.moduleChartDetails!=null){
                            return(
                                <Grid item xs={6} key={item.uniqueNo} >
                                    <div className="text-center mx-2" >
                                        <p>{item.moduleName}</p>
                                        <ModuleChartFrame 
                                            current={item} 
                                            getModuleChartData={getModuleChartData} 
                                            feature={feature} 
                                            isRefreshing={isRefreshing}
                                            setIsRefreshing={setIsRefreshing}
                                        />
                                    </div>
                                </Grid>
                            )
                        }
                        else{
                            let ModuleIcon = buttonIconMapping(item.moduleCode)
                            return(
                                <Card 
                                    elevation={2} 
                                    key={item.uniqueNo} 
                                    onClick={()=>handleClick(item)} 
                                    className='hover:bg-[#eee] cursor-pointer p-10'
                                    sx={{
                                        height: '100%',
                                        minHeight: '200px',
                                        width: 1/4,
                                    }}
                                >
                                    <Typography className='font-bold text-xl mb-10' >{item.moduleName}</Typography>
                                    {/* {ModuleIcon !== null && (
                                        <ModuleIcon className="text-[#aaa]" size={120} />
                                    )} */}
                                </Card>
                            )
                        }
                    })}
                    
                </Grid>
            )}
        </div>
    )
}


export default ModuleHolder;