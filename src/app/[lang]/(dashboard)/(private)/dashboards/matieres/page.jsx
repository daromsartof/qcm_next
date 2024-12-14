'use client'

import MatiereList from '@/views/dashboards/matieres'
// ** MUI Imports
import Grid from '@mui/material/Grid'

const MatieresPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <MatiereList />
      </Grid>
    </Grid>
  )
}

export default MatieresPage
