'use client'

import { useState , useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  Grid,
  Typography
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Check } from 'react-feather'

import CustomTextField from '@/@core/components/mui/TextField'
import RenderMatiere from './RenderMatiere'
import RenderSource from './RenderSource'
import RenderCategorie from './RenderCategorie'
import RenderImageInput from './RenderImageInput'
import RenderResponseForm from './RenderResponseForm'
import { createQuestion, updateQuestion } from '@/services/questionService'

// ... (rest of your imports)

const validationSchema = yup.object().shape({
  title: yup.string().required('Le titre est requis'),
  matiereId: yup.string().required('La matière est requise'),
  sourceId: yup.string().required('La source est requise'),
  categorieId: yup.string().required('La catégorie est requise'),
  explaination: yup.string(),
  isMultichoise: yup.boolean()
})

const DEFAULT_CHECK = false
const REPONSE_DEFAULT_CHECKED = false

const RenderEditQuestion = ({ open, toggle, questionData, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [image, setImage] = useState(null)
  const [reponseImage, setReponseImage] = useState(null)

  const [reponses, setReponses] = useState({
    0: {
      title: '',
      isCorrect: REPONSE_DEFAULT_CHECKED,
      explaination: ''
    }
  })

  console.log(" reponses ", reponses)
  const onChangeReponses = () => {}

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      title: '',
      isMultichoise: DEFAULT_CHECK,
      categorieId: '',
      sourceId: '',
      matiereId: '',
      image: null,
      explaination: ''
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async data => {
     try {
      setIsLoading(true)
      await updateQuestion(data.id, {
        title: data.title,
        isMultichoise: data.isMultichoise ? 1 : 0,
        categoryId: data.categorieId,
        sourceId: data.sourceId,
        matiereId: data.matiereId,
        content: data.explaination,
        image,
        reponseImage,
        reponses: Object.values(reponses).map(rep => ({
          id: rep.id,
          title: rep.title,
          isCorrect: rep.isCorrect ? 1 : 0,
          explaination: rep.explaination
  
        }))
      })
      setIsSuccess(true)
      handleClose()
      onSuccess()
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
  
  console.log(questionData)
  
  useEffect(() => {
    if (questionData) {
      // Initialiser le formulaire avec les données existantes
      setValue('title', questionData.title)
      setValue('id', questionData.id)
      setValue('isMultichoise', questionData.isMultichoise === 1)
      setValue('categorieId', questionData.categoryId)
      setValue('sourceId', questionData.sourceId)
      setValue('matiereId', questionData.matiereId)
      setValue('explaination', questionData.content)
      setImage(questionData.fileUrl)
      setReponseImage(questionData.response_file_url)

      const formattedResponses = questionData.answers.reduce((acc, rep, index) => {
        acc[index] = {
          id: rep.id,
          title: rep.title,
          isCorrect: rep.isCorrect ? 1 : 0,
          explaination: rep.explaination
        }
        
return acc
      }, {})

      setReponses(formattedResponses)
      
    }
  }, [questionData, setValue])
  
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
          <form onSubmit={handleSubmit(onSubmit)} onReset={handleClose}>
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Typography variant='body2' className='font-medium'>
                    Question
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='title'
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
                      name='isMultichoise'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <FormControlLabel
                          label='Choix multiple'
                          control={<Checkbox checked={value} onChange={e => onChange(e.target.checked)} />}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RenderMatiere control={control} errors={errors} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='explaination'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Explication'
                        rows={4}
                        multiline
                        type='textarea'
                        placeholder='Quelle est ... '
                        error={Boolean(errors.explaination)}
                        helperText={errors.explaination?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RenderSource control={control} errors={errors} />
                  <RenderCategorie control={control} errors={errors} />
                </Grid>
                <Grid xs={12}>
                  <RenderImageInput control={control} image={image} onChange={setImage} errors={errors} />
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
                <Grid xs={12}>
                  <RenderImageInput image={reponseImage} control={control} onChange={setReponseImage} errors={errors} />
                </Grid>
                <Grid item xs={12} sm={12}>
                  
                  <RenderResponseForm
                    responses={reponses}
                    defaultChecked={REPONSE_DEFAULT_CHECKED}
                    setResponses={setReponses}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                disabled={isLoading}
                type='submit'
                variant='contained'
                color={!isLoading && isSuccess ? 'success' : 'primary'}
                className='mie-2'
              >
                {isLoading ? (
                  'En cours...'
                ) : isSuccess ? (
                  <span>
                    <Check size={18} /> Enregistrement avec Success
                  </span>
                ) : (
                  'Sauvegarder'
                )}
              </Button>
               <Button
                disabled={isLoading}
                type='reset'
                variant='outline'
                color={!isLoading && isSuccess ? 'success' : 'primary'}
                className='mie-2'
              >
                Annuler
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>
    </Drawer>
  )
}

export default RenderEditQuestion
