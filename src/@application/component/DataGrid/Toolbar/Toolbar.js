import React, { useState } from 'react'
import { Box, Switch, Stack, Typography, InputBase, Button, Tooltip, Divider, Checkbox, MenuItem, FormControl, Select } from '@mui/material'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';
import ExportDropdown from './ExportDropdown'
import FreezeDropdown from './FreezeDropdown'
import ReorderDropdown from './ReorderDropdown'
import { BiSearch } from 'react-icons/bi'
import { RiEye2Fill } from 'react-icons/ri'
import { FaFilter } from 'react-icons/fa'
import { MdNotInterested } from 'react-icons/md'

const Toolbar = (props) => {
    const {
        checkedState,
        setCheckedState,
        columns,
        setColumns,
        gridElement,
        title,
        utilColumn,
        isSelected,
        selectedRows,
        showSelected,
        setShowSelected,
        setCurrentPage,
        selectedGridElement,
        searchString,
        setSearchString,
        filterActive,
        setFilterActive,
        setIsSelected
    } = props

    const CustomSwitch = styled(Switch)(({ theme }) => ({
        width: 50,
        height: 25,
        padding: 0,
        borderRadius: 50,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
                transform: 'translateX(26px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: '#1a212c',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 20,
            height: 20,
            borderRadius: 50,
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: '#1a212c',
            boxSizing: 'border-box',
        },
    }))

    return (
        <Box className="flex flex-row justify-between items-center">
            <Box>
                <Typography className='font-bold text-xl font-gSans' >
                    {title}
                </Typography>
            </Box>
            
            <Box className="flex flex-row-reverse justify-evenly items-center">
                <Box className="ml-5 bg-white border-solid border-[1px] border-app-dark px-4 rounded-full flex flex-row justify-between items-center my-[11px]">
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search mails' }}
                        onChange={(e) => setSearchString(e.target.value)}
                    />
                    <BiSearch size={24} />
                </Box>
                {isSelected && (
                    <Stack
                        flex
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        alignItems="center"
                        className="ml-2"
                    >
                        {/* <Typography
                            className={`mr-3 font-bold ${
                                showSelected
                                    ? 'text-slate-400'
                                    : 'text-app-dark'
                            }`}
                        >
                            All
                        </Typography>
                            
                        <CustomSwitch
                            checked={showSelected}
                            onChange={() => {
                                setShowSelected(!showSelected)
                                setCurrentPage(1)
                            }}
                            icon={<RiEye2Fill size={22} />}
                            checkedIcon={<RiEye2Fill size={22} />}
                        />
                        <Typography
                            className={`ml-0 font-bold ${
                                !showSelected
                                    ? 'text-slate-400'
                                    : 'text-app-dark'
                            }`}
                        >
                            Selected Case
                        </Typography> */}
                        {/* <Checkbox
                            className='p-1'
                            checked={!showSelected}
                            onChange={() => {
                                setShowSelected(!showSelected)
                                setCurrentPage(1)
                            }}
                            />
                        <FormControl fullWidth>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            // label="Age"
                            // onChange={handleChange}/
                            onChange={() => {
                            setShowSelected(!showSelected)
                            setCurrentPage(1)
                        }}
                            >
                            <MenuItem className={`mr-3 font-bold ${
                            showSelected
                                ? 'text-slate-400'
                                : 'text-app-dark'
                        }`} value={10}>All</MenuItem>
                            <MenuItem className={`ml-0 font-bold ${
                            !showSelected
                                ? 'text-slate-400'
                                : 'text-app-dark'
                        }`} value={20}>Selected</MenuItem>
                            </Select>
                        </FormControl> */}
                        <Checkbox
                            className='p-1'
                            checked={showSelected}
                            onChange={() => {
                                setShowSelected(!showSelected)
                                setCurrentPage(1)
                            }}
                        />
                        <Typography
                            className={`ml-0 font-bold ${
                                !showSelected
                                    ? 'text-slate-400'
                                    : 'text-app-dark'
                            }`}
                        >
                            Selected Case
                        </Typography>
                    </Stack>
                )}

                <ExportDropdown
                    title={title}
                    btnText={'Export'}
                    gridElement={gridElement}
                    isSelected={isSelected}
                    selectedGridElement={selectedGridElement}
                />
                <Divider orientation="vertical" variant="middle"  flexItem />

                <FreezeDropdown
                    checkedState={checkedState}
                    setCheckedState={setCheckedState}
                    columns={columns}
                    setColumns={setColumns}
                    utilColumn={utilColumn}
                />
                <Divider orientation="vertical" variant="middle"  flexItem />

                <ReorderDropdown
                    checkedState={checkedState}
                    setCheckedState={setCheckedState}
                    columns={columns}
                    setColumns={setColumns}
                    utilColumn={utilColumn}
                />
                <Divider orientation="vertical" variant="middle"  flexItem />


                <Tooltip title='Add Filters' placement='top'>
                    <IconButton
                        className="text-app-primary mr-4 ml-4"
                        // className="px-5 py-2 mx-2 my-3 normal-case text-app-primary bg-transparent hover:bg-app-primary hover:text-white  text-sm rounded-[25px] shadow-none border-solid border-[1px] border-[#052a4f]"
                        variant="contained"
                        size="small"
                        onClick={()=>setFilterActive(!filterActive)}
                    >
                        {filterActive ? <MdNotInterested size={16} /> : <FaFilter size={14} /> }
                        {/* {filterActive ? 'Remove Filters' : 'Add Filters'} */}
                    </IconButton>
                </Tooltip>

                

            </Box>
        </Box>
    )
}

export default Toolbar
