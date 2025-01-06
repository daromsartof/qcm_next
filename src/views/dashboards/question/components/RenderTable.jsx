import React, { useState } from 'react'

import Table from '@/components/materialTable/Table'
import { COLUMN } from '../services/QuestionInterface'
import RenderAction from './RenderAction'
import RenderShow from './RenderShow'

const RenderTable = ({
  data = [],
  setData = () => { }
}) => {
  const [openModalShow, setOpenModalShow] = useState(false)
  const [dataShow, setDataShow] = useState({})

  const toggleModalShow = () => {
      setOpenModalShow(!openModalShow)
  }

  
return (
    <>
      <Table
        data={data}
        options={{
          enableEditing: true,
          enablePagination: true
        }}
        renderRowActions={({ row }) => (
          <RenderAction
            data={row}
            onClickDelete={(id) => {
              setData(data.filter((item) => item.id !== id))
            }}
            onClickShow={() => {
              setDataShow(row.original)
              toggleModalShow()
            }}
          />
        )}
        columns={COLUMN}
      />
      <RenderShow
        open={openModalShow}
        setOpen={setOpenModalShow}
        questionTitle={dataShow.title}
        responses={dataShow.answers}
        correctAnswer={dataShow.correctAnswer}
      />
    </>

  )
}

export default RenderTable