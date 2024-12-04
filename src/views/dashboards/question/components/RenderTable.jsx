import Table from '@/components/materialTable/Table'
import React from 'react'
import { COLUMN } from '../services/QuestionInterface'

const RenderTable = ({
    data = []
}) => {
  return (
    <Table 
        data={data}
        columns={COLUMN}
    />
  )
}

export default RenderTable