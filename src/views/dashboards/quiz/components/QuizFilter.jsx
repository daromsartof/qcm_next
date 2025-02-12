import React, { useEffect, useState } from 'react'

import { Card, CardContent, Grid, MenuItem } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'
import { getAllCategories } from '@/services/categorieService'
import { getAllSources } from '@/services/sourceService'
import { getAllMatieres } from '@/services/matiereService'

const QuizFilter = ({
    onChangeSubject = () => {},
    onChangeCategory = () => {},
    onChangeSource = () => {},
    showFilter = {
        subject: true,
        category: true,
        source: true
    }
}) => {
  const [categories, setCategories] = useState([])
  const [sources, setSources] = useState([])

  const [subjects, setSubjects] = useState([])

  const handleGetCategory = async () => {
    try {
      const categorys = await getAllCategories()

      setCategories(categorys)
    } catch (error) {}
  }

  const handleGetSource = async () => {
    try {
      const source = await getAllSources()

      setSources(source)
    } catch (error) {}
  }

  const handleGetSubject = async () => {
    try {
      const matiers = await getAllMatieres()

      setSubjects(matiers)
    } catch (error) {}
  }

  useEffect(() => {
    handleGetCategory()
    handleGetSource()
    handleGetSubject()

    return () => {
      setCategories([])
    }
  }, [])

  return (
    <Card> 
      <CardContent>
        <Grid container spacing={6}>
          {
            showFilter.category && (
                 <Grid item xs={12} sm={3}>
                    <CustomTextField select fullWidth onChange={(e) => onChangeCategory(e.target.value)} defaultValue={0} label='Catégorie' id='select-category'>
                    <MenuItem value={0} selected>
                        <em>Tous</em>
                    </MenuItem>
                    {categories.map((category, index) => (
                        <MenuItem key={index} value={category.id}>
                        {category.title}
                        </MenuItem>
                    ))}
                    </CustomTextField>
                 </Grid>
            )
          }
          {
            showFilter.source && (
 <Grid item xs={12} sm={3}>
            <CustomTextField select fullWidth onChange={(e) => onChangeSource(e.target.value)} defaultValue={0} label='Source' id='select-source'>
              <MenuItem value={0} selected>
                <em>Tous</em>
              </MenuItem>
              {sources.map((source, index) => (
                <MenuItem key={index} value={source.id}>
                  {source.title}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
            )
          }
          {
            showFilter.subject && (
<Grid item xs={12} sm={3}>
            <CustomTextField select fullWidth onChange={(e) => onChangeSubject(e.target.value)} defaultValue={0} label='Matière' id='select-matière'>
              <MenuItem value={0} selected>
                <em>Tous</em>
              </MenuItem>
              {subjects.map((subject, index) => (
                <MenuItem key={index} value={subject.id}>
                  {subject.title}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
            )
          }
          
        </Grid>
      </CardContent>
    </Card>
  )
}

export default QuizFilter
