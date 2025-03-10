import React, { useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Switch,
  FormControlLabel,
  Divider,
  IconButton,
  Card,
  CardContent,
  Grid,
  Alert
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import PublicIcon from '@mui/icons-material/Public'

import AddQuestion from './AddQuestion'

const QuizSetting = ({ open, toggle, quiz, onUpdateQuiz, onDeleteQuiz }) => {
  const [openAddQuestion, setOpenAddQuestion] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const handleToggleStatus = async () => {
    try {
      setLoading(true)
      await onUpdateQuiz({
        id: quiz.id,
        is_active: !quiz.is_active
      })
    } catch (error) {
      console.error('Error updating quiz status:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePremium = async () => {
    try {
      setLoading(true)
      await onUpdateQuiz({
        id: quiz.id,
        is_prenium: quiz.is_prenium === 0 ? 1 : 0
      })
    } catch (error) {
      console.error('Error updating quiz premium status:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteQuiz = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce quiz ?')) {
      try {
        setLoading(true)
        await onDeleteQuiz(quiz.id)
        toggle()
      } catch (error) {
        console.error('Error deleting quiz:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <Dialog open={open} maxWidth={'md'} fullWidth={true} onClose={toggle}>
        <DialogTitle>
          <Typography variant="h5">Paramètres du Quiz</Typography>
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={3}>
            {/* Statut du Quiz */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Statut</Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          defaultChecked={quiz?.is_active}
                          onChange={handleToggleStatus}
                          disabled={loading}
                        />
                      }
                      label={quiz?.isActive ? 'Actif' : 'Inactif'}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Type d'accès */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">Type d&apos;accès</Typography>
                      {quiz?.is_prenium ? (
                        <WorkspacePremiumIcon color="warning" />
                      ) : (
                        <PublicIcon color="primary" />
                      )}
                    </Box>
                    <FormControlLabel
                      control={
                        <Switch
                          defaultChecked={quiz?.is_prenium === 1}

                         // checked={quiz?.is_prenium}
                          onChange={handleTogglePremium}
                          disabled={loading}
                        />
                      }
                      label={quiz?.is_prenium ? 'Premium' : 'Gratuit'}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Gestion des questions */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Questions ({quiz?.quizQuestions?.length || 0})
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setOpenAddQuestion(true)}
                    >
                      Ajouter des questions
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={handleDeleteQuiz}
                      disabled={loading}
                    >
                      Supprimer le quiz
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {quiz?.quizQuestions?.length === 0 && (
              <Grid item xs={12}>
                <Alert severity="warning">
                  Ce quiz ne contient aucune question. Veuillez en ajouter pour le rendre fonctionnel.
                </Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={toggle} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

      <AddQuestion
        open={openAddQuestion}
        toggle={() => setOpenAddQuestion(false)}
        quiz={quiz}
        matiere={quiz.quizMatieres}
        categorie={quiz.category}
        onSuccess={() => {
          setOpenAddQuestion(false)

          // Rafraîchir les données du quiz
          if (onUpdateQuiz) onUpdateQuiz(quiz.id)
        }}
      />
    </>
  )
}

export default QuizSetting