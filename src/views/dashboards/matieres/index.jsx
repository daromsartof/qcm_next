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
import AddMatiereDrawer from './AddMatiereDrawer'

// ** Services
import { getAllMatieres, deleteMatiere } from '@/services/matiereService'

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

const MatiereList = () => {
  // ** State
  const [matieres, setMatieres] = useState([])
  const [addMatiereOpen, setAddMatiereOpen] = useState(false)
  const [selectedMatiere, setSelectedMatiere] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchMatieres = async () => {
    try {
      const data = await getAllMatieres()

      setMatieres(data)
    } catch (error) {
      console.error('Error fetching matieres:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMatieres()
  }, [])

  const handleEditMatiere = (matiere) => {
    console.log(matiere)
    
    setSelectedMatiere(matiere)
    setAddMatiereOpen(true)
  }

  const toggleAddMatiereDrawer = () => {
    if (!addMatiereOpen) {
      setSelectedMatiere(null)
    }

    setAddMatiereOpen(!addMatiereOpen)
  }

  const handleDeleteMatiere = async (id) => {
    try {
      await deleteMatiere(id)
      await fetchMatieres()
    } catch (error) {
      console.error('Error deleting matiere:', error)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div>
          <div>
            <Typography variant='h5'>Gestion des matières</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography variant='body2'>
              Liste des matières disponibles dans le système
            </Typography>
            <Button onClick={toggleAddMatiereDrawer}>Ajouter une matière</Button>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Table
            data={matieres}
            columns={COLUMNS}
            options={{
              enableEditing: true
            }}
            renderRowActions={({ row }) => (
              <RenderAction
                data={row}
                onClickDelete={handleDeleteMatiere}
                onClickEdit={handleEditMatiere}
              />
            )}
          />
        </Card>
      </Grid>

      <AddMatiereDrawer
        open={addMatiereOpen}
        toggle={toggleAddMatiereDrawer}
        onSuccess={fetchMatieres}
        selectedMatiere={selectedMatiere}
      />
    </Grid>
  )
}

export default MatiereList
