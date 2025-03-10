"use client"
import React from 'react'

import moment from 'moment'
import { Button, Card, CardContent, CardHeader, Divider, Chip, Box } from '@mui/material'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import PublicIcon from '@mui/icons-material/Public'
import CircleIcon from '@mui/icons-material/Circle'

const QuizCard = ({ quiz, onClickPreview, onCLickSetting }) => {
    return (
        <Card>
            <CardHeader 
                title={quiz.title}
                action={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                            size="small"
                            icon={<CircleIcon sx={{ fontSize: '0.8rem' }} />}
                            label={quiz.is_active ? 'Actif' : 'Inactif'}
                            color={quiz.is_active ? 'success' : 'default'}
                            variant="outlined"
                        />
                        <Chip
                            size="small"
                            icon={quiz.is_prenium ? <WorkspacePremiumIcon /> : <PublicIcon />}
                            label={quiz.is_prenium ? 'Premium' : 'Gratuit'}
                            color={quiz.is_prenium ? 'warning' : 'info'}
                            variant="outlined"
                        />
                    </Box>
                }
            />
            <CardContent>
                <div className='mb-4'>
                    <p>
                        <strong>Categorie : </strong>
                        <span>{quiz.category.title}</span>
                    </p>
                    <p>
                        <strong>Date de creation : </strong>
                        <span>{moment(quiz.createdAt).format('DD/MM/YYYY')}</span>
                    </p>
                    <p>
                        <strong>Nombre de questions : </strong>
                        <span>{quiz.quizQuestions.length}</span>
                    </p>
                    <p>
                        <strong>Nombre de matieres : </strong>
                        <span>{quiz.quizMatieres.length}</span>
                    </p>
                </div>
                <Divider />
                <div className='my-2'>
                    <Button variant='contained' className='mr-2' endIcon={<i className='tabler-send' />} onClick={onClickPreview}>
                        Prévisualiser
                    </Button>
                    <Button variant='contained' color='secondary' endIcon={<i className='tabler-settings' />} onClick={onCLickSetting}>
                        Paramètre
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default QuizCard