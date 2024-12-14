'use client'


import SourceList from '@/views/dashboards/sources'
import Grid from '@mui/material/Grid'

const SourcePage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SourceList />
      </Grid>
    </Grid>
  )
}

export default SourcePage
