import React from 'react'

import { Button } from '@mui/material'
import { Eye, Trash , Edit } from 'react-feather'
import { toast } from 'react-toastify'

import { deleteQuestion } from '@/services/questionService'
import CustomIconButton from '@/@core/components/mui/IconButton'

const RenderAction = ({
    data,
    onClickDelete = () => {}
}) => {
    const handleDelete = async () => {
        try {
            const response = await deleteQuestion(data.id)

            onClickDelete(response.id)
            toast.success('Question supprimée avec succès!')
        } catch (error) {
            console.log(error)
            toast.error('Erreur lors de la suppression de la question!')
        }
    }

    
return (
        <div>
            <CustomIconButton aria-label='capture screenshot' color='success' variant='contained' className='mr-2'>
                <Edit size={12} />
            </CustomIconButton>
            <CustomIconButton aria-label='capture screenshot' color='primary' variant='contained' className='mr-2'>
                <Eye size={12} />
            </CustomIconButton>
            <CustomIconButton aria-label='capture screenshot' color='error' variant='contained' onClick={handleDelete}>
                <Trash size={12} />
            </CustomIconButton>
            
        </div>
    )
}

export default RenderAction