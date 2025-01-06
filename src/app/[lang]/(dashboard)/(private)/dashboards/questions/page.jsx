'use client'

import Grid from '@mui/material/Grid'

import Question from '@/views/dashboards/question/Question'

const QuestionsPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Question />
      </Grid>
    </Grid>
  )
}

export default QuestionsPage