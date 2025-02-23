// components/AnswerForm.tsx
import { useState, useEffect } from 'react'

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel } from '@mui/material'

export default function AnswerForm({ open, answer, questionId, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    answerFileUrl: '',
    isCorrect: false,
    questionId: questionId
  })

  useEffect(() => {
    if (answer) {
      setFormData({
        title: answer.title,
        description: answer.description || '',
        answerFileUrl: answer.answerFileUrl || '',
        isCorrect: answer.isCorrect,
        questionId: answer.questionId
      })
    }
  }, [answer])

  const handleSubmit = async (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{answer ? 'Edit Answer' : 'Create Answer'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="File URL"
            fullWidth
            value={formData.answerFileUrl}
            onChange={(e) => setFormData({ ...formData, answerFileUrl: e.target.value })}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isCorrect}
                onChange={(e) => setFormData({ ...formData, isCorrect: e.target.checked })}
              />
            }
            label="Correct Answer"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {answer ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}