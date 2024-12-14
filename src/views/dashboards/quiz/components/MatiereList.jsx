"use client"

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Chip from '@mui/material/Chip'
import { Plus } from 'react-feather'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'

import MatierCard from './MatierCard'
import { getAllMatieres } from '@/services/matiereService'
import CustomTextField from '@/@core/components/mui/TextField'

// Separate component for rendering each chip
const ChipItem = ({ data, onDelete }) => {
  return <Chip deleteIcon={<Plus size={18} />} key={data.id} label={data.title} onDelete={onDelete} />
}

const Modal = ({
    open,
    handleClose
}) => {
    return (
         <Dialog open={open} maxWidth={"sm"} fullWidth={true} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Catégories</DialogTitle>
                <DialogContent>
                   
                </DialogContent>
                <DialogActions className='dialog-actions-dense'>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleSave}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
    )
}

const MatiereList = () => {
  const [activeMatiere, setActiveMatiere] = useState([])
  const [matieres, setMatieres] = useState([])
  const [open, setOpen] = useState(false)
  
  const toggle = setOpen(op => !op)

  const handleDelete = chipToDelete => () => {
    setMatieres(matieres => {
      return matieres.filter(matiere => matiere.id !== chipToDelete.id)
    })
    setActiveMatiere(activeMatiere => {
      const active = [...activeMatiere]

      active.push(chipToDelete)

      return active
    })
  }

  const handleFetchMatieres = async () => {
    try {
      const matieres = await getAllMatieres()

      console.log(matieres)

      setMatieres(matieres)
    } catch (error) {
      console.error('Error fetching matieres:', error)
    }
  }

  useEffect(() => {
    
    handleFetchMatieres()
  }, [])

  return (
    <div>
      <div className='flex gap-4 flex-wrap mb-4'>
        {matieres.map(matiere => (
          <ChipItem key={matiere.id} data={matiere} onDelete={handleDelete(matiere)} />
        ))}
      </div>
      <Grid container spacing={6}>
        {activeMatiere.map((data, key) => (
          <MatierCard data={data} key={key} />
        ))}
      </Grid>
      
    </div>
  )
}

export default MatiereList
