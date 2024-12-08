import React from 'react'

import { Grid, Typography } from '@mui/material'

import MatierQuestionList from './MatierQuestionList'

const MatierCard = ({
    data
}) => {
    return (
        <Grid item sm={6}>
            <div className='border border-gray-200 border-solid'>
                <div className='my-2'>
                    <Typography variant='h6' className='text-center'>
                        {data.label}
                    </Typography>
                </div>
                <div>
                    <MatierQuestionList />
                </div>
            </div>
        </Grid>
    )
}

export default MatierCard