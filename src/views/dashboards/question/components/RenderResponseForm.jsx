import React, { useState } from 'react'

import { Button, Checkbox, Divider, FormControlLabel, Grid } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'

import RenderResponsePicker from './RenderResponsePicker'

const DEFAULT_CHECK = false

const RenderResponseForm = ({ defaultChecked, responses, setResponses }) => {
  const handleClickAdd = () => {
    setResponses(response => {
      const newResponses = { ...response }

      newResponses[Object.keys(response).length + 1] = {
        title: '',
        isCorrect: DEFAULT_CHECK,
        explaination: ''
      }

      return newResponses
    })
  }

  const handleChange = (key, name, value) => {
    setResponses(response => {
      const newResponses = { ...response }

      newResponses[key][name] = value

      return newResponses
    })
  }

  return (
    <div>
      {Object.keys(responses).map(key => (
        <div key={key} className='mb-5'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                required
                label='Titre'
                value={responses[key].title}
                placeholder='Réponse ... '
                onChange={e => handleChange(key, 'title', e.target.value)}
              />
            </Grid>
          </Grid>

          <div className='mt-2'>
            <FormControlLabel
              label='Réponse correct'
              control={
                <Checkbox
                  defaultChecked={responses[key].isCorrect}
                  name='basic-checked'
                  onChange={() => handleChange(key, 'isCorrect', !responses[key].isCorrect)}
                />
              }
            />
          </div>
          <div className='my-2'>
            <CustomTextField
              fullWidth
              label='Explication'
              rows={2}
              multiline
              type='textarea'
              placeholder="l'explication du réponse ... "
              value={responses[key].explaination}
              onChange={e => handleChange(key, 'explaination', e.target.value)}
            />
          </div>
          <Divider className='my-4' />
        </div>
      ))}
      <Button variant='contained' onClick={handleClickAdd} className='mt-4'>
        Ajouter une réponse
      </Button>
    </div>
  )
}

export default RenderResponseForm
