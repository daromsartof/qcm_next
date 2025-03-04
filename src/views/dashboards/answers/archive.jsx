
"use client";

import AnswerForm from "./AnswerForm";
import { useState, useEffect } from "react";
import { Edit, Delete } from "@mui/icons-material";
import { getQuestions } from "@/services/questionService";
import { getAnswers, deleteAnswer } from "@/services/answerService";
import {  Button, Container, Typography, Paper, Table, TableBody, TableCell,
   TableContainer,TableHead, TableRow, IconButton, TextField,} from "@mui/material";

export default function AnswerList() {
  const [answers, setAnswers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionId, setQuestionId] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
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
    if (questionId) {
      handleFetchReponse({ questionId });
    }
  }, [questionId]);

  const handleFetchReponse = async ({ questionId }) => {
    try {
      console.log("Récupération des réponses pour la question ID :", questionId);
      const res = await getAnswers({ questionId });
      console.log("Réponses récupérées :", res);
      setAnswers(res);
    } catch (error) {
      console.error("Erreur lors de la récupération des réponses:", error);
    }
  };

  // Filtrage indépendant avec API
  useEffect(() => {
    if (titleFilter.length < 2) return; // Ne cherche pas si moins de 2 caractères
  
    const fetchFilteredQuestions = async () => {
      try {
        console.log(" Recherche pour:", titleFilter);

        const response = await fetch(`/api/title?title=${encodeURIComponent(titleFilter)}`);
        
        if (!response.ok) {
          throw new Error(`Erreur API ${response.status}: ${await response.text()}`);
        }
  
        const filteredQuestions = await response.json();
        console.log(" Questions filtrées:", filteredQuestions);
  
        if (filteredQuestions.length > 0) {
          setQuestionId(filteredQuestions[0].id);
          handleFetchReponse({ questionId: filteredQuestions[0].id });
        } else {
          setQuestionId("");
          setAnswers([]);
        }
      } catch (error) {
        console.error(" Erreur lors de la récupération des questions filtrées:", error);
      }
    };
  
    fetchFilteredQuestions();
  }, [titleFilter]);
//  

  const handleSubmit = async (data) => {
    try {
      const url = selectedAnswer
        ? `/api/answers/${selectedAnswer.id}`
        : "/api/answers";
      const method = selectedAnswer ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        handleFetchReponse({ questionId: data.questionId });
        setOpenForm(false);
        setSelectedAnswer(null);
      } else {
        console.error(" Erreur lors de la soumission de la réponse");
      }
    } catch (error) {
      console.error(" Erreur lors de la soumission de la réponse:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this answer?")) {
      try {
        await deleteAnswer(id);
        setAnswers((prevAnswers) =>
          prevAnswers.filter((answer) => answer.id !== id)
        );
      } catch (error) {
        console.error(" Erreur lors de la suppression de la réponse:", error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Answers
      </Typography>

      <TextField
        label="Filter par numéro de question"
        variant="outlined"
        fullWidth
        value={questionId}
        onChange={(e) => setQuestionId(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Filter par titre de question"
        variant="outlined"
        fullWidth
        value={titleFilter}
        onChange={(e) => setTitleFilter(e.target.value)}
        sx={{ mb: 2 }}
      />

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
                <TableCell>{answer.isCorrect ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedAnswer(answer);
                      setOpenForm(true);
                    }}
                  >
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
        questionId={questionId || null}
        answer={selectedAnswer}
        onClose={() => {
          setOpenForm(false);
          setSelectedAnswer(null);
        }}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
