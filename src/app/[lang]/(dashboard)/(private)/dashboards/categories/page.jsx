'use client'

import Grid from '@mui/material/Grid'

import CategoryList from '@/views/dashboards/categories'

// ** MUI Imports

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
