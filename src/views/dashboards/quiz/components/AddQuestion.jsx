'use client'
import React, { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Card,
  CardContent,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material'
import QuestionSelector from './QuestionSelector' // Vous devrez créer ce composant

const steps = ['Sélection de la matière', 'Sélection des questions']

const AddQuestion = ({ open, toggle, quiz, onSuccess }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedMatiere, setSelectedMatiere] = useState('')
  const [timeInMinutes, setTimeInMinutes] = useState('')
  const [error, setError] = useState('')

  // Reset states when modal closes
  useEffect(() => {
    if (!open) {
      setActiveStep(0)
      setSelectedMatiere('')
      setTimeInMinutes('')
      setError('')
    }
  }, [open])

  const handleNext = () => {
    if (activeStep === 0) {
      if (!selectedMatiere) {
        setError('Veuillez sélectionner une matière')
        return
      }

      setError('')
    }
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleClose = () => {
    toggle()
  }

  const handleSave = (selectedQuestions) => {
    console.log({
      matiereId: selectedMatiere,
      time: parseInt(timeInMinutes),
      questions: selectedQuestions
    })
  }

  const renderStepContent = (quiz) => {
    switch (activeStep) {
      case 0:
        return (
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Matière</InputLabel>
                    <Select
                      value={selectedMatiere}
                      label="Matière"
                      onChange={(e) => setSelectedMatiere(e.target.value)}
                    >
                      {quiz?.quizMatieres?.map((matiere) => (
                        <MenuItem key={matiere.id} value={matiere.matiereId}>
                          {matiere.matiere.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Temps (en minutes)"
                    type="number"
                    value={timeInMinutes}
                    onChange={(e) => setTimeInMinutes(e.target.value)}
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <Alert severity="error">{error}</Alert>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        )
      case 1:
        return (
          <QuestionSelector
            matiereId={selectedMatiere}
            categoryId={quiz?.categoryId}
            onSave={handleSave}
          />
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={open} maxWidth="md" fullWidth onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h5">Ajouter des questions</Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 4 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {renderStepContent(quiz)}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        {activeStep > 0 && (
          <Button onClick={handleBack}>
            Retour
          </Button>
        )}
        {activeStep === 0 && (
          <Button onClick={handleNext} variant="contained" color="primary">
            Suivant
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default AddQuestion
