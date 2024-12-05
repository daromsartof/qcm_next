"use client"
import CustomTextField from '@/@core/components/mui/TextField'
import { createOneCategorie, getAllCategories } from '@/services/categorieService'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Plus } from 'react-feather'

const RenderCategorie = ({
    value,
    onChange,
    required
}) => {
    const [open, setOpen] = useState(false)
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const handleClickOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)
    const handleFetchCategories = async () => {
        try {
            const categories = await getAllCategories()
            setCategories(categories)
        } catch (error) {
            console.error('Error fetching categoriess:', error)
        }
    }

    const handleSave = async () => {
        try {
            await createOneCategorie({ name })
            handleClose()
            setName("")
            handleFetchCategories()
        } catch (error) {
            console.error('Error creating categorie:', error)
        }
    }
    useEffect(() => {
        handleFetchCategories()

        return () => {
            setCategories([])
        }
    }, [])

    return (
        <>
            <div className='flex items-end mt-3'>
                <CustomTextField
                    select
                    fullWidth
                    required
                    label='Catégories'
                    value={value}
                    onChange={onChange}
                >
                    {
                        categories.map((categorie, index) => (
                            <MenuItem key={index} value={categorie.id}>{categorie.title}</MenuItem>
                        ))
                    }
                </CustomTextField>
                <div className='ms-3'>
                    <Fab aria-label='edit' color='primary' size='small' onClick={handleClickOpen}>
                        <Plus size={18} />
                    </Fab>
                </div>
            </div>
            <Dialog open={open} maxWidth={"sm"} fullWidth={true} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Catégories</DialogTitle>
                <DialogContent>
                    <CustomTextField id='name' autoFocus fullWidth value={name} type='text' label='Nom du Catégories' onChange={(e) => setName(e.target.value)} />
                </DialogContent>
                <DialogActions className='dialog-actions-dense'>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleSave}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RenderCategorie