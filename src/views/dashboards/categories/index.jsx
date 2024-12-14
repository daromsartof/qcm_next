// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'

// ** Custom Components
import Table from '@/components/materialTable/Table'
import RenderAction from './RenderAction'
import AddCategoryDrawer from './AddCategoryDrawer'

// ** Services
import { getAllCategories, deleteCategorie } from '@/services/categorieService'

const COLUMNS = [
  {
    accessorKey: 'title',
    header: 'Nom',
    size: 200
  },
  {
    accessorKey: 'createdAt',
    header: 'Date de création',
    size: 200,
    Cell: ({ cell }) => {
      return new Date(cell.getValue()).toLocaleDateString()
    }
  }
]

const CategoryList = () => {
  // ** State
  const [categories, setCategories] = useState([])
  const [addCategoryOpen, setAddCategoryOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleEditCategory = (category) => {
    setSelectedCategory(category)
    setAddCategoryOpen(true)
  }

  const toggleAddCategoryDrawer = () => {
    if (!addCategoryOpen) {
      setSelectedCategory(null)
    }
    setAddCategoryOpen(!addCategoryOpen)
  }

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategorie(id)
      await fetchCategories()
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div>
          <div>
            <Typography variant='h5'>Gestion des catégories</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography variant='body2'>
              Liste des catégories disponibles dans le système
            </Typography>
            <Button onClick={toggleAddCategoryDrawer}>Ajouter une catégorie</Button>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Table
            data={categories}
            columns={COLUMNS}
            options={{
              enableEditing: true
            }}
            renderRowActions={({ row }) => (
              <RenderAction
                data={row}
                onClickDelete={handleDeleteCategory}
                onClickEdit={handleEditCategory}
              />
            )}
          />
        </Card>
      </Grid>

      <AddCategoryDrawer
        open={addCategoryOpen}
        toggle={toggleAddCategoryDrawer}
        onSuccess={fetchCategories}
        selectedCategory={selectedCategory}
      />
    </Grid>
  )
}

export default CategoryList
