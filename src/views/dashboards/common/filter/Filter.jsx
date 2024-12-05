"use client"
import { Card, CardContent, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import CustomTextField from '@/@core/components/mui/TextField'
import { getAllSources } from '@/services/sourceService'
import { getAllMatieres } from '@/services/matiereService'
import { getAllCategories } from '@/services/categorieService'

const Filter = () => {
  const [categories, setCategories] = useState([])
  const [sources, setSources] = useState([])
  const [matiers, setMatiers] = useState([])
  const handleFetchCategories = async () => {
    try {
      const categories = await getAllCategories()
      setCategories(categories)
    } catch (error) {
      console.error('Error fetching categoriess:', error)
    }
  }

  const handleFetchMatiers = async () => {
    try {
      const matiere = await getAllMatieres()
      setMatiers(matiere)
    } catch (error) {
      console.error('Error fetching matieres:', error)
    }
  }
  const handleFetchSources = async () => {
    try {
      const sources = await getAllSources()
      setSources(sources)
    } catch (error) {
      console.error('Error fetching matieres:', error)
    }
  }
  useEffect(() => {
    handleFetchCategories()
    handleFetchMatiers()
    handleFetchSources()
  }, [])
  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={3}>
            <CustomTextField select fullWidth defaultValue={0} label='Catégorie' id='select-category'>
              <MenuItem value={0} selected>
                <em>Tous</em>
              </MenuItem>
              {
                categories.map((categorie, index) => (
                  <MenuItem key={index} value={categorie.id}>{categorie.title}</MenuItem>
                ))
              }
            </CustomTextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField select fullWidth defaultValue={0} label='Source' id='select-source'>
              <MenuItem value={0} selected>
                <em>Tous</em>
              </MenuItem>
              {
                sources.map((source, index) => (
                  <MenuItem key={index} value={source.id}>{source.title}</MenuItem>
                ))
              }
            </CustomTextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField select fullWidth defaultValue={0} label='Matière' id='select-matière'>
              <MenuItem value={0} selected>
                <em>Tous</em>
              </MenuItem>
              {
                matiers.map((matiere, index) => (
                  <MenuItem key={index} value={matiere.id}>{matiere.title}</MenuItem>
                ))
              }
            </CustomTextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Filter