'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'

// Third-party Imports
import { useDropzone } from 'react-dropzone'
// Components Imports
import CustomTextField from '@core/components/mui/TextField'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { Plus } from 'react-feather'
import CustomIconButton from '@/@core/components/mui/IconButton'
import { Checkbox, Fab, FormControlLabel } from '@mui/material'
import RenderCategorie from './components/RenderCategorie'
import RenderSource from './components/RenderSource'
import RenderMatiere from './components/RenderMatiere'
import RenderImageInput from './components/RenderImageInput'
import { useRouter } from 'next/navigation'

const AddQuestion = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isPasswordShown: false,
    confirmPassword: '',
    isConfirmPasswordShown: false,
    firstName: '',
    lastName: '',
    country: '',
    language: [],
    date: null,
    phoneNumber: ''
  })

  const handleClickShowPassword = () => setFormData(show => ({ ...show, isPasswordShown: !show.isPasswordShown }))

  const handleClickShowConfirmPassword = () =>
    setFormData(show => ({ ...show, isConfirmPasswordShown: !show.isConfirmPasswordShown }))

  const handleReset = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      isPasswordShown: false,
      confirmPassword: '',
      isConfirmPasswordShown: false,
      firstName: '',
      lastName: '',
      country: '',
      language: [],
      date: null,
      phoneNumber: ''
    })
  }

  return (
    <div>
      <div className='flex justify-between py-2'>
        <h1>Ajouter un question</h1>
        <Button variant="contained" onClick={() => window.history.back()}>Retoure</Button>
      </div>
      <Card>
        <Divider />
        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography variant='body2' className='font-medium'>
                  Question
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label='Titre'
                  placeholder='Quelle est ... '
                  value={formData.username}
                  onChange={e => setFormData({ ...formData, username: e.target.value })}
                />
                <div className='mt-2'>
                  <FormControlLabel label='Choix multiple' control={<Checkbox defaultChecked name='basic-checked' />} />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RenderMatiere
                  value={""}
                  onChange={() => console.log}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label='Explication'
                  rows={4}
                  multiline
                  type="textarea"
                  placeholder='Quelle est ... '
                  value={formData.username}
                  onChange={e => setFormData({ ...formData, username: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RenderSource
                  value={""}
                  onChange={() => console.log}
                />
                <RenderCategorie
                  value={""}
                  onChange={() => console.log}
                />
              </Grid>
              <Grid xs={12}>
                <RenderImageInput />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <div className='flex justify-between'>
                  <Typography variant='body2' className='font-medium'>
                    Réponse
                  </Typography>
                </div>

              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button type='submit' variant='contained' className='mie-2'>
              Submit
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  )
}
export default AddQuestion