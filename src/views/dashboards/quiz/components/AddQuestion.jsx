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
  StepLabel,
  CircularProgress
} from '@mui/material'

import { updateQuiz } from '@/services/quizService'
import QuestionSelector from './QuestionSelector'

const steps = ['Sélection de la matière', 'Gestion des questions']

const AddQuestion = ({ open, toggle, quiz, onSuccess }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedMatiere, setSelectedMatiere] = useState('')
  const [selectedMatiereData, setSelectedMatiereData] = useState(null)
  const [timeInMinutes, setTimeInMinutes] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Reset states when modal closes
  useEffect(() => {
    if (!open) {
      setActiveStep(0)
      setSelectedMatiere('')
      setSelectedMatiereData(null)
      setTimeInMinutes('')
      setError('')
    }
  }, [open])

  // When matiere is selected, find its data
  useEffect(() => {
    if (selectedMatiere && quiz) {
      const matiereData = quiz.quizMatieres.find(
        (m) => m.matiereId === selectedMatiere
      )

      setSelectedMatiereData(matiereData)
      
      if (matiereData && matiereData.time) {
        setTimeInMinutes(matiereData.time.toString())
      } else {
        setTimeInMinutes('12') // Default value
      }
    }
  }, [selectedMatiere, quiz])

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

  const handleSave = async (selectedQuestionIds, removedQuestionIds) => {
    try {
      setLoading(true)
      
      // Récupérer toutes les questions actuelles du quiz
      const currentQuestions = [...quiz.quizQuestions]
      
      // Créer le nouveau tableau de questions
      let updatedQuestions = [...currentQuestions]
      
      // Supprimer les questions qui doivent être retirées
      if (removedQuestionIds.length > 0) {
        updatedQuestions = updatedQuestions.filter(
          q => !removedQuestionIds.includes(q.questionId)
        )
      }
      
      // Formater les nouvelles questions à ajouter
      const highestOrder = updatedQuestions.reduce(
        (max, q) => Math.max(max, q.questionOrder || 0), 
        0 
      )
      
      const newQuestions = selectedQuestionIds.map((questionId, index) => ({
        questionId: questionId,
        questionOrder: highestOrder + index + 1,
        quizId: quiz.id
      }))
      
      // Ajouter les nouvelles questions qui ne sont pas déjà présentes
      const existingQuestionIds = updatedQuestions.map(q => q.questionId)

      const questionsToAdd = newQuestions.filter(
        q => !existingQuestionIds.includes(q.questionId)
      )
      
      updatedQuestions = [...updatedQuestions, ...questionsToAdd]
      
      // Mettre à jour le quiz
      await updateQuiz(quiz.id, {
        quizQuestions: updatedQuestions.map(q => ({
          questionId: q.questionId,
          order: q.questionOrder
        }))
      })
      
      if (onSuccess) onSuccess()
      toggle()
    } catch (error) {
      console.error('Error updating questions:', error)
      setError('Une erreur est survenue lors de la mise à jour des questions')
    } finally {
      setLoading(false)
    }
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
            quizQuestions={quiz?.quizQuestions || []}
            loading={loading}
          />
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={open} maxWidth="md" fullWidth onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h5">Gérer les questions</Typography>
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
