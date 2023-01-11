import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedModule, addToBreadcrumbs, addToOpenTabs } from 'redux/features/features.actions';
import ModuleDataContainer from 'components/common/modules/moduleDataContainer/ModuleDataContainer';
import ModuleChartFrame from 'components/common/modules/mainModuleSearchFrame/ModuleChartFrame';
import { Grid } from '@mui/material';
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
                            return(
                                <button key={item.uniqueNo} onClick={()=>handleClick(item)} className=" m-5 text-white font-bold border-none bg-red-500 hover:bg-red-700 rounded-md p-3 cursor-pointer max-h-12">
                                    {item.moduleName}
                                </button>
                            )
                        }
                    })}
                    
                </Grid>
            )}
        </div>
    )
}


export default ModuleHolder;