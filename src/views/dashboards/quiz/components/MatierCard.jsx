import React from 'react'

import { Button, Grid, Typography } from '@mui/material'

import { Plus } from 'react-feather'

import MatierQuestionList from './MatierQuestionList'


const MatierCard = ({ data }) => {
  return (
    <Grid item sm={6}>
      <div className='border border-gray-200 border-solid'>
        <div className='my-2'>
          <Grid container>
            <Grid item xs={12} sm={10} className='text-center'>
              <Typography variant='h6' className='text-center'>
                {data.title}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2} className='text-center'>
              <Button>
                <Plus size={12} />
              </Button>
            </Grid>
          </Grid>
        </div>
        <div>
          <MatierQuestionList />
        </div>
      </div>
    </Grid>
  )
}

export default MatierCard
