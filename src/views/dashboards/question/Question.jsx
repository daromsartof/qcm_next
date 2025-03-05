"use client"
import React, { useEffect, useState } from 'react'

import { Button, Card, Typography } from '@mui/material'

import { FilterProvider } from '@/contexts/FilterContext'
import RenderTable from './components/RenderTable'
import { getAllQuestions } from '@/services/questionService'

import RenderAddQuestion from './components/RenderAddQuestion'
import QuizFilter from '../quiz/components/QuizFilter'
import RenderEditQuestion from './components/RenderEditQuestion'


const Question = () => {
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState(null)
   

    const toggle = () => {
        setOpen(!open)
    }

    const toggleEdit = (question = null) => {
        setSelectedQuestion(question)
        setOpenEdit(!openEdit)
    }

    const handleFetchQuestion = async () => {
        setLoading(true)
        const questions = await getAllQuestions()

        setQuestions(questions)
        setLoading(false)
    }

    const onChangeFilter = async (key, value) => { 
        if (!value) return 
        setLoading(true)

        const questions = await getAllQuestions({
             [key] : value
        })

        setQuestions(questions)
        setLoading(false)
    }
    

    useEffect(() => {
        handleFetchQuestion()


        return () => {
            setQuestions([])
        }
    }, [])

    return (
        <FilterProvider>


            <div>
                <div className='flex justify-between py-2'>
                    <Typography variant='h3'>Questions</Typography>
                    <Button variant="contained" onClick={toggle}>Ajouter</Button>
                </div>
                <div className='mb-1'>
                <QuizFilter 
                    onChangeCategory={(categorie) => {
                        onChangeFilter('categoryId', categorie)
                    }}
                    onChangeSubject={(matiereId) => {
                        onChangeFilter('matiereId', matiereId)
                    }}
                    onChangeSource={(sourceId) => {
                        onChangeFilter('sourceId', sourceId)
                    }}
                />
                </div>
                <Card>
                    <RenderTable
                        loading={loading}
                        data={questions}
                        setData={setQuestions}
                        onEdit={toggleEdit}
                    />
                </Card>
            </div>
            <RenderAddQuestion   
                open={open}
                toggle={toggle}
            />
            <RenderEditQuestion
                open={openEdit}
                toggle={toggleEdit}
                questionData={selectedQuestion}
            />
            
        </FilterProvider>
    )
}

export default Question