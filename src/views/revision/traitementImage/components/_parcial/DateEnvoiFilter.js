import React, { useRef } from 'react'
import { Button, Col, Label, Row } from 'reactstrap'
import Flatpickr from "react-flatpickr"
import { French } from "flatpickr/dist/l10n/fr.js"
import { useTraitementImageContext } from '../../contexts/TraitementImage.context'


const pickrOptions = {
  locale: {
    ...French,
    months: {
      ...French.months
    }
  },
  dateFormat: "d/m/Y",
  mode: "range"
}

const DateEnvoiFilter = () => {
  const {
    dateScan,
    filter: {
      date_envoi
    },
    setFilter
  } = useTraitementImageContext()
  const fp = useRef(null)

  const handleClickSingleDateScan = (value, id) => {
    const data_scane = value
    if (!fp?.current?.flatpickr) return
    setFilter(filter => {
      const date = filter.date_envoi
      if (date.value.length < 2) {
        date.value.push(data_scane)
        date.active.push(id)
      } else {
        date.value.length = 0
        date.active.length = 0
        date.value.push(data_scane)
        date.active.push(id)
      }
      fp.current.flatpickr.setDate(date.value, true)
      return {
        ...filter,
        date_envoi: {
          ...date,
          active: date.active.sort()
        }
      }
    })
  }
  return (
    <div>
      <Row className='mb-2'>
        <Col sm='12'>
          <Label className="form-label">Date d'envoie</Label>
          <div style={{ maxHeight: 500, overflowY: "scroll" }}>
            <div className="grid-container">
              {
                dateScan.map((value, key) => (
                  <div className="grid-item" key={key}>
                    <Button color={key >= date_envoi.active.at(0) && key <= date_envoi.active.at(-1) ? 'primary' : 'secondary'}
                      size='sm'
                      className='w-100'
                      outline
                      onClick={() => handleClickSingleDateScan(value, key)}
                    >{value}</Button>
                  </div>
                ))
              }
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="mb-1" xl="12" md="12" sm="12">
          <Label className="form-label">Période</Label>
          <Flatpickr
            ref={fp}
            name="date_ecr"
            options={pickrOptions}
            value={date_envoi.value}
            className={"form-control"}
            onChange={(date) => {
              setFilter((filter) => (
                {
                  ...filter,
                  date_envoi: {
                    ...date_envoi,
                    value: date
                  }
                }
              ))
            }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default DateEnvoiFilter