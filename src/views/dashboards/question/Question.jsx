"use client"
import React, { useEffect, useState } from 'react'

import { Button, Card, CardContent, InputAdornment, TextField, Typography } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

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
    const [searchTerm, setSearchTerm] = useState('')

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
    
    const filteredQuestions = questions.filter(question =>
        question.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )

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
                            setSearchTerm('')
                        }}
                        onChangeSubject={(matiereId) => {
                            onChangeFilter('matiereId', matiereId)
                            setSearchTerm('')
                        }}
                        onChangeSource={(sourceId) => {
                            onChangeFilter('sourceId', sourceId)
                            setSearchTerm('')
                        }}
                    />
                </div>
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <TextField
                            fullWidth
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
                    </CardContent>
                </Card>
                <Card>
                    <RenderTable
                        loading={loading}
                        data={filteredQuestions}
                        setData={setQuestions}
                        onEdit={toggleEdit}
                    />
                </Card>
            </div>
            <RenderAddQuestion   
                open={open}
                onSuccess={handleFetchQuestion}
                toggle={toggle}
            />
            <RenderEditQuestion
                open={openEdit}
                toggle={toggleEdit}
                questionData={selectedQuestion}
                onSuccess={handleFetchQuestion}
            />
            
        </FilterProvider>
    )
}

export default Question