import React from 'react'
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Grid,
  Typography,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  Box,
  Chip
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CategoryIcon from '@mui/icons-material/Category'
import SchoolIcon from '@mui/icons-material/School'

const RenderPreviewQuiz = ({ open, quiz, handleClose }) => {
  return (
    <Dialog open={open} maxWidth={'md'} fullWidth={true} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>
        <Typography variant="h5" component="div" gutterBottom>
          {quiz.title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2, overflow: 'auto' }} >
          <Chip
            icon={<CategoryIcon />}
            label={quiz.category?.title}
            color="primary"
            variant="outlined"
          />
          {quiz.quizMatieres?.map((matiere) => (
            <Chip
              key={matiere.id}
              icon={<SchoolIcon />}
              label={`${matiere.matiere?.title} - ${matiere.time} min`}
              color="secondary"
              variant="outlined"
            />
          ))}
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={3}>
          {quiz.quizQuestions?.map((quizQuestion, index) => (
            <Grid item xs={12} key={quizQuestion.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Question {index + 1}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {quizQuestion.question.title}
                  </Typography>
                  
                  <RadioGroup
                    aria-label={`question-${quizQuestion.id}`}
                    name={`question-${quizQuestion.id}`}
                  >
                    {quizQuestion.question.answers.map((answer) => (
                      <FormControlLabel
                        key={answer.id}
                        value={answer.id.toString()}
                        control={<Radio />}
                        label={answer.title}
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            color: answer.isCorrect ? 'success.main' : 'inherit'
                          }
                        }}
                      />
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={handleClose} variant="contained" color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RenderPreviewQuiz