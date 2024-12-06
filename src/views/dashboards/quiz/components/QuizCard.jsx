"use client"
import { Button, Card, CardContent, CardHeader, Divider } from '@mui/material'
import React from 'react'

const QuizCard = () => {

    const handleClickSetting = () => {
        console.log("handleClickSetting")
    }
    return (
        <Card>
            <CardHeader title="Quiz Title" />
            <CardContent>
                <div className='mb-4'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                </div>
                <Divider />
                <div className='my-2'>
                    <Button variant='contained' className='mr-2' endIcon={<i className='tabler-send' />}>
                        Prévisualiser
                    </Button>
                    <Button variant='contained' color='secondary' endIcon={<i className='tabler-trash' />} onClick={handleClickSetting}>
                        Paramètre
                    </Button>
                </div>
            </CardContent>

        </Card>
    )
}

export default QuizCard