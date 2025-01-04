import React from 'react'

import { MenuItem } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'
import { MODES } from '../services/QuizInterface'



const RenderMode = ({
  value,
  onChange,
  defaultValue
}) => {
  return (
    <CustomTextField select defaultValue={defaultValue} value={value} onChange={onChange} fullWidth required label='Mode'>
      {MODES.map((mode, index) => (
        <MenuItem key={index} value={mode}>
          {mode.label}
        </MenuItem>
      ))}
    </CustomTextField>
  )
}

export default RenderMode
