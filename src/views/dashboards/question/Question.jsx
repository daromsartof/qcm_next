"use client"
import { Button, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RenderTable from './components/RenderTable'
import { getAllQuestions } from '@/services/quesrionService'
import { useRouter } from 'next/navigation'

const Question = () => {
    const router = useRouter()
    const [questions, setQuestions] = useState([])
    const handleFetchQuestion = async () => {
        const questions = await getAllQuestions()
        console.log(questions)
        setQuestions(questions)
    }
    useEffect(() => {
        handleFetchQuestion()
      return () => {
        setQuestions([])
      }
    }, [])
    
    return (
        <div>
            <div className='flex justify-between py-2'>
                <h1>Questions</h1>
                <Button variant="contained" onClick={() => router.push('questions/add')}>Ajouter</Button>
            </div>
            <Card>
                <RenderTable 
                    data={questions}
                />
            </Card>
        </div>
    )
}

export default Question