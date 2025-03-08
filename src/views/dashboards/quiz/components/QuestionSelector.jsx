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
  InputAdornment
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { getAllQuestions } from '@/services/questionService'

const QuestionSelector = ({ matiereId, categoryId, onSave }) => {
  const [questions, setQuestions] = useState([])
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchQuestions()
  }, [matiereId, categoryId])

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

  const handleToggleQuestion = (questionId) => {
    setSelectedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId)
      }
      return [...prev, questionId]
    })
  }

  const handleSave = () => {
    onSave(selectedQuestions)
  }

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box>
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

      <Grid container spacing={2} sx={{ mt: 2, maxHeight: '400px', overflow: 'auto' }}>
        {filteredQuestions.map((question) => (
          <Grid item xs={12} key={question.id}>
            <Card variant="outlined">
              <CardContent>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedQuestions.includes(question.id)}
                      onChange={() => handleToggleQuestion(question.id)}
                    />
                  }
                  label={
                    <Typography variant="body1">
                      {question.title}
                    </Typography>
                  }
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={selectedQuestions.length === 0}
        >
          Ajouter ({selectedQuestions.length}) questions
        </Button>
      </Box>
    </Box>
  )
}

export default QuestionSelector
