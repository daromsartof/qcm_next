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
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid } from '@mui/material'
import RenderCategorie from './RenderCategorie'
import RenderMatiere from '@/components/RenderMatiere'
import CustomTextField from '@/@core/components/mui/TextField'
import { getAllQuestions } from '@/services/questionService'
import AddQuestionMatier from './AddQuestionMatier'

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
    const [categorie, setCategorie] = useState()
    const [questions, setQuestions] = useState([])
    const [matiere, setMatiere] = useState([])
    const handleOpenModalQuestion = () => {
        setOpenModalQuestion(true)
    }

    const handleCloseModalQuestion = () => {
        setOpenModalQuestion(false)
    }


    const onSubmit = async (data) => {
        try {

            toggle()
            reset()
            if (onSuccess) onSuccess()
        } catch (error) {
            console.error('Error saving matiere:', error)
        }
    }

    const handleChangeMatiere = async (value) => {
       // console.log(value, categorie)
        const questions = await getAllQuestions({
            categoryId: categorie, 
            matiereId: value
        })
       // console.log(questions)
        setQuestions(questions)
        setValue('subject', value)
        handleOpenModalQuestion()
    }

    const handleSaveQuestion = async () => {
        console.log('save')

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
          //  sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 1000 } } }}
        >
            <Header>
                <Typography variant='h6'>{'Ajouter'}</Typography>
                <Button size='small' variant='outlined' color='secondary' onClick={handleClose}>
                    Fermer
                </Button>
            </Header>
            <Box sx={{ p: 5 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                    render={({ field: { value, onChange } }) => (
                                        <RenderCategorie
                                            value={value}
                                            label='Categorie'
                                            onChange={(element) => {
                                                onChange(element)
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
                    </Grid>
                    <div className='py-4'>
                    <Accordion>
                        <AccordionSummary id='panel-header-1' aria-controls='panel-content-1'>
                        <Typography>Accordion 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Wafer sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert biscuit.
                            Topping soufflé tart sweet croissant.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary id='panel-header-2' aria-controls='panel-content-2'>
                        <Typography>Accordion 2</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Sugar plum sesame snaps caramels. Cake pie tart fruitcake sesame snaps donut cupcake macaroon. Gingerbread
                            pudding cheesecake pie ice cream.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary id='panel-header-3' aria-controls='panel-content-3'>
                        <Typography>Accordion 3</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Gingerbread lemon drops bear claw gummi bears bonbon wafer jujubes tiramisu. Jelly pie cake. Sweet roll
                            dessert sweet pastry powder.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    </div>
                    <AddQuestionMatier
                        questions={questions}
                        open={openModalQuestion}
                        toggle={handleCloseModalQuestion}
                        handleSaveQuestion={handleSaveQuestion}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button size='large' variant='contained' onClick={handleSubmit(onSubmit)}>
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
