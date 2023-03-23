import { useEffect } from 'react';
import { Box, IconButton, List, ListItem, Typography } from '@mui/material';
// import { useFileStore } from '@/store/store';
import {FaTimes} from 'react-icons/fa'

const FilePreview = ({ fileData, setFile }) => {

    useEffect(()=> {
        console.log("File Data:-", fileData);
    })

    const handleRemove = () => {
        setFile(null)
    }

    return (
        <Box>
            <Box>
                {/* {fileData.fileList.map((f) => {
                    return (
                        <>
                            <List dense={true}>
                                <ListItem key={f.lastModified} >
                                    <Box key={f.name} >
                                        {f.name}
                                    </Box>
                                </ListItem>
                            </List>
                        </>
                    )
                })} */}
                
                <List dense={true}>
                    <ListItem key={fileData.lastModified} >
                        <Box key={fileData.name} >
                            {fileData.name}
                        </Box>
                        <IconButton onClick={()=>handleRemove()} >
                            <FaTimes size={24} />
                        </IconButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    )
}

export default FilePreview;