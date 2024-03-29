import ReactDatagrid, { SelectColumn, headerRenderer } from 'react-data-grid'
import React, { useState, useEffect, useMemo, } from 'react'
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    ClickAwayListener,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    styled,
    Checkbox,
    ListItem,
    InputLabel,
    Select,
    FormControl,
    Button
} from '@mui/material'
import Pagination from './Pagination/Pagination'
import { BsInfoCircleFill, BsCaretRightFill, BsFilter } from 'react-icons/bs'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import masterModuleHyperlinks from '../hyperlinks/MasterModuleHyperlinks'
import moment from 'moment'
import commonService from 'services/common/commonService'

import './tableStyles.css'
import Toolbar from './Toolbar/Toolbar'
import BottomContainer from './BottomContainer/BottomContainer'
import GenericDialog from '../dialog/GenericDialog'
import { GenericDetailsBottomPanel } from 'components/common/modules/moduleDataContainer/modulePages/common/bottomPages'
import { useSelector } from 'react-redux'
import HyperlinkModalContentConfig from '../hyperlinks/HyperlinkModalContentConfig'
import { FaArrowLeft, FaInfoCircle } from 'react-icons/fa'

const DataGrid = (props) => {
    const {
        utilColumn = null,
        isInfo = false,
        title,
        tableData,
        selectedData,
        setSelectedData,
        actionButtons = [],
        moduleType = null,
        ComponentBottomContainer = null,
        dynamicProps = null,
        customHyperlinkFunction = null
    } = props

    const headerConfig = useSelector(state => state.auth.user.labels.allLabels);
    const hyperlinksMap = masterModuleHyperlinks.getAllHyperlinksData();

    const [modalOpen, setModalOpen] = useState(false)

    const handleCloseModal = () => setModalOpen(false);
    const handleOpenModal = () => setModalOpen(true);

    const [property, setProperty] = useState({})
    const [hyperlinkContent, setHyperlinkContent] = useState({})

    const [infoOpen, setInfoOpen] = useState(false);
    const [infoRow, setInfoRow] = useState({});
    const [infoRowArray, setInfoRowArray] = useState([]);

    const [sortColumns, setSortColumns] = useState([])
    const [rows, setRows] = useState([])
    const [tempRowState, setTempRowState] = useState([])
    const [totalRows, setTotalRows] = useState([])
    const [columns, setColumns] = useState([])
    const [selectedRows, setSelectedRows] = useState(new Set())
    const [selectedRowsArray, setSelectedRowsArray] = useState([])
    const [isSelected, setIsSelected] = useState(false)
    const [showSelected, setShowSelected] = useState(false)
    const [selectedCaseStatus, setSelectedCaseStatus] = useState([])

    // eslint-disable-next-line no-unused-vars
    const [direction, setDirection] = useState('ltr')
    const [checkedState, setCheckedState] = useState([])
    const [searchString, setSearchString] = useState('')
    const [caseNo, setCaseNo] = useState([])

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1)
    const [dataPerPage, setDataPerPage] = useState(10)
    const [numOfPages, setNumOfPages] = useState(0)
    const [pageNumbers, setPageNumbers] = useState([])
    const [firstIndex, setFirstIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(0)

    //Filters States
    const [filterActive, setFilterActive] = useState(false)

    const dataSet = {
        "Customer Details": commonService.fetchModuleDetails(
            "customerMaster",
            infoRowArray[2]
        ),
        "Account Details": commonService.fetchModuleDetails(
            "customerMaster",
            infoRowArray[2]
        )
    };

    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    }

    const getLastValue = (set) => {
        let value
        for (value of set);
        return value
    }

    const hyperLinkClick = (
        hyperlinkRow,
        hyperlinkColumn,
        hyperlinkFunction,
        hyperlinkTitle,
        hyperlinkDetailsModule,
        rowIndex,
        columnIndex
    ) => {

        const data = masterModuleHyperlinks.hyperlinkFunction(
            hyperlinkColumn,
            hyperlinkFunction,
            hyperlinkTitle,
            hyperlinkDetailsModule,
            hyperlinkRow,
            rowIndex,
            columnIndex,
            dynamicProps,
        )
        console.log("hyperlinkRow:-", hyperlinkRow);
        console.log("module data:-", data,)

        if (!customHyperlinkFunction) {
            setProperty(data.modalData)
            setHyperlinkContent(data)
            handleOpenModal()
        }
        else {
            customHyperlinkFunction();
        }

    }

    //Setting first and last index of current Page
    useEffect(() => {
        let tempLastIndex = currentPage * dataPerPage
        setFirstIndex(tempLastIndex - dataPerPage)
        setLastIndex(tempLastIndex)
    }, [currentPage, dataPerPage])

    useEffect(() => {
        let tempColumns = []
        let tempRows = []

        if (utilColumn === 'select' && infoOpen === false) {
            tempColumns.push(SelectColumn)
        }
        if (utilColumn === 'singleSelect' && infoOpen === false) {
            tempColumns.push({
                ...SelectColumn,
                headerRenderer(props) {
                    return ''
                },
            })
        }


        tableData.DATA.forEach((data, dataIndex) => {
            let tempData = data.map((dval) => {
                return dval === null || dval === '' ? 'N.A' : dval
            })
            let tempObj = {}
            tempData.forEach((item, index) => {
                tempObj[tableData.HEADER[index]] = item.toUpperCase()
            })
            tempObj['INDEX'] = dataIndex + 1
            tempRows.push(tempObj)
        })

        let srWidth = tableData.HEADER.length < 6 ? `${tableData.HEADER.length / 100}%` : 40;
        let colWidth = tableData.HEADER.length < 6 ? `${tableData.HEADER.length / 100}%` : 280;

        tempColumns.push({
            key: 'INDEX',
            name: 'Sr. No.',
            sortable: true,
            filterable: true,
            width: srWidth,
            formatter(props) {
                return isInfo === true && infoOpen === false ? (
                    <div className="flex flex-row justify-start items-center h-[35px]">
                        <IconButton
                            onClick={() => {
                                console.log("Info Props:-", props)
                                setInfoRow(props.row)
                                setInfoRowArray(Object.values(props.row))
                                setInfoOpen(true);
                            }}
                            className='mr-2'
                        >
                            <FaInfoCircle className='text-gray' size={'14px'} />
                        </IconButton>
                        <p>{props.row['INDEX']}</p>
                    </div>
                ) : props.row['INDEX']
            }
        })

        tableData.HEADER.forEach((header, index) => {
            let columnObject = {};
            if (hyperlinksMap.has(header)) {
                columnObject = {
                    key: header,
                    name: headerConfig[header] ? toTitleCase(headerConfig[header]) : toTitleCase(header),
                    sortable: true,
                    filterable: true,
                    width: colWidth,
                    formatter(props) {
                        const value = props.row[header]
                        // console.log("row props:-", props)

                        const hyperlinkRow = Object.values(props.row)
                        const hyperlinkColumn = props.column.key
                        const hyperlinkTitle = hyperlinksMap.get(header)['title']
                        const hyperlinkFunction = hyperlinksMap.get(header)['function']
                        const hyperlinkDetailsModule = hyperlinksMap.get(header)['detailsModule']
                        const rowIndex = props.row['INDEX'] - 1;
                        const columnIndex = utilColumn !== null ? props.column.idx - 2 : props.column.idx - 1;
                        return (
                            <Button
                                variant='text'
                                className="hover:bg-transparent underline text-app-primary"
                                onClick={() => hyperLinkClick(
                                    hyperlinkRow,
                                    hyperlinkColumn,
                                    hyperlinkFunction,
                                    hyperlinkTitle,
                                    hyperlinkDetailsModule,
                                    rowIndex,
                                    columnIndex
                                )}
                                id={value}
                                name={value}
                            >
                                {value}
                            </Button>
                        )
                    },
                }
            } else {
                columnObject = {
                    key: header,
                    name: headerConfig[header] ? toTitleCase(headerConfig[header]) : toTitleCase(header),
                    sortable: true,
                    filterable: true,
                    width: colWidth,
                }
            }

            if (filterActive === true) {
                columnObject = {
                    ...columnObject,
                    headerRenderer: (p) => <FiltersRenderer
                        {...p}
                        rows={tempRows}
                    />,
                }
            }

            tempColumns.push(columnObject);
        })



        setColumns(tempColumns)
        setCheckedState(new Array(tempColumns.length).fill(false))
        setTotalRows(tempRows)
        setTempRowState(tempRows)
    }, [utilColumn, filterActive, tableData, infoOpen])

    //Setting Visible Rows For Pagination
    useEffect(() => {
        let currentRecords =
            isSelected === true && showSelected === true
                ? selectedRowsArray.slice(firstIndex, lastIndex)
                : totalRows.slice(firstIndex, lastIndex)

        setRows(currentRecords)
    }, [
        totalRows,
        firstIndex,
        lastIndex,
        selectedRowsArray,
        showSelected,
        isSelected,
    ])

    //Search Handling
    useEffect(() => {
        if (searchString !== '') {
            const newRecords = tempRowState.filter((e) =>
                Object.values(e).find((f) => {
                    return !!(typeof f === 'string' && f.includes(searchString));
                })
            )
            setTotalRows(newRecords)
        } else {
            setTotalRows(tempRowState)
        }
    }, [searchString, tempRowState])

    // Setting Number Of Pages For Pagination
    useEffect(() => {
        let rowsToCeil =
            isSelected === true && showSelected === true
                ? selectedRowsArray
                : totalRows
        setNumOfPages(Math.ceil(rowsToCeil.length / dataPerPage))
    }, [totalRows, dataPerPage, isSelected, showSelected, selectedRowsArray])

    // Creating Page Numbers Array for Pagination
    useEffect(() => {
        setPageNumbers([...Array(numOfPages + 1).keys()].slice(1))
    }, [numOfPages])

    //Handle Selected Cells for multiselect
    useEffect(() => {
        if (utilColumn === 'select') {
            if (selectedRows.size > 0) {
                if (isSelected === false) {
                    setIsSelected(true)
                }
                setSelectedRowsArray(
                    totalRows.filter((e) => selectedRows.has(e.INDEX))
                )
                let tempCaseNo = [];
                let tempCaseStatus = [];
                totalRows.filter(e => selectedRows.has(e.INDEX)).forEach(row => {
                    tempCaseNo.push(row["app.common.CASENO"])
                    tempCaseStatus.push(row["app.common.CURRENT_CASESTATUS"])
                })
                setCaseNo(tempCaseNo)
                setSelectedCaseStatus(tempCaseStatus)
                console.log("Multiple selected row:-", totalRows.filter((e) => selectedRows.has(e.INDEX)))
            } else {
                if (isSelected === true) {
                    setIsSelected(false)
                }
                setShowSelected(false)
                setSelectedRowsArray([])
                setSelectedCaseStatus([])
                setCaseNo([])
            }
        }
        if (utilColumn === 'singleSelect') {
            if (selectedRows.size > 1) {
                setSelectedRows(new Set([getLastValue(selectedRows)]))
            }
        }
    }, [selectedRows, isSelected, totalRows, utilColumn])

    useEffect(() => {
        if (utilColumn === 'singleSelect') {
            if (selectedRows.size === 1) {
                setSelectedCaseStatus(tableData.DATA[selectedRows.values().next().value - 1][1])
                setCaseNo(tableData.DATA[selectedRows.values().next().value - 1][0])
                // setSelectedData([tableData.DATA[selectedRows.values().next().value-1]])
            }
            else {
                setCaseNo('')
                setSelectedCaseStatus('')
            }
        }
    }, [selectedRows, utilColumn, tableData])

    const rowKeyGetter = (row) => {
        return row.INDEX || 0
    }

    const getComparator = (sortColumn) => {
        let dateRegex = /\d{2}\/\d{2}\/\d{4}/g

        return (a, b) => {
            if (sortColumn === 'INDEX') {
                return a[sortColumn] - b[sortColumn]
            } else if (
                typeof a[sortColumn] === 'string' &&
                typeof b[sortColumn] === 'string' &&
                a[sortColumn].match(dateRegex) &&
                b[sortColumn].match(dateRegex)
            ) {
                return (
                    moment(a[sortColumn], 'MM-DD-YYYY') -
                    moment(b[sortColumn], 'MM-DD-YYYY')
                )
            } else return a[sortColumn].localeCompare(b[sortColumn])
        }
    }

    const sortedRows = useMemo(() => {
        if (sortColumns.length === 0) return rows

        return [...rows].sort((a, b) => {
            for (const sort of sortColumns) {
                const comparator = getComparator(sort.columnKey)
                const compResult = comparator(a, b)
                if (compResult !== 0) {
                    return sort.direction === 'ASC' ? compResult : -compResult
                }
            }
            return 0
        })
    }, [rows, sortColumns])

    const CheckboxFormatter = ({ disabled, onChange, ...props }, ref) => {
        function handleChange(e) {
            onChange(e.target.checked, e.nativeEvent.shiftKey)
        }

        return (
            <input
                type="checkbox"
                ref={ref}
                {...props}
                onChange={handleChange}
                className="cursor-pointer"
            />
        )
    }

    const RadioFormatter = ({ disabled, onChange, ...props }, ref) => {
        function handleChange(e) {
            onChange(e.target.checked, e.nativeEvent.shiftKey)
        }
        function handleClick(e) {
            console.log("Checked:", e.target.checked)
            console.log("TabIndex:", e.target.tabIndex)
            if (e.target.tabIndex === 0 && selectedRows.size > 0) {
                if (e.target.checked === true) {
                    e.target.checked = false
                    e.target.tabIndex = -1
                }
                // e.target.tabIndex = -1
                e.target.checked = false
                setCaseNo("")
                setSelectedCaseStatus(null)
                setSelectedRows(new Set([]))
                setCaseNo("")
                setSelectedCaseStatus(null)
            }
        }
        return (
            <input
                type="radio"
                ref={ref}
                {...props}
                onChange={handleChange}
                onClick={handleClick}
                className="mr-2 cursor-pointer"
                s
            />
        )
    }
    const EmptyRowsRenderer = () => {
        return (
            <div
                style={{ textAlign: 'center', gridColumn: '1/-1' }}
                className="align-middle my-auto text-2xl place-items-center"
            >
                <BsInfoCircleFill size={18} className="mr-3" />
                No Rows Found
            </div>
        )
    }

    const gridElement = (custRows) => (
        <ReactDatagrid
            rowKeyGetter={rowKeyGetter}
            columns={columns}
            rows={custRows}
            defaultColumnOptions={{
                sortable: true,
                resizable: true,
            }}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
            onRowsChange={setRows}
            sortColumns={sortColumns}
            onSortColumnsChange={setSortColumns}
            // summaryRows={summaryRows}
            className={`rdg-light text-base bg-[#f4f5fa] overflow-hidden hover:overflow-auto ${!infoOpen ? 'min-h-[300px]' : 'h-fit'} border-[1.5px] ${filterActive === true && 'border-solid border-app-primary'}`}
            direction={direction}
            rowClass={(row, index) =>
                `border-none ${selectedRows.has(row.INDEX)
                    ? 'bg-[#d9d9d9]'
                    : row.INDEX % 2 !== 0
                        ? 'bg-[#f4f5fa]'
                        : 'bg-[#ebecf1]'
                }`
            }
            renderers={{
                checkboxFormatter:
                    utilColumn === 'singleSelect'
                        ? RadioFormatter
                        : CheckboxFormatter,
                noRowsFallback: <EmptyRowsRenderer />,
            }}
        />
    )

    return (
        <div className="mt-5">
            <Box className=" px-5 pt-2  border-[0.5px] border-solid border-[#a4acb6] bg-white rounded-md shadow-lg">
                <Toolbar
                    checkedState={checkedState}
                    setCheckedState={setCheckedState}
                    columns={columns}
                    setColumns={setColumns}
                    gridElement={gridElement(totalRows)}
                    selectedGridElement={gridElement(selectedRowsArray)}
                    title={title}
                    utilColumn={utilColumn}
                    isSelected={isSelected}
                    selectedRows={selectedRows}
                    showSelected={showSelected}
                    setShowSelected={setShowSelected}
                    setCurrentPage={setCurrentPage}
                    searchString={searchString}
                    setSearchString={setSearchString}
                    filterActive={filterActive}
                    setFilterActive={setFilterActive}
                    setIsSelected={setIsSelected}
                />
                {infoOpen && (
                    <Box className="flex flex-row w-full justify-start items-center">
                        <IconButton onClick={() => {
                            setInfoOpen(false)
                            setInfoRow({})
                            setInfoRowArray([])
                        }} >
                            <FaArrowLeft className='text-app-primary' size="16px" />
                        </IconButton>
                    </Box>
                )}
                {infoOpen
                    ? gridElement([infoRow])
                    : gridElement(sortedRows)
                }
                {(isInfo && infoOpen) && <GenericDetailsBottomPanel data={dataSet} />}
                {!infoOpen && (
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        numOfPages={numOfPages}
                        dataPerPage={dataPerPage}
                        setDataPerPage={setDataPerPage}
                        pageNumbers={pageNumbers}
                        setPageNumbers={setPageNumbers}
                        firstIndex={firstIndex}
                        lastIndex={lastIndex}
                        totalRows={totalRows}
                    />
                )}

                {actionButtons.length > 0 && (
                    <>
                        <hr color='#ddd' />
                        {ComponentBottomContainer !== null ? (
                            <ComponentBottomContainer
                                actionButtons={actionButtons}
                                selectedData={selectedData}
                                moduleType={moduleType}
                                caseNo={caseNo}
                                selectedCaseStatus={selectedCaseStatus}
                            />
                        ) : (
                            <BottomContainer
                                actionButtons={actionButtons}
                                selectedData={selectedData}
                                moduleType={moduleType}
                                caseNo={caseNo}
                                selectedCaseStatus={selectedCaseStatus}
                            />
                        )}

                    </>
                )}

            </Box>
            <GenericDialog
                closeModal={handleCloseModal}
                state={modalOpen}
                property={property}
            >
                <HyperlinkModalContentConfig
                    data={hyperlinkContent}
                    closeModal={handleCloseModal}
                />
            </GenericDialog>
        </div>
    )
}

