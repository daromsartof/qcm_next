"use client"
import { Button, Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RenderTable from './components/RenderTable'
import { getAllQuestions } from '@/services/quesrionService'
import { useRouter } from 'next/navigation'
import Filter from '../common/filter/Filter'

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
                <Typography variant='h3'>Questions</Typography>
                <Button variant="contained" onClick={() => router.push('questions/add')}>Ajouter</Button>
            </div>
            <div className='mb-5'>
            <Filter />
            </div>
       
            <Card>
                <RenderTable 
                    data={questions}
                    setData={setQuestions}
                />
            </Card>
        </div>
    )
}

export default Question