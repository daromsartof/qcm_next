'use client'


import Grid from '@mui/material/Grid'

import SourceList from '@/views/dashboards/sources'

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
