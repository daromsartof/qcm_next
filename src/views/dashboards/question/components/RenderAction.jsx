import CustomIconButton from '@/@core/components/mui/IconButton'
import { Button } from '@mui/material'
import React from 'react'
import { Eye, Trash } from 'react-feather'
import { Edit } from 'react-feather'

const RenderAction = () => {
    return (
        <div>
            <CustomIconButton aria-label='capture screenshot' color='success' variant='contained' className='mr-2'>
                <Edit size={18} />
            </CustomIconButton>
            <CustomIconButton aria-label='capture screenshot' color='primary' variant='contained' className='mr-2'>
                <Eye size={18} />
            </CustomIconButton>
            <CustomIconButton aria-label='capture screenshot' color='error' variant='contained'>
                <Trash size={18} />
            </CustomIconButton>
            
        </div>
    )
}

export default RenderAction