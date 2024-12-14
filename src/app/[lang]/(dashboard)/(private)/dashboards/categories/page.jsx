'use client'

import CategoryList from '@/views/dashboards/categories'
// ** MUI Imports
import Grid from '@mui/material/Grid'

const CategoriesPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CategoryList />
      </Grid>
    </Grid>
  )
}

export default CategoriesPage
