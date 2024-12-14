import React from 'react'
import IconButton from '@mui/material/IconButton'
import { Edit, Trash } from 'react-feather'

const RenderAction = ({ data, onClickDelete, onClickEdit }) => {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <IconButton onClick={() => onClickEdit(data.original)}>
        <Edit size={20} />
      </IconButton>
      <IconButton onClick={() => onClickDelete(data.id)} color="error">
        <Trash size={20} />
      </IconButton>
    </div>
  )
}

export default RenderAction
