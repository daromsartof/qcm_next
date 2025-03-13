import React, { useState, useEffect } from 'react'

import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Divider,
  IconButton,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

import { getAllQuestions } from '@/services/questionService'

const QuestionSelector = ({ matiereId, categoryId, onSave, quizQuestions, loading: savingLoading }) => {
  const [questions, setQuestions] = useState([])
  const [existingQuestions, setExistingQuestions] = useState([])
  const [newQuestions, setNewQuestions] = useState([])
  const [removedQuestions, setRemovedQuestions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    if (matiereId && categoryId) {
      fetchQuestions()
    }
  }, [matiereId, categoryId])

  useEffect(() => {
    if (quizQuestions && quizQuestions.length > 0) {
      // Trouver les questions existantes pour cette matière
      const existingQs = quizQuestions
        .filter(q => q.question && q.question.matiereId === matiereId)
        .map(q => q.questionId)
      
      setExistingQuestions(existingQs)
    } else {
      setExistingQuestions([])
    }
  }, [quizQuestions, matiereId])

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      const data = await getAllQuestions({ matiereId, categoryId })

      setQuestions(data)
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleAddQuestion = (questionId) => {
    if (!newQuestions.includes(questionId)) {
      setNewQuestions([...newQuestions, questionId])
    }
    
    // Si cette question était dans la liste des supprimées, la retirer
    if (removedQuestions.includes(questionId)) {
      setRemovedQuestions(removedQuestions.filter(id => id !== questionId))
    }
  }

  const handleRemoveQuestion = (questionId) => {
    // Si c'est une question existante, l'ajouter à la liste des supprimées
    if (existingQuestions.includes(questionId)) {
      setRemovedQuestions([...removedQuestions, questionId])
    }
    
    // Si c'est une nouvelle question, la retirer de la liste des ajoutées
    if (newQuestions.includes(questionId)) {
      setNewQuestions(newQuestions.filter(id => id !== questionId))
    }
  }

  const handleSave = () => {
    onSave(newQuestions, removedQuestions)
  }

  const getQuestionStatus = (questionId) => {
    if (existingQuestions.includes(questionId) && !removedQuestions.includes(questionId)) {
      return 'existing'
    }

    if (newQuestions.includes(questionId)) {
      return 'new'
    }

    if (removedQuestions.includes(questionId)) {
      return 'removed'
    }

    
return 'available'
  }

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const isQuestionSelected = (questionId) => {
    const status = getQuestionStatus(questionId)

    
return status === 'existing' || status === 'new'
  }

  return (
    <Box>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Toutes les questions" />
        <Tab label={`Questions sélectionnées (${existingQuestions.length - removedQuestions.length + newQuestions.length})`} />
      </Tabs>

      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        placeholder="Rechercher une question..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredQuestions.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          Aucune question trouvée pour cette matière et cette catégorie.
        </Alert>
      ) : (
        <Grid container spacing={2} sx={{ mt: 2, maxHeight: '400px', overflow: 'auto' }}>
          {filteredQuestions
            .filter(question => {
              if (tabValue === 0) return true // Toutes les questions
              
return isQuestionSelected(question.id) // Seulement les questions sélectionnées
            })
            .map((question) => {
              const status = getQuestionStatus(question.id)
              
              return (
                <Grid item xs={12} key={question.id}>
                  <Card 
                    variant="outlined"
                    sx={{ 
                      borderColor: 
                        status === 'new' ? 'success.main' : 
                        status === 'removed' ? 'error.main' : 
                        status === 'existing' ? 'primary.main' : 'divider'
                    }}
                  >
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1">
                          {question.title}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          {status === 'new' && (
                            <Chip size="small" label="Nouvelle" color="success" />
                          )}
                          {status === 'existing' && (
                            <Chip size="small" label="Existante" color="primary" />
                          )}
                          {status === 'removed' && (
                            <Chip size="small" label="À supprimer" color="error" />
                          )}
                        </Box>
                      </Box>
                      <Box>
                        {status === 'available' || status === 'removed' ? (
                          <IconButton 
                            color="success" 
                            onClick={() => handleAddQuestion(question.id)}
                          >
                            <AddIcon />
                          </IconButton>
                        ) : (
                          <IconButton 
                            color="error" 
                            onClick={() => handleRemoveQuestion(question.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
        </Grid>
      )}

      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Typography>
          {newQuestions.length > 0 && (
            <Chip 
              label={`${newQuestions.length} nouvelle(s) question(s)`} 
              color="success" 
              size="small"
              sx={{ mr: 1 }}
            />
          )}
          {removedQuestions.length > 0 && (
            <Chip 
              label={`${removedQuestions.length} question(s) à supprimer`} 
              color="error" 
              size="small"
            />
          )}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={newQuestions.length === 0 && removedQuestions.length === 0 || savingLoading}
          startIcon={savingLoading ? <CircularProgress size={20} /> : null}
        >
          {savingLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </Button>
      </Box>
    </Box>
  )
}

export default QuestionSelector
