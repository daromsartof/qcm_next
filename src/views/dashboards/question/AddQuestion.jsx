'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'


// Components Imports
import { Checkbox, FormControlLabel } from '@mui/material'

import { Check } from 'react-feather'

import CustomTextField from '@core/components/mui/TextField'

// Styled Component Imports
import RenderCategorie from './components/RenderCategorie'
import RenderSource from './components/RenderSource'
import RenderMatiere from './components/RenderMatiere'
import RenderImageInput from './components/RenderImageInput'
import { createQuestion } from '@/services/quesrionService'
import RenderResponsePicker from './components/RenderResponsePicker'
import RenderResponseForm from './components/RenderResponseForm'


const DEFAULT_CHECK = true
const REPONSE_DEFAULT_CHECKED = false

const AddQuestion = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [responses, setResponses] = useState({
    0: {
      title: "",
      isCorrect: REPONSE_DEFAULT_CHECKED,
      explaination: ""
    }
  })

  const [formData, setFormData] = useState({
    name: "",
    isMultichoise: DEFAULT_CHECK,
    categorieId: null,
    sourceId: null,
    matiereId: null,
    image: null,
  })

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      await createQuestion({
        ...formData,
        reponses: Object.values(responses).map((response) => response)
      })
      setIsSuccess(true)
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
      setIsLoading(false)
    }
  }

  
return (
    <div>
      <div className='flex justify-between py-2'>
        <Typography variant='h3'>Ajouter un question</Typography>
        <Button variant="contained" onClick={() => window.history.back()}>Retoure</Button>
      </div>
      <Card>
        <Divider />
        <form onSubmit={handleSubmit}>
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
                  required
                  label='Titre'
                  placeholder='Quelle est ... '
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <div className='mt-2'>
                  <FormControlLabel
                    label='Choix multiple'
                    control={<Checkbox
                      defaultChecked={DEFAULT_CHECK}
                      name='basic-checked'
                      onChange={(e) => setFormData((formData) => ({
                        ...formData,
                        isMultichoise: !formData.isMultichoise
                      }))}
                    />}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RenderMatiere
                  value={formData.matiereId}
                  required
                  onChange={(e) => handleInputChange("matiereId", e.target.value)}
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
                  value={formData.explaination}
                  onChange={(e) => handleInputChange("explaination", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RenderSource
                  value={formData.sourceId}
                  required
                  onChange={(e) => handleInputChange("sourceId", e.target.value)}
                />
                <RenderCategorie
                  value={formData.categorieId}
                  required
                  onChange={(e) => handleInputChange("categorieId", e.target.value)}
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

              <Grid item xs={12} sm={12}>
                <RenderResponseForm
                  responses={responses}
                  defaultChecked={REPONSE_DEFAULT_CHECKED}
                  setResponses={setResponses}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button disabled={isLoading} type='submit' variant='contained' color={(!isLoading && isSuccess) ? "success" : "primary"} className='mie-2'>
              {
                isLoading ? "En cours..." : (isSuccess ? (
                  <span>
                    <Check size={18} /> Enregistrement avec Success
                  </span>

                ) : "Sauvegarder")
              }
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  )
}

export default AddQuestion