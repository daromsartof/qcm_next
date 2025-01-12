'use client'
import React, { useEffect, useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  MenuItem
} from '@mui/material'

import { Plus } from 'react-feather'

import { Controller } from 'react-hook-form'

import CustomTextField from '@/@core/components/mui/TextField'
import { createSource, getAllSources } from '@/services/sourceService'

const RenderSource = ({ control, errors }) => {
  const [open, setOpen] = useState(false)
  const [sources, setSources] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleFetchSources = async () => {
    try {
      setIsLoading(true)
      const matiere = await getAllSources()

      setSources(matiere)
    } catch (error) {
      console.error('Error fetching matieres:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      await createSource({ title: name })
      handleClose()
      setName('')
      handleFetchSources()
    } catch (error) {
      console.error('Error creating matiere:', error)
    }
  }

  useEffect(() => {
    handleFetchSources()

    return () => {
      setSources([])
    }
  }, [])

  return (
    <>
      <div className='flex items-end'>
        <Controller
          name='sourceId'
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              select
              required
              fullWidth
              disabled={isLoading}
              label='Sources'
              error={Boolean(errors.sourceId)}
              helperText={errors.sourceId?.message}
            >
              {sources.map((source, index) => (
                <MenuItem key={index} value={source.id}>
                  {source.title}
                </MenuItem>
              ))}
            </CustomTextField>
          )}
        />

        <div className='ms-3'>
          <Fab aria-label='edit' color='primary' size='small' onClick={handleClickOpen}>
            <Plus size={18} />
          </Fab>
        </div>
      </div>
      <Dialog open={open} maxWidth={'sm'} fullWidth={true} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Source</DialogTitle>
        <DialogContent>
          <CustomTextField
            id='name'
            autoFocus
            fullWidth
            value={name}
            type='text'
            label='Nom du source'
            onChange={e => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RenderSource
