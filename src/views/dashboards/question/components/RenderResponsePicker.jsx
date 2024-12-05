// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { useDropzone } from 'react-dropzone'

const RenderResponsePicker = () => {
    // States
    const [files, setFiles] = useState([])

    // Hooks
    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif']
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file)))
        }
    })

    return (
        <Box {...getRootProps({ className: 'dropzone' })} >
            <input {...getInputProps()} />
            <div className='flex items-center  flex-row'>
                <div>
                    <Avatar variant='rounded'>
                        <i className='tabler-upload' />
                    </Avatar>
                </div>

                <div className='ml-2'>
                    {
                        files.length > 0 && (
                            <Typography variant='h6'>{files[0].name}</Typography>
                        )
                    }
                </div>

            </div>
        </Box>
    )
}

export default RenderResponsePicker