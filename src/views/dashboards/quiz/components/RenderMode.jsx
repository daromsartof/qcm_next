import React from 'react'

import { MenuItem } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'
import { MODES } from '../services/QuizInterface'



const RenderMode = ({
  value,
  onChange
}) => {
  return (
    <CustomTextField select value={value} onChange={onChange} fullWidth required label='Mode'>
      {MODES.map((mode, index) => (
        <MenuItem key={index} value={mode.value}>
          {mode.label}
        </MenuItem>
      ))}
    </CustomTextField>
  )
}

export default RenderMode
