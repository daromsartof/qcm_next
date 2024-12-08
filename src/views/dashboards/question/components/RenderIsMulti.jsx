import React from 'react'

import { Checkbox } from '@mui/material'

const RenderIsMulti = ({
    checked
}) => {
  return (
    <Checkbox defaultChecked={checked} name='basic-checked' />
  )
}

export default RenderIsMulti