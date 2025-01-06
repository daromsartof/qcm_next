// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, List, ListItem, ListItemText } from '@mui/material'

import RenderCategorie from './RenderCategorie'
import RenderMatiere from '@/components/RenderMatiere'
import CustomTextField from '@/@core/components/mui/TextField'
import { getAllQuestions } from '@/services/questionService'
import AddQuestionMatier from './AddQuestionMatier'
import RenderMode from './RenderMode'
import { MODES } from '../services/QuizInterface'
import { createQuiz } from '@/services/quizService'

const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3, 4),
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
    name: yup.string().required('Le nom est requis')
})

const defaultValues = {
    name: ''
}

const AddQuizDrawer = ({ open, toggle, onSuccess }) => {
    // ** Hooks
    const {
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const [openModalQuestion, setOpenModalQuestion] = useState(false)
    const [categorie, setCategorie] = useState(null)
    const [questions, setQuestions] = useState([])
    const [quizQuestions, setQuizQuestions] = useState([])
    const [matiere, setMatiere] = useState({})

    const handleOpenModalQuestion = () => {
        setOpenModalQuestion(true)
    }

    const handleCloseModalQuestion = () => {
        setOpenModalQuestion(false)
    }


    const onSubmit = async (data) => {
        console.log(data)
        
        try {
            const quizQuestionsData = []
            const quizMatieres = []

            quizQuestions.forEach((matiere, i) => {    
                quizMatieres.push({
                    "order": i,
                    "matierId": matiere.id
                })
                matiere.questions.forEach((question, i) => {
                    quizQuestionsData.push({
                        "order": i,
                        "questionId": question.id
                    })
                })
            })

            const quiz = await createQuiz({
                    title: data.name,
                    categoryId: data.categorie,
                    quizQuestions: quizQuestionsData,
                   quizMatieres
            })
           
            toggle()
            reset()

             if (quiz)  {
                onSuccess(quiz)
             }
        } catch (error) {
            console.error('Error saving matiere:', error)
        }
    }

    const handleChangeMatiere = async (matiere) => {
       // console.log(value, categorie)
        const questions = await getAllQuestions({
            categoryId: categorie, 
            matiereId: matiere.id
        })


       // console.log(questions)
        setQuestions(questions)
        setValue('subject', matiere.id)
        setMatiere(matiere)
        handleOpenModalQuestion()
    }

    const handleSaveQuestion = async (questions, matiere) => {
        setQuizQuestions((quizQuestions) => [...quizQuestions, {
            ...matiere,
            questions
        }])

    }

    const handleClose = () => {
        toggle()
        reset()
    }

    return (
        <Drawer
            open={open}
            anchor='right'
            variant='temporary'
            onClose={handleClose}
            ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { minWidth: { xs: 300, sm: 1000 } } }}
        >
            <Header>
                <Typography variant='h6'>{'Ajouter'}</Typography>
                <Button size='small' variant='outlined' color='secondary' onClick={handleClose}>
                    Fermer
                </Button>
            </Header>
            <Box sx={{ p: 5 }}>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={6}>
                        <Grid item sm={6}>
                            <FormControl fullWidth sx={{ mb: 6 }}>
                                <Controller
                                    name='name'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <CustomTextField
                                            autoFocus
                                            fullWidth
                                            required
                                            value={value}
                                            type='text'
                                            label='Nom'
                                            onChange={onChange}
                                            error={Boolean(errors.name)}
                                            helperText={errors.name?.message}
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl fullWidth sx={{ mb: 6 }}>
                                <Controller
                                    name='categorie'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value } }) => (
                                        <RenderCategorie
                                            value={value}
                                            label='Categorie'
                                            onChange={(element) => {
                                                setValue('categorie', element.target.value)
                                                setCategorie(element.target.value)
                                            }}
                                            placeholder='Entrez le nom de la matière'
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl fullWidth sx={{ mb: 6 }}>
                                <Controller
                                    name='subject'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value } }) => (
                                        <RenderMatiere
                                            value={value}
                                            withAdd={false}
                                            onChange={(element) => handleChangeMatiere(element.target.value)}
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl fullWidth sx={{ mb: 6 }}>
                                <Controller
                                    name='mode'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value } }) => (
                                        <RenderMode value={value} onChange={(element) => {
                                                setValue('mode', element.target.value)
                                            }} defaultValue={MODES.at(0)} />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <div className='py-4'>
                        {
                            quizQuestions.map((quizQuestion, index) => (
                                <Accordion key={index}>
                                <AccordionSummary id='panel-header-1' aria-controls='panel-content-1'>
                                <Typography>{quizQuestion.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                <List>
                                    {
                                        quizQuestion.questions.map((question, index) => (
                                            <ListItem key={index}>
                                                <ListItemText primary={`${'Q' + (index + 1) + ' : '} ${question.title}`} />
                                            </ListItem>
                                        ))
                                    }
                                </List>
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                            ))
                        }
                    </div>
                    <AddQuestionMatier
                        questions={questions}
                        open={openModalQuestion}
                        matiere={matiere}
                        toggle={handleCloseModalQuestion}
                        handleSaveQuestion={handleSaveQuestion}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button size='large' variant='contained' type='submit'>
                            {'Enregistrer'}
                        </Button>
                        <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                            Annuler
                        </Button>
                    </Box>
                </form>
            </Box>
        </Drawer>
    )
}

export default AddQuizDrawer