const FiltersRenderer = ({ isCellSelected, column, children, rows }) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [rowData, setRowData] = useState([])
    const [uniqueRowData, setUniqueRowData] = useState([])
    const [checkedState, setCheckedState] = useState([])
    const [condition, setCondition] = useState({})

    const handleClick = (key, event) => {
        setAnchorEl({ [key]: event.currentTarget })
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {

        let colValues = [];

        rows.forEach((row) => {
            colValues.push(row[column.key])
        })

        let uniqueValues = colValues.filter((v, i, a) => a.indexOf(v) === i)

        setRowData(colValues);
        setUniqueRowData(uniqueValues);
        setCheckedState(new Array(uniqueValues.length).fill(true))

    }, [column, rows])

    const handleCheckbox = (pos) => {
        let updatedCheckedState = checkedState.map((item, index) =>
            index === pos ? !item : item
        )

        setCheckedState(updatedCheckedState)
    }

    const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({

        minHeight: '20px',
        maxHeight: '20px',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            padding: 0,
            margin: 0,
        }
    }))

    const handleCondition = (event) => {
        setCondition({ [column.key]: event.target.value })
    }


    return (
        <>
            <ClickAwayListener onClickAway={handleClose} >
                <div className='flex flex-row justify-between items-center px-2 bg-app-primary text-white'>
                    {column.name}
                    <IconButton className="p-0" onClick={(e) => handleClick(column.key, e)}>
                        <BsFilter color="white" size={16} />
                    </IconButton>

                    <Menu
                        id={`filter-dropdown-${column.key}`}
                        MenuListProps={{
                            'aria-labelledby': 'export-dropdown-button',
                            className: 'min-w-[260px]',
                        }}
                        anchorEl={anchorEl && anchorEl[column.key]}
                        open={Boolean(anchorEl && anchorEl[column.key])}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            horizontal: 'right',
                            vertical: 'top',
                        }}
                        className="text-sm"
                    >
                        <MenuItem className='text-sm' >
                            Sort Ascending <AiOutlineSortAscending style={{ marginLeft: '8px' }} className='ml-2' size={20} />
                        </MenuItem>
                        <MenuItem className='text-sm'>
                            Sort Descending <AiOutlineSortDescending style={{ marginLeft: '8px' }} className='ml-2' size={20} />
                        </MenuItem>
                        <Divider />
                        <ListItem className='text-sm' >
                            <Accordion
                                className='border-none shadow-none p-0 bg-transparent w-[100%]'
                                sx={{
                                    boxShadow: 'none',
                                    width: '100%'
                                }}
                            >
                                <StyledAccordionSummary
                                    className='p-0 h-[0px] m-0'
                                    sx={{
                                        padding: 0,
                                        margin: 0,
                                        '&.Mui-expanded': {
                                            maxHeight: '20px',
                                            minHeight: '20px',
                                        }
                                    }}
                                    expandIcon={<BsCaretRightFill size={12} />}
                                >
                                    <Typography sx={{
                                        padding: 0,
                                        margin: 0,
                                    }} className='p-0 m-0 text-sm' >Filter By Condition</Typography>
                                </StyledAccordionSummary>
                                <AccordionDetails className='p-0' sx={{ padding: 0, }}>
                                    <FormControl sx={{ width: '90%', fontSize: '14px', lineHeight: '20px', marginTop: '20px' }} size="small" className='text-sm w-[90%] mt-5'>
                                        <InputLabel id="demo-select-small" className='text-sm' sx={{ fontSize: '14px', lineHeight: '20px' }}>Condition</InputLabel>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={condition[column.key]}
                                            label="Condition"
                                            onChange={handleCondition}
                                            className='text-sm w-[100%]'
                                            sx={{
                                                fontSize: '14px',
                                                lineHeight: '20px',
                                                width: '100%'
                                            }}
                                            MenuProps={{
                                                className: 'max-h-[240px]',
                                                sx: {
                                                    maxHeight: '240px'
                                                },
                                                disablePortal: true
                                            }}
                                        >
                                            <MenuItem className='text-sm' value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem className='text-sm' value={'empty'}>Is Empty</MenuItem>
                                            <MenuItem className='text-sm' value={'notEmpty'}>Is Not Empty</MenuItem>
                                            <Divider />
                                            <MenuItem className='text-sm' value={'contains'}>Text Contains</MenuItem>
                                            <MenuItem className='text-sm' value={'dontcontain'}>Text Does Not Contain</MenuItem>
                                            <MenuItem className='text-sm' value={'startswith'}>Text Starts With</MenuItem>
                                            <MenuItem className='text-sm' value={'endswith'}>Text Ends With</MenuItem>
                                            <MenuItem className='text-sm' value={'matches'}>Text Matches</MenuItem>
                                            <Divider />
                                            <MenuItem className='text-sm' value={'range'}>Range</MenuItem>
                                            <MenuItem className='text-sm' value={'greaterThan'}>Is Greater Than</MenuItem>
                                            <MenuItem className='text-sm' value={'lessThan'}>Is Less Than</MenuItem>
                                            <MenuItem className='text-sm' value={'equals'}>Is Equals To</MenuItem>
                                        </Select>
                                    </FormControl>
                                </AccordionDetails>
                            </Accordion>
                        </ListItem>
                        {/* <Divider /> */}
                        <ListItem className='text-sm ' >
                            <Accordion
                                className='border-none shadow-none p-0 bg-transparent w-[100%]'
                                defaultExpanded
                                sx={{
                                    boxShadow: 'none',
                                }}
                            >
                                <StyledAccordionSummary
                                    className='p-0 h-[0px] m-0'
                                    expandIcon={<BsCaretRightFill size={12} />}
                                    sx={{
                                        '&.Mui-expanded': {
                                            maxHeight: '20px',
                                            minHeight: '20px',
                                        },
                                        padding: 0,
                                        margin: 0,
                                    }}
                                >
                                    <Typography className='p-0 m-0 text-sm' >Filter By Values</Typography>
                                </StyledAccordionSummary>
                                <AccordionDetails className='p-0' >
                                    <Box sx={{
                                        maxHeight: '200px',
                                        overflow: 'auto',
                                        marginTop: '12px'
                                    }} className="max-h-[200px] overflow-auto mt-3">
                                        {uniqueRowData.map((data, index) => (
                                            <Box
                                                key={data}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}
                                                className='flex flex-row justify-start items-center'>
                                                <Checkbox size='small' checked={checkedState[index]} onChange={() => handleCheckbox(index)} />
                                                <Typography
                                                    className='text-sm'
                                                    sx={{
                                                        fontSize: '14px',
                                                        lineHeight: '20px',
                                                        marginRight: '10px'
                                                    }}
                                                >
                                                    {data}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </ListItem>
                    </Menu>
                </div>
            </ClickAwayListener>

        </>
    );
}

export default DataGrid
