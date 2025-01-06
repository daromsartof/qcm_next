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
import AddSourceDrawer from './AddSourceDrawer'

// ** Services
import { getAllSources, deleteSource } from '@/services/sourceService'

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

const SourceList = () => {
  // ** State
  const [sources, setSources] = useState([])
  const [addSourceOpen, setAddSourceOpen] = useState(false)
  const [selectedSource, setSelectedSource] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchSources = async () => {
    try {
      const data = await getAllSources()

      setSources(data)
    } catch (error) {
      console.error('Error fetching sources:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSources()
  }, [])

  const handleEditSource = (source) => {
    setSelectedSource(source)
    setAddSourceOpen(true)
  }

  const toggleAddSourceDrawer = () => {
    if (!addSourceOpen) {
      setSelectedSource(null)
    }

    setAddSourceOpen(!addSourceOpen)
  }

  const handleDeleteSource = async (id) => {
    try {
      await deleteSource(id)
      await fetchSources()
    } catch (error) {
      console.error('Error deleting source:', error)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div>
          <div>
            <Typography variant='h5'>Gestion des sources</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography variant='body2'>
              Liste des sources disponibles dans le système
            </Typography>
            <Button onClick={toggleAddSourceDrawer}>Ajouter une source</Button>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Table
            data={sources}
            columns={COLUMNS}
            options={{
              enableEditing: true
            }}
            renderRowActions={({ row }) => (
              <RenderAction
                data={row}
                onClickDelete={handleDeleteSource}
                onClickEdit={handleEditSource}
              />
            )}
          />
        </Card>
      </Grid>

      <AddSourceDrawer
        open={addSourceOpen}
        toggle={toggleAddSourceDrawer}
        onSuccess={fetchSources}
        selectedSource={selectedSource}
      />
    </Grid>
  )
}

export default SourceList
