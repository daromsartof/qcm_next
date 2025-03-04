// components/AnswerForm.jsx :
import { useState, useEffect } from 'react';
import { getQuestions } from '@/services/questionService';
import { createAnswer, updateAnswer } from '@/services/answerService';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
   Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

export default function AnswerForm({ open, answer, questionId, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    answerFileUrl: '',
    isCorrect: false,
    questionId: questionId || ''
  });
  
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getQuestions();
        setQuestions(res);
      } catch (error) {
        console.error("Erreur lors de la récupération des questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (answer) {
      setFormData({
        title: answer.title,
        description: answer.description || '',
        answerFileUrl: answer.answerFileUrl || '',
        isCorrect: answer.isCorrect,
        questionId: answer.questionId || ''
      });
    }
  }, [answer]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.questionId) {
        alert("Veuillez sélectionner une question avant de soumettre.");
        return;
    }

    try {
        let response;
        if (answer) {
            // Si une réponse existe déjà, dia mis à jour
            response = await updateAnswer(answer.id, formData);
        } else {
            // Sinon, on crée une nouvelle réponse
            response = await createAnswer(formData);
        }
        
        onSubmit(response);
        onClose();
    } catch (error) {
        console.error("Erreur lors de l'ajout ou la modification de la réponse:", error.message);
    }
};

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{answer ? 'Edit Answer' : 'Create Answer'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="question-select-label">Sélectionner une question</InputLabel>
            <Select
              labelId="question-select-label"
              value={formData.questionId}
              onChange={(e) => setFormData({ ...formData, questionId: e.target.value })}
            >
              {questions.map((q) => (
                <MenuItem key={q.id} value={q.id}>{q.title}</MenuItem>
              ))}
            </Select>
          </FormControl>

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
  );
}
