'use client'

// React Imports
import { useState } from 'react'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardActions, CardContent, Checkbox, Divider, Drawer, FormControlLabel, Grid, Typography } from '@mui/material'

import { Check } from 'react-feather'

import CustomTextField from '@/@core/components/mui/TextField'
import RenderMatiere from './components/RenderMatiere'
import RenderCategorie from './components/RenderCategorie'
import RenderResponseForm from './components/RenderResponseForm'
import RenderSource from './components/RenderSource'
import RenderImageInput from './components/RenderImageInput'

// ... (rest of your imports)

const validationSchema = yup.object().shape({
  title: yup.string().required('Le titre est requis'),
  matiereId: yup.string().required('La matière est requise'),
  sourceId: yup.string().required('La source est requise'),
  categorieId: yup.string().required('La catégorie est requise'),
  explaination: yup.string(),
  isMultichoise: yup.boolean(),

 /* responses: yup.object().test('responses', 'Au moins une réponse est requise', (value) => {
    return Object.keys(value).length > 0
  })*/
})

const DEFAULT_CHECK = false
const REPONSE_DEFAULT_CHECKED = false

const AddQuestion = ({ open, toggle }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [reponse, setReponse] = useState({
        0: {
          title: '',
          isCorrect: REPONSE_DEFAULT_CHECKED,
          explaination: ''
        }
  })
      
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      title: '',
      isMultichoise: DEFAULT_CHECK,
      categorieId: null,
      sourceId: null,
      matiereId: null,
      image: null,
      explaination: ''
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async (data) => {
    console.log(data)
    
return 0

    try {
      setIsLoading(true)
      await createQuestion({
        ...data,
        reponses: Object.values(data.responses)
      })
      setIsSuccess(true)
      handleClose()
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
      setIsLoading(false)
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
      sx={{ '& .MuiDrawer-paper': { width: { xs: 600, sm: 1000 } } }}
    >
      <div>
        <Card>
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Typography variant='body2' className='font-medium'>
                    Question
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        required
                        label='Titre'
                        placeholder='Quelle est ... '
                        error={Boolean(errors.title)}
                        helperText={errors.title?.message}
                      />
                    )}
                  />
                  <div className='mt-2'>
                    <Controller
                      name="isMultichoise"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <FormControlLabel
                          label='Choix multiple'
                          control={
                            <Checkbox
                              checked={value}
                              onChange={(e) => onChange(e.target.checked)}
                            />
                          }
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="matiereId"
                    control={control}
                    render={({ field }) => (
                      <RenderMatiere
                        {...field}
                        required
                        error={Boolean(errors.matiereId)}
                        helperText={errors.matiereId?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="explaination"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Explication'
                        rows={4}
                        multiline
                        type="textarea"
                        placeholder='Quelle est ... '
                        error={Boolean(errors.explaination)}
                        helperText={errors.explaination?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="sourceId"
                    control={control}
                    render={({ field }) => (
                      <RenderSource
                        {...field}
                        required
                        error={Boolean(errors.sourceId)}
                        helperText={errors.sourceId?.message}
                      />
                    )}
                  />
                  <Controller
                    name="categorieId"
                    control={control}
                    render={({ field }) => (
                      <RenderCategorie
                        {...field}
                        required
                        error={Boolean(errors.categorieId)}
                        helperText={errors.categorieId?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12}>
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <RenderImageInput
                        {...field}
                        error={Boolean(errors.image)}
                        helperText={errors.image?.message}
                      />
                    )}
                  />
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
                <Grid item xs={12} sm={12}>
                  <Controller
                    name="responses"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <RenderResponseForm
                        responses={value}
                        defaultChecked={REPONSE_DEFAULT_CHECKED}
                        setResponses={onChange}
                      />
                    )}
                  />
                  {errors.responses && (
                    <Typography color="error" variant="caption">
                      {errors.responses.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                disabled={isLoading}
                type='submit'
                variant='contained'
                color={(!isLoading && isSuccess) ? "success" : "primary"}
                className='mie-2'
              >
                {isLoading ? "En cours..." : (isSuccess ? (
                  <span>
                    <Check size={18} /> Enregistrement avec Success
                  </span>
                ) : "Sauvegarder")}
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>
    </Drawer>
  )
}

export default AddQuestion