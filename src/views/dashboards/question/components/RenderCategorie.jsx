'use client'
import React, { useEffect, useState } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, MenuItem } from '@mui/material'

import { Plus } from 'react-feather'

import { Controller } from 'react-hook-form'

import CustomTextField from '@/@core/components/mui/TextField'
import { createCategorie, getAllCategories } from '@/services/categorieService'

const RenderCategorie = ({ control, errors }) => {
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleFetchCategories = async () => {
    try {
      setIsLoading(true)
      const categories = await getAllCategories()

      setCategories(categories)
    } catch (error) {
      console.error('Error fetching categoriess:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      await createCategorie({ name })
      handleClose()
      setName('')
      handleFetchCategories()
    } catch (error) {
      console.error('Error creating categorie:', error)
    }
  }

  useEffect(() => {
    handleFetchCategories()

    return () => {
      setCategories([])
    }
  }, [])

  return (
    <>
      <div className='flex items-end mt-3'>
        <Controller
          name='categorieId'
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              select
              fullWidth
              required
              disabled={isLoading}
              label='Catégories'
              error={Boolean(errors.categorieId)}
              helperText={errors.categorieId?.message}
            >
              {categories.map((categorie, index) => (
                <MenuItem key={index} value={categorie.id}>
                  {categorie.title}
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
        <DialogTitle id='form-dialog-title'>Catégories</DialogTitle>
        <DialogContent>
          <CustomTextField
            id='name'
            autoFocus
            fullWidth
            value={name}
            type='text'
            label='Nom du Catégories'
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

export default RenderCategorie
