import React, { useState } from 'react'
import {
    Button,
    Menu,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Tooltip
} from '@mui/material'
import { BsLayoutSidebarInset } from 'react-icons/bs'
import { FaAngleDown } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton';


const FreezeDropdown = (props) => {
    const { checkedState, setCheckedState, columns, setColumns, utilColumn } =
        props

    const [freezeAnchor, setFreezeAnchor] = useState(null)
    const freezeOpen = Boolean(freezeAnchor)

    const handleOpenFreeze = (event) => {
        setFreezeAnchor(event.currentTarget)
    }
    const handleCloseFreeze = () => {
        setFreezeAnchor(null)
    }

    const handleCheckbox = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        )

        setCheckedState(updatedCheckedState)

        const updatedColumns = columns.map((item, index) => {
            if (utilColumn !== null) {
                if (updatedCheckedState[index] === true || index === 0) {
                    return {
                        ...item,
                        frozen: true,
                    }
                } else {
                    return {
                        ...item,
                        frozen: false,
                    }
                }
            } else {
                if (updatedCheckedState[index] === true) {
                    return {
                        ...item,
                        frozen: true,
                    }
                } else {
                    return {
                        ...item,
                        frozen: false,
                    }
                }
            }
        })

        setColumns(updatedColumns)
    }

    return (
        <div>
        <Tooltip title='Freeze' placement="top">
            <IconButton
                id="freeze-dropdown-button"
                aria-controls={freezeOpen ? 'freeze-dropdown-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={freezeOpen ? 'true' : undefined}
                className="text-app-primary mr-4 ml-4"
                // className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]"
                variant="contained"
                size="small"
                onClick={handleOpenFreeze}
                // endIcon={<FaAngleDown size={12} />}
            >
                <BsLayoutSidebarInset size={16} className="mr-2" /> <FaAngleDown size={12} />
            </IconButton>
        </Tooltip>
            

            <Menu
                id="freeze-dropdown-menu"
                MenuListProps={{
                    'aria-labelledby': 'freeze-dropdown-button',
                    sx: {
                        height: '300px',
                    },
                }}
                anchorEl={freezeAnchor}
                open={freezeOpen}
                onClose={handleCloseFreeze}
            >
                {columns.map((col, index) => {
                    if (utilColumn !== null) {
                        if (index !== 0) {
                            return (
                                <MenuItem
                                    sx={{
                                        padding: 0,
                                        margin: 0,
                                    }}
                                    key={col.key}
                                >
                                    <FormControlLabel
                                        control={<Checkbox size="small" />}
                                        label={col.name}
                                        checked={
                                            checkedState.length
                                                ? checkedState[index]
                                                : false
                                        }
                                        onChange={() => handleCheckbox(index)}
                                        sx={{
                                            padding: 0,
                                            margin: 0,
                                            paddingRight: '15px',
                                        }}
                                    />
                                </MenuItem>
                            )
                        } else return null
                    } else {
                        return (
                            <MenuItem
                                sx={{
                                    padding: 0,
                                    margin: 0,
                                }}
                                key={col.key}
                            >
                                <FormControlLabel
                                    control={<Checkbox size="small" />}
                                    label={col.name}
                                    checked={
                                        checkedState.length
                                            ? checkedState[index]
                                            : false
                                    }
                                    onChange={() => handleCheckbox(index)}
                                    sx={{
                                        padding: 0,
                                        margin: 0,
                                        paddingRight: '15px',
                                    }}
                                />
                            </MenuItem>
                        )
                    }
                })}
            </Menu>
        </div>
    )
}

export default FreezeDropdown
