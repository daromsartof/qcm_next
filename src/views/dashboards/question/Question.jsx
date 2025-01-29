import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button, Card, Typography } from '@mui/material'

import { FilterProvider } from '@/contexts/FilterContext'
import RenderTable from './components/RenderTable'
import { getAllQuestions } from '@/services/questionService'

import RenderAddQuestion from './components/RenderAddQuestion'
import QuizFilter from '../quiz/components/QuizFilter'


const Question = () => {
    const router = useRouter()
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
   

    const toggle = () => {
        setOpen(!open)
    }

    const handleFetchQuestion = async () => {
        setLoading(true)
        const questions = await getAllQuestions()

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
                <QuizFilter />
                </div>
                <Card>
                    <RenderTable
                        loading={loading}
                        data={questions}
                        setData={setQuestions}
                    />
                </Card>
            </div>
            <RenderAddQuestion   
                open={open}
                toggle={toggle}
            />
            
        </FilterProvider>
    )
}

export default Question