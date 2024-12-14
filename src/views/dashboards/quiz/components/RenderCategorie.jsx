'use client'
import React, { useEffect, useState } from 'react'

import { MenuItem } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'
import { getAllCategories } from '@/services/categorieService'

const RenderCategorie = ({ value, onChange }) => {
  const [categories, setCategories] = useState([])

  const handleFetchCategories = async () => {
    try {
      const categories = await getAllCategories()

      setCategories(categories)
    } catch (error) {
      console.error('Error fetching categoriess:', error)
    }
  }

  useEffect(() => {
    handleFetchCategories()

    return () => {
      setCategories([])
    }
  }, [])

  return (
    <CustomTextField select fullWidth required label='Catégories' value={value} onChange={onChange}>
      {categories.map((categorie, index) => (
        <MenuItem key={index} value={categorie.id}>
          {categorie.title}
        </MenuItem>
      ))}
    </CustomTextField>
  )
}

export default RenderCategorie
