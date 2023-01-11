import React from 'react';
import * as MaterialDesign from 'react-icons/md';

const Icon = (props) =>{
    const { iconName, size, color } = props;

    return(
        <div style={{fontSize: size, color: color, marginRight: '5px'}} >
            {React.createElement(MaterialDesign[iconName])}
        </div>
    )
}

export default Icon;