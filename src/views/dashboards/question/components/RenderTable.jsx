import React from 'react'

import Table from '@/components/materialTable/Table'
import { COLUMN } from '../services/QuestionInterface'
import RenderAction from './RenderAction'

const RenderTable = ({
  data = [],
  setData = () => {}
}) => {
  return (
    <Table
      data={data}
      options={{
        enableEditing: true
      }}
      renderRowActions={({ row }) => (
        <RenderAction
          data={row}
          onClickDelete={(id) => {
            setData(data.filter((item) => item.id!== id))
          }}
        />
      )}
      columns={COLUMN}
    />
  )
}

export default RenderTable