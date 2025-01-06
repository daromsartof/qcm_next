// ** React Imports
import React, { useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Services
import { createMatiere, updateMatiere } from '@/services/matiereService'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  name: yup.string().required('Le nom est requis')
})

const defaultValues = {
  name: ''
}

const SidebarAddMatiere = ({ open, toggle, onSuccess, selectedMatiere }) => {
  // ** Hooks
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (selectedMatiere) {
      setValue('name', selectedMatiere.title)
    }
  }, [selectedMatiere, setValue])

  const onSubmit = async (data) => {
    try {
      if (selectedMatiere) {
        await updateMatiere({ id: selectedMatiere.id, ...data })
      } else {
        await createMatiere(data)
      }

      toggle()
      reset()
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error('Error saving matiere:', error)
    }
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>{selectedMatiere ? 'Modifier' : 'Ajouter'} une Matière</Typography>
        <Button size='small' variant='outlined' color='secondary' onClick={handleClose}>
          Fermer
        </Button>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Nom'
                  onChange={onChange}
                  placeholder='Entrez le nom de la matière'
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              )}
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button size='large' variant='contained' onClick={handleSubmit(onSubmit)}>
              {selectedMatiere ? 'Modifier' : 'Enregistrer'}
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Annuler
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddMatiere
