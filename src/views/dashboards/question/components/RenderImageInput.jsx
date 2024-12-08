import React, { useState } from 'react'

import { Avatar, Box, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'

const RenderImageInput = () => {

    const [files, setFiles] = useState([])

    // Hooks
    const { getRootProps, getInputProps } = useDropzone({
      multiple: false,
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif']
      },
      onDrop: (acceptedFiles) => {
        setFiles(acceptedFiles.map((file) => Object.assign(file)))
      }
    })

    
    const img = files.map((file) => (
        <img key={file.name} alt={file.name} className='single-file-image max-h-60' src={URL.createObjectURL(file)} />
    ))

    
return (
        <div className='m-2 flex justify-center border-2 border-inherit border-dotted m-7 p-3 max-h-60 overflow-hidden'>
            <Box {...getRootProps({ className: 'dropzone' })} {...(files.length && { sx: { height: 450 } })}>
                <input {...getInputProps()} />
                {files.length ? (
                    img
                ) : (
                    <div className='flex items-center flex-col'>
                        <Avatar variant='rounded' className='bs-12 is-12 mbe-9'>
                            <i className='tabler-upload' />
                        </Avatar>
                        <Typography variant='h4' className='mbe-2.5'>
                            Drop files here or click to upload.
                        </Typography>
                        <Typography>
                            Drop files here or click{' '}
                            <a href='/' onClick={e => e.preventDefault()} className='text-textPrimary no-underline'>
                                browse
                            </a>{' '}
                            thorough your machine
                        </Typography>
                    </div>
                )}
            </Box>
        </div>
    )
}

export default RenderImageInput