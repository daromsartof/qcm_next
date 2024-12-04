import { Checkbox } from '@mui/material'
import React from 'react'

const RenderIsMulti = ({
    checked
}) => {
  return (
    <Checkbox defaultChecked={checked} name='basic-checked' />
  )
}

export default RenderIsMulti