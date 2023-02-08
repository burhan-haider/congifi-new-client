import React, {useState, useEffect} from 'react'
import {
    Box,
    Button,
} from '@mui/material'


import { actionMapping } from 'components/common/modules/actionregistry/ActionMapping';

const BottomContainer = (props) => {

    const { 
        actionButtons,
    } = props;

    const [currentAction, setCurrentAction] = useState(null)


    useEffect(()=>{
        console.log("Action Buttons", actionButtons)
    })

    const handleClick = (action) => {
        
        setCurrentAction(action)

        actionMapping[action.actionCode](action).then(res=>{
            console.log(res)
        })
    }

 
    return (
        <Box className="flex flex-row justify-end items-center" >
            {actionButtons.length > 0 && actionButtons.map((action, index)=>(
                <Button
                    onClick={()=>handleClick(action)}
                    className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]">
                        {action.actionName}
                </Button>
            ))}
        </Box>
    )
}

export default BottomContainer;