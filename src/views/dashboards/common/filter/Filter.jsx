import { useEffect, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { getAllCategories } from '@/services/categorieService'
import { getAllMatieres } from '@/services/matiereService'
import { getAllSources } from '@/services/sourceService'
import { useFilter } from '@/contexts/FilterContext'

const Filter = () => {
  const [categories, setCategories] = useState([])
  const [matieres, setMatieres] = useState([])
  const [sources, setSources] = useState([])
  const { filters, updateFilter } = useFilter()

  const handleFetchCategories = async () => {
    try {
      const data = await getAllCategories()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleFetchMatieres = async () => {
    try {
      const data = await getAllMatieres()
      setMatieres(data)
    } catch (error) {
      console.error('Error fetching matieres:', error)
    }
  }

  const handleFetchSources = async () => {
    try {
      const data = await getAllSources()
      setSources(data)
    } catch (error) {
      console.error('Error fetching sources:', error)
    }
  }

  useEffect(() => {
    handleFetchCategories()
    handleFetchMatieres()
    handleFetchSources()
  }, [])

  return (
    <div className='flex gap-4'>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id='category-select-label'>Catégorie</InputLabel>
        <Select
          labelId='category-select-label'
          id='category-select'
          value={filters.categoryId || 'Tous'}
          label='Catégorie'
          onChange={(e) => updateFilter('categoryId', e.target.value)}
        >
          <MenuItem value=''>
            <em>Tous</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id='matiere-select-label'>Matière</InputLabel>
        <Select
          labelId='matiere-select-label'
          id='matiere-select'
          value={filters.matiereId || 'Tous'}
          label='Matière'
          onChange={(e) => updateFilter('matiereId', e.target.value)}
        >
          <MenuItem value=''>
            <em>Tous</em>
          </MenuItem>
          {matieres.map((matiere) => (
            <MenuItem key={matiere.id} value={matiere.id}>
              {matiere.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id='source-select-label'>Source</InputLabel>
        <Select
          labelId='source-select-label'
          id='source-select'
          value={filters.sourceId || 'Tous'}
          label='Source'
          onChange={(e) => updateFilter('sourceId', e.target.value)}
        >
          <MenuItem value=''>
            <em>Tous</em>
          </MenuItem>
          {sources.map((source) => (
            <MenuItem key={source.id} value={source.id}>
              {source.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default Filter