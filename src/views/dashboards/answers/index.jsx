"use client"

import { useState, useEffect } from 'react'

import { Button, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'

import AnswerForm from './AnswerForm'
import { getAnswers } from '@/services/answerService'

export default function AnswerList() {
  const [answers, setAnswers] = useState([])
  const [openForm, setOpenForm] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const handleFetchReponse = async ({
        questionId,
        answerId
    } = {}) => {
    const res = await getAnswers({
        questionId,
        answerId
    })

    setAnswers(res)
  }

  useEffect(() => {
    handleFetchReponse()
  }, [])

  const handleSubmit = async (data) => {
    const url = selectedAnswer ? `/api/answers/${selectedAnswer.id}` : '/api/answers'
    const method = selectedAnswer ? 'PUT' : 'POST'

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      setOpenForm(false)
      setSelectedAnswer(null)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this answer?')) {
      await fetch(`/api/answers/${id}`, { method: 'DELETE' })
    }
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Answers
      </Typography>

      <Button variant="contained" onClick={() => setOpenForm(true)} sx={{ mb: 2 }}>
        Create New Answer
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Correct</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {answers.map((answer) => (
              <TableRow key={answer.id}>
                <TableCell>{answer.title}</TableCell>
                <TableCell>{answer.isCorrect ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    setSelectedAnswer(answer)
                    setOpenForm(true)
                  }}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(answer.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AnswerForm
        open={openForm}
        questionId={0}
        answer={selectedAnswer}
        onClose={() => {
          setOpenForm(false)
          setSelectedAnswer(null)
        }}
        onSubmit={handleSubmit}
      />
    </Container>
  )
}