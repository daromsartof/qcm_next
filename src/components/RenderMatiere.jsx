"use client"
import React, { useEffect, useState } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, MenuItem } from '@mui/material'

import { Plus } from 'react-feather'

import CustomTextField from '@/@core/components/mui/TextField'
import { createOneMatiere, getAllMatieres } from '@/services/matiereService'


const RenderMatiere = ({
    value,
    onChange,
    required,
    withAdd = true 
}) => {
    const [open, setOpen] = useState(false)
    const [matiers, setMatiers] = useState([])
    const [name, setName] = useState("")
    const handleClickOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

    const handleFetchMatiers = async () => {
        try {
            const matiere = await getAllMatieres()
 
            setMatiers(matiere)
        } catch (error) {
            console.error('Error fetching matieres:', error)
        }
    }

    const handleSave = async () => {
        try {
            await createOneMatiere({ name })
            handleClose()
            setName("")
            handleFetchMatiers()
        } catch (error) {
            console.error('Error creating matiere:', error)
        }
    }

    useEffect(() => {
        handleFetchMatiers()

        return () => {
            setMatiers([])
        }
    }, [])

    return (
        <>
            <div className='flex items-end'>
                <CustomTextField
                    select
                    fullWidth
                    required
                    label='Matières'
                    value={value}
                    onChange={onChange}
                >
                    {
                        matiers.map((matiere, index) => (
                            <MenuItem key={index} value={matiere.id}>{matiere.title}</MenuItem>
                        ))
                    }
                </CustomTextField>
                {
                    withAdd && (
                        <div className='ms-3'>
                            <Fab aria-label='edit' color='primary' size='small' onClick={handleClickOpen}>
                                <Plus size={18} />
                            </Fab>
                        </div>
                    )
                }
            </div>
            <Dialog open={open} maxWidth={"sm"} fullWidth={true} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Matières</DialogTitle>
                <DialogContent>
                    <CustomTextField id='name' autoFocus fullWidth value={name} type='text' label='Nom du matière' onChange={(e) => setName(e.target.value)} />
                </DialogContent>
                <DialogActions className='dialog-actions-dense'>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleSave}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RenderMatiere