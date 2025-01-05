"use client"
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'

import QuizCard from './components/QuizCard'
import QuizFilter from './components/QuizFilter'
import AddQuizDrawer from './components/AddQuizDrawer'
import { getAllQuizzes } from '@/services/quizService'


const Quiz = () => {
    const [open, setOpen] = useState(false)
    const [quizzes, setQuizzes] = useState([])

    const handleFetchQuizzes = async () => {
        try {
            const quizzes = await getAllQuizzes()

            setQuizzes(quizzes)
        } catch (error) {
            console.error('Error fetching matieres:', error)
        }
    }

    const onSuccessAddQuiz = (quiz) => {
         handleFetchQuizzes()
    }

    useEffect(() => {
        handleFetchQuizzes()
    }, [])
    
    return (
        <div>
            <div className='mb-2 flex justify-between'>
                <Typography variant="h3">
                    Quiz
                </Typography>
                <Button variant="contained" color='primary' onClick={() => setOpen(true)}>
                    Ajouter
                </Button>
            </div>
            <QuizFilter />
            <CardContent className='px-0'>
                <Grid container spacing={6}>
                    {
                        quizzes.map((quiz) => (
                            <Grid item sm={4} key={quiz.id}>
                                <QuizCard quiz={quiz} />
                            </Grid>
                        ))
                    }
                </Grid>
            </CardContent>
            <AddQuizDrawer 
                open={open}
                onSuccess={onSuccessAddQuiz}
                toggle={() => setOpen(!open)}
            />
        </div>
    )
}

export default Quiz