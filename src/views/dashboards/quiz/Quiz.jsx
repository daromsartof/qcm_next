"use client"
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'

import QuizCard from './components/QuizCard'
import QuizFilter from './components/QuizFilter'
import AddQuizDrawer from './components/AddQuizDrawer'


const Quiz = () => {
    const [open, setOpen] = useState(false)


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
            <CardContent>
                <Grid container spacing={5}>
                    <Grid item sm={4}>
                        <QuizCard />
                    </Grid>
                    <Grid item sm={4}>
                        <QuizCard />
                    </Grid>
                    <Grid item sm={4}>
                        <QuizCard />
                    </Grid>
                </Grid>
            </CardContent>
            <AddQuizDrawer 
                open={open}
                toggle={() => setOpen(!open)}
            />
        </div>
    )
}

export default Quiz