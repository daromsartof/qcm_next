import CustomTextField from '@/@core/components/mui/TextField'
import { Fab, MenuItem } from '@mui/material'
import React from 'react'
import { Plus } from 'react-feather'

const RenderCategorie = ({
    value,
    onChange
}) => {
    return (
        <div className='flex items-end mt-4'>
            <CustomTextField
                select
                fullWidth
                label='Categories'
                value={value}
                onChange={onChange}
            >
                <MenuItem value=''>Select Country</MenuItem>
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
            </CustomTextField>
            <div className='ms-3'>
                <Fab aria-label='edit' color='primary' size='small'>
                    <Plus size={18} />
                </Fab>
            </div>
        </div>
    )
}

export default RenderCategorie