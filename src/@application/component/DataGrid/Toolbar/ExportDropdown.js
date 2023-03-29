import React, { useState } from 'react'
import {
    Button,
    Menu,
    MenuItem,
    Typography,
    Divider,
    ListItem,
    Tooltip,
} from '@mui/material'
import {
    BsFileEarmarkExcel,
    BsFileEarmarkPdf,
    BsFileEarmarkSpreadsheet,
} from 'react-icons/bs'
import { FaAngleDown, FaUpload } from 'react-icons/fa'
import { exportToCsv, exportToPdf, exportToXlsx } from '../utils/exportUtils'
import IconButton from '@mui/material/IconButton';


const ExportDropdown = (props) => {
    const { gridElement, selectedGridElement, isSelected, title, btnText } =
        props

    const [exportAnchor, setExportAnchor] = useState(null)

    const exportOpen = Boolean(exportAnchor)

    const [exporting, setExporting] = useState()

    const handleOpenExport = (event) => {
        setExportAnchor(event.currentTarget)
    }
    const handleCloseExport = () => {
        setExportAnchor(null)
    }

    return (
        <div>
        <Tooltip title='Export' placement="top">
            <IconButton
                id="export-dropdown-button"
                aria-controls={exportOpen ? 'export-dropdown-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={exportOpen ? 'true' : undefined}
                className="text-app-primary mr-4 ml-4"
                variant="contained"
                size="small"
                onClick={handleOpenExport}
                endIcon={<FaAngleDown size={12} />}
            >
                <FaUpload size={16} />
                {/* {exporting ? 'Exporting' : btnText} */}
            </IconButton>
        </Tooltip>
            

            <Menu
                id="export-dropdown-menu"
                MenuListProps={{
                    'aria-labelledby': 'export-dropdown-button',
                    className: 'w-[160px]',
                }}
                anchorEl={exportAnchor}
                open={exportOpen}
                onClose={handleCloseExport}
            >
                {isSelected && (
                    <ListItem>
                        <Typography className="font-bold">
                            Export All
                        </Typography>
                    </ListItem>
                )}
                <MenuItem
                    onClick={async () => {
                        setExporting(true)
                        await exportToCsv(gridElement, `${title}.csv`)
                        setExporting(false)
                        handleCloseExport()
                    }}
                    disabled={exporting ? true : false}
                >
                    <BsFileEarmarkSpreadsheet size={18} />
                    <Typography>&nbsp;&nbsp;.csv</Typography>
                </MenuItem>
                <MenuItem
                    onClick={async () => {
                        setExporting(true)
                        await exportToXlsx(gridElement, `${title}.xlsx`)
                        setExporting(false)
                        handleCloseExport()
                    }}
                    disabled={exporting ? true : false}
                >
                    <BsFileEarmarkExcel size={18} />
                    <Typography>&nbsp;&nbsp;.xlsx</Typography>
                </MenuItem>
                <MenuItem
                    onClick={async () => {
                        setExporting(true)
                        await exportToPdf(gridElement, `${title}.pdf`)
                        setExporting(false)
                        handleCloseExport()
                    }}
                    disabled={exporting ? true : false}
                >
                    <BsFileEarmarkPdf size={18} />
                    <Typography>&nbsp;&nbsp;.pdf</Typography>
                </MenuItem>
                {isSelected && (
                    <>
                        <Divider />
                        <Typography sx={{padding: '0px 15px'}}>
                            Export Selected
                        </Typography>
                        <MenuItem
                            onClick={async () => {
                                setExporting(true)
                                await exportToCsv(
                                    selectedGridElement,
                                    `${title}.csv`
                                )
                                setExporting(false)
                                handleCloseExport()
                            }}
                            disabled={exporting ? true : false}
                        >
                            <BsFileEarmarkSpreadsheet size={18} />
                            <Typography>&nbsp;&nbsp;.csv</Typography>
                        </MenuItem>
                        <MenuItem
                            onClick={async () => {
                                setExporting(true)
                                await exportToXlsx(
                                    selectedGridElement,
                                    `${title}.xlsx`
                                )
                                setExporting(false)
                                handleCloseExport()
                            }}
                            disabled={exporting ? true : false}
                        >
                            <BsFileEarmarkExcel size={18} />
                            <Typography>&nbsp;&nbsp;.xlsx</Typography>
                        </MenuItem>
                        <MenuItem
                            onClick={async () => {
                                setExporting(true)
                                await exportToPdf(
                                    selectedGridElement,
                                    `${title}.pdf`
                                )
                                setExporting(false)
                                handleCloseExport()
                            }}
                            disabled={exporting ? true : false}
                        >
                            <BsFileEarmarkPdf size={18} />
                            <Typography>&nbsp;&nbsp;.pdf</Typography>
                        </MenuItem>
                    </>
                )}
            </Menu>
        </div>
    )
}

export default ExportDropdown
