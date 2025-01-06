import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button, Card, Typography } from '@mui/material'

import { FilterProvider } from '@/contexts/FilterContext'
import RenderTable from './components/RenderTable'
import { getAllQuestions } from '@/services/questionService'


import Filter from '../common/filter/Filter'
import AddQuestion from './AddQuestion'
import RenderShow from './components/RenderShow'

const Question = () => {
    const router = useRouter()
    const [questions, setQuestions] = useState([])

    const [open, setOpen] = useState(false)
   

    const toggle = () => {
        setOpen(!open)
    }

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
        <FilterProvider>


            <div>
                <div className='flex justify-between py-2'>
                    <Typography variant='h3'>Questions</Typography>
                    <Button variant="contained" onClick={toggle}>Ajouter</Button>
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
            <AddQuestion   
                open={open}
                toggle={toggle}
            />
            
        </FilterProvider>
    )
}

export default Question