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
import { createMatiere, getAllMatieres } from '@/services/matiereService'

const RenderMatiere =  ({ control, errors }) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [matiers, setMatiers] = useState([])
  const [name, setName] = useState('')
  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleFetchMatiers = async () => {
    try {
      setIsLoading(true)
      const matiere = await getAllMatieres()

      setMatiers(matiere)
    } catch (error) {
      console.error('Error fetching matieres:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      await createMatiere({ name })
      handleClose()
      setName('')
      handleFetchMatiers()
    } catch (error) {
      console.error('Error creating matiere:', error)
    }
  }

  useEffect(() => {
    handleFetchMatiers()

    return () => {
      setMatiers([])
    }
  }, [])

  return (
    <>
      <div className='flex items-end'>
        <Controller
          name='matiereId'
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              select
              fullWidth
              disabled={isLoading}
              required
              label='Matières'
              error={Boolean(errors.matiereId)}
              helperText={errors.matiereId?.message}
            >
              {matiers.map((matiere, index) => (
                <MenuItem key={index} value={matiere.id}>
                  {matiere.title}
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
        <DialogTitle id='form-dialog-title'>Matières</DialogTitle>
        <DialogContent>
          <CustomTextField
            id='name'
            autoFocus
            fullWidth
            value={name}
            type='text'
            label='Nom du matière'
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

export default RenderMatiere
