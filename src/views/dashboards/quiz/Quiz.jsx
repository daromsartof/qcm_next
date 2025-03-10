"use client"
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button, Card, CardContent, CardHeader, Grid, Typography, Pagination, Box } from '@mui/material'

import QuizCard from './components/QuizCard'
import QuizFilter from './components/QuizFilter'
import AddQuizDrawer from './components/AddQuizDrawer'
import { deleteQuiz, getAllQuizzes, updateQuiz } from '@/services/quizService'
import RenderPreviewQuiz from './components/RenderPreviewQuiz'
import QuizSetting from './components/QuizSetting'

const Quiz = () => {
    const [open, setOpen] = useState(false)
    const [quizzes, setQuizzes] = useState([])
    const [openModalPrev, setOpenModalPrev] = useState(false)
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [openSetting, setOpenSetting] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const itemsPerPage = 6

    const toggleModalPrev = () => setOpenModalPrev(!openModalPrev)

    const handleClickPreview = (quiz) => {
        setSelectedQuiz(quiz)
        toggleModalPrev()
    }

    const handleFetchQuizzes = async () => {
        try {
            const quizzes = await getAllQuizzes()

            setQuizzes(quizzes)
            setTotalPages(Math.ceil(quizzes.length / itemsPerPage))
        } catch (error) {
            console.error('Error fetching matieres:', error)
        }
    }

    const handlePageChange = (event, value) => {
        setPage(value)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const getCurrentPageQuizzes = () => {
        const startIndex = (page - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage

        
return quizzes.slice(startIndex, endIndex)
    }

    const onSuccessAddQuiz = (quiz) => {
         handleFetchQuizzes()
    }

    const handleUpdateQuiz = async (updatedQuiz) => {
        try {
            await updateQuiz(updatedQuiz.id, updatedQuiz)
            handleFetchQuizzes()
        } catch (error) {
            console.error('Error updating quiz:', error)
        }
    }

    const handleClickSetting = (quiz) => {
        setSelectedQuiz(quiz)
        setOpenSetting(true)
    }

    const handleDeleteQuiz = async (quizId) => {
        try {
            await deleteQuiz(quizId)
            handleFetchQuizzes()

            // Adjust current page if necessary after deletion
            const newTotalPages = Math.ceil((quizzes.length - 1) / itemsPerPage)

            if (page > newTotalPages) {
                setPage(Math.max(1, newTotalPages))
            }
        } catch (error) {
            console.error('Error deleting quiz:', error)
        }
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
            <QuizFilter 
                showFilter={{
                    category: true,
                    source: false,
                    subject: false
                }}
            />
            <CardContent className='px-0'>
                <Grid container spacing={6}>
                    {
                        getCurrentPageQuizzes().map((quiz) => (
                            <Grid item sm={4} key={quiz.id}>
                                <QuizCard 
                                    quiz={quiz} 
                                    onClickPreview={() => handleClickPreview(quiz)} 
                                    onCLickSetting={() => handleClickSetting(quiz)} 
                                    onDeleteQuiz={() => handleDeleteQuiz(quiz.id)} 
                                />
                            </Grid>
                        ))
                    }
                </Grid>
                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination 
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            showFirstButton
                            showLastButton
                        />
                    </Box>
                )}
            </CardContent>
            <RenderPreviewQuiz
                quiz={selectedQuiz}
                open={openModalPrev}
                handleClose={toggleModalPrev}
            />
            <AddQuizDrawer 
                open={open}
                onSuccess={onSuccessAddQuiz}
                toggle={() => setOpen(!open)}
            />
            <QuizSetting 
                open={openSetting}
                toggle={() => setOpenSetting(!openSetting)}
                quiz={selectedQuiz}
                onUpdateQuiz={handleUpdateQuiz}
                onDeleteQuiz={handleDeleteQuiz}
            />
        </div>
    )
}

export default Quiz