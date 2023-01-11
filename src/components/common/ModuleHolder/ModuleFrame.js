import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const ModuleFrame = ({module}) => {
    return (
        <div>
            <p>{module.moduleName}</p>
        </div>
    )
}

export default ModuleFrame;