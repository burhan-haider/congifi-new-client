import React, {useState, useEffect} from 'react'
import FilePreview from './FilePreview'
import { Box, Divider, Grid, Typography } from '@mui/material'
// import uploadIcon from '../../../public/assets/upload.svg';
import { FaUpload } from 'react-icons/fa'
// import { useFileStore } from '@/store/store';

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const FilePicker = (props) => {

    const {
        fileData,
        setFile,
        fileConfig
    } = props

    const [inDropZone, setInDropZone] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault()
        e.stopPropagation()

        setInDropZone(true)
    }


    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()

        setInDropZone(false)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()

        e.dataTransfer.dropEffect = "copy"
        setInDropZone(true)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()

        let file = [...e.dataTransfer.files][0];

        if (file) {
            if(file.type !== 'text/csv'){
                alert("Please Upload a CSV File!")
                setInDropZone(false)
            }
            else{
                if (file.size > 125829120) {
                    alert("File Too Large! File should be less than 120mb.")
                    setInDropZone(false)
                }
                else{
                    setFile(file)
                    setInDropZone(false)
                }
                
            } 
        }
    }

    const handleFileChange = (e) => {
        let file = e.target.files[0]

        console.log("File Type:-", file)
        if (file) {
            if(file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
                alert("Please Upload a xlsx File!")
                setInDropZone(false)
            }
            else{
                if (file.size > formatBytes(fileConfig.maxSize, 0)) {
                    alert("File Too Large! File should be less than 120mb.")
                    setInDropZone(false)
                }
                else{
                    setFile(file)
                    setInDropZone(false)
                }
                
            } 
        }
    }

    return(
        <Grid container className="min-w-[700px] border border-solid border-black rounded" >
            <Grid item xs={5} >
                <Box className="flex flex-col px-5 py-5">
                    
                    <Box 
                        className={`flex flex-col justify-center items-center border-2 border-dashed border-[#052A4F] rounded p-5 ${inDropZone===true&&'bg-teal-50'} py-10`}
                        component={'div'}
                        onDragEnter={(e) => handleDragEnter(e)}
                        onDragOver={(e) => handleDragOver(e)}
                        onDragLeave={(e) => handleDragLeave(e)}
                        onDrop={(e) => handleDrop(e)}
                    >
                        <FaUpload size={50} color='black' />
                        <input 
                            type="file" 
                            id='fileSelect'
                            name='fileSelect'
                            className='hidden'
                            accept={fileConfig.allowedFileTypes === 'ALL' ? 'false' : fileConfig.allowedFileTypes}
                            value={''}
                            onChange={(e)=>handleFileChange(e)}
                        />
                        <label htmlFor='fileSelect' className='rounded-full px-3 py-1 my-3 text-sm text-white bg-[#052A4F] font-bold hover:cursor-pointer' >Browse A CSV File</label>
                        <h3 className='font-bold' >or drag & drop your file here</h3>
                    </Box>
                    <Box className="mt-5" >
                        <Typography className='text-lg font-gSans' ><strong>Max File Size:-</strong> {fileConfig.maxSize} mb</Typography>
                        <Typography className='text-lg font-gSans' ><strong>Allowed File Types:-</strong> {fileConfig.allowedFileTypes}</Typography>
                        <Typography className='text-lg font-gSans' ><strong>Blocked File Types:-</strong> {fileConfig.blockedFileTypes}</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={1} >
                <Divider className="h-full" orientation="vertical" flexItem />
            </Grid>
            <Grid item xs={6} >
                <Box className="pl-5 pt-5" >
                    <Typography className="text-lg font-bold" >List Of Uploaded Files:-</Typography>
                    {fileData !== null && (
                        <FilePreview fileData={fileData} setFile={setFile} />
                    )}
                </Box>
            </Grid>
        </Grid>
        
    )
}

export default FilePicker;