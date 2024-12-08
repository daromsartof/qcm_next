"use client"
import React from 'react'

import { Button, Card, CardActions, CardContent, Divider, FormControlLabel, Grid, MenuItem, Switch, Typography } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'

import MatiereList from './components/MatiereList'

const AddQuiz = () => {
    return (
        <div>
            <div className='mb-2 flex justify-between'>
                <Typography variant="h3">
                    Ajouter un Quiz
                </Typography>
                <Button variant="contained" color='primary' onClick={() => window.history.back()}>
                    Retour
                </Button>
            </div>

            <Card>
                <form>
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item sm={3}>
                                <CustomTextField
                                    fullWidth
                                    required
                                    label='Titre'
                                    placeholder='Quelle est ... '
                                />
                            </Grid>
                           
                            <Grid item sm={3}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    required
                                    label='Catégorie'
                                >
                                    {
                                        [1, 2, 4].map((matiere, index) => (
                                            <MenuItem key={index} value={matiere}>{matiere}</MenuItem>
                                        ))
                                    }
                                </CustomTextField>
                            </Grid>
                            <Grid item sm={3}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    required
                                    label='Mode'
                                >
                                    {
                                        [1, 2, 4].map((matiere, index) => (
                                            <MenuItem key={index} value={matiere}>{matiere}</MenuItem>
                                        ))
                                    }
                                </CustomTextField>
                            </Grid>
                            <Grid item sm={3} className='flex justify-end items-end'>
                                <FormControlLabel control={<Switch defaultChecked />} label='Activer' />
                            </Grid>
                        </Grid>
                        <div className='my-3'>
                            <Divider />
                        </div>
                        <div className='w-full justify-center items-center'>
                            <Typography variant='subtitle1' className='text-center'>
                                Questions
                            </Typography>
                        </div>
                        <div className='my-3'>
                            <MatiereList />
                        </div>
                        <Grid container spacing={6}>
                            <Grid item sm={6}>

                            </Grid>
                            <Grid item sm={6}>

                            </Grid>
                        </Grid>
                    </CardContent>

                    <CardActions>
                        <Button type='submit' variant='contained' color={"primary"} className='mie-2'>
                            Enregistrer
                        </Button>
                    </CardActions>
                </form>
            </Card>


        </div>
    )
}

export default AddQuiz