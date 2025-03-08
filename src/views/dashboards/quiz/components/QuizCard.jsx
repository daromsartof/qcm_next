"use client"
import React from 'react'

import moment from 'moment'
import { Button, Card, CardContent, CardHeader, Divider } from '@mui/material'

const QuizCard = ({ quiz, onClickPreview, onCLickSetting }) => {

    
return (
        <Card>
            <CardHeader title={quiz.title} />
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