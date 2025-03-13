"use client"
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button, Card, CardContent, CardHeader, Grid, Typography, Pagination, Box, CircularProgress, Skeleton } from '@mui/material'

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
    const [categoryId, setCategoryId] = useState(null)
    const [totalPages, setTotalPages] = useState(1)
    const [status, setStatus] = useState(null)
    const [premium, setPremium] = useState(null)
    const itemsPerPage = 6
    const [loading, setLoading] = useState(true)

    const toggleModalPrev = () => setOpenModalPrev(!openModalPrev)

    const handleClickPreview = (quiz) => {
        setSelectedQuiz(quiz)
        toggleModalPrev()
    }

    const handleFetchQuizzes = async (categoryId, status, premium) => {
        try {
            setLoading(true)
            const quizzes = await getAllQuizzes(categoryId, status, premium)

            setQuizzes(quizzes)
            setTotalPages(Math.ceil(quizzes.length / itemsPerPage))
        } catch (error) {
            console.error('Error fetching quizzes:', error)
        } finally {
            setLoading(false)
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

    const handleChangeCategory = (categorie) => {
        setCategoryId(categorie)
        handleFetchQuizzes(categorie, status, premium)
    }

    const handleChangeStatus = (status) => {
        setStatus(status)
        handleFetchQuizzes(categoryId, status, premium)
    }

    const handleChangePremium = (premium) => {
        setPremium(premium)
        handleFetchQuizzes(categoryId, status, premium)
    }

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
                onChangeCategory={handleChangeCategory}
                onChangeStatus={handleChangeStatus}
                onChangePremium={handleChangePremium}
                showFilter={{
                    category: true,
                    source: false,
                    status: true,
                    premium: true,
                    subject: false
                }}
            />
            <CardContent className='px-0'>
                {loading ? (
                    <Grid container spacing={6}>
                        {[...Array(6)].map((_, index) => (
                            <Grid item sm={4} key={index}>
                                <Card>
                                    <CardHeader
                                        title={<Skeleton variant="text" width={200} />}
                                        action={
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Skeleton variant="rounded" width={80} height={24} />
                                                <Skeleton variant="rounded" width={80} height={24} />
                                            </Box>
                                        }
                                    />
                                    <CardContent>
                                        <Skeleton variant="text" width="60%" />
                                        <Skeleton variant="text" width="40%" />
                                        <Skeleton variant="text" width="50%" />
                                        <Skeleton variant="text" width="45%" />
                                        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                                            <Skeleton variant="rounded" width={120} height={36} />
                                            <Skeleton variant="rounded" width={120} height={36} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <>
                        <Grid container spacing={6}>
                            {getCurrentPageQuizzes().map((quiz) => (
                                <Grid item sm={4} key={quiz.id}>
                                    <QuizCard
                                        quiz={quiz}
                                        onClickPreview={() => handleClickPreview(quiz)}
                                        onCLickSetting={() => handleClickSetting(quiz)}
                                        onDeleteQuiz={() => handleDeleteQuiz(quiz.id)}
                                    />
                                </Grid>
                            ))}
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
                    </>
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
                onSuccess={handleFetchQuizzes}
                onUpdateQuiz={handleUpdateQuiz}
                onDeleteQuiz={handleDeleteQuiz}
            />
        </div>
    )
}

export default Quiz