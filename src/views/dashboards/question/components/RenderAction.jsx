import CustomIconButton from '@/@core/components/mui/IconButton'
import { Button } from '@mui/material'
import React from 'react'
import { Trash } from 'react-feather'
import { Edit } from 'react-feather'

const RenderAction = () => {
    return (
        <div>
            <CustomIconButton aria-label='capture screenshot' color='success' variant='contained' className='mr-4'>
                <Edit size={18} />
            </CustomIconButton>
            <CustomIconButton aria-label='capture screenshot' color='error' variant='contained'>
                <Trash size={18} />
            </CustomIconButton>
        </div>
    )
}

export default RenderAction