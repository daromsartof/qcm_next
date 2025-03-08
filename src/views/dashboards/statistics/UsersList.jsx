'use client'

import React, { useState, useEffect } from 'react'

import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Grid,
  Avatar,
  IconButton,
  Chip,
  LinearProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import SearchIcon from '@mui/icons-material/Search'
import AssessmentIcon from '@mui/icons-material/Assessment'
import PersonIcon from '@mui/icons-material/Person'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'

import { ArrowLeft } from '@mui/icons-material'

import UserQuizStats from './UserQuizStats'

const UsersList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)

      // Appel API pour récupérer la liste des utilisateurs
      const response = await fetch('/api/users')
      const data = await response.json()

      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleShowStats = (user) => {
    setSelectedUser(user)
    setShowStats(true)
  }

  const columns = [
    {
      field: 'avatar',
      headerName: '',
      width: 60,
      renderCell: (params) => (
        <Avatar src={params.row.avatar}>
          <PersonIcon />
        </Avatar>
      ),
      sortable: false
    },
    {
      field: 'name',
      headerName: 'Nom',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="body1">{params.row.name} | {params.row.email}</Typography>
        </Box>
      )
    },
    {
      field: 'status',
      headerName: 'Statut',
      width: 150,
      renderCell: (params) => (
        <Chip
          icon={params.row.isPremium ? <WorkspacePremiumIcon /> : null}
          label={params.row.isPremium ? 'Premium' : 'Gratuit'}
          color={params.row.isPremium ? 'primary' : 'default'}
          size="small"
        />
      )
    },
    {
      field: 'quizCount',
      headerName: 'Quiz Complétés',
      width: 150,
      align: 'center'
    },
    {
      field: 'lastActive',
      headerName: 'Dernière Activité',
      width: 180,

      //valueGetter: (params) => new Date(params.row.lastActive).toLocaleString()
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <IconButton 
          color="primary" 
          onClick={() => handleShowStats(params.row)}
          title="Voir les statistiques"
        >
          <AssessmentIcon />
        </IconButton>
      )
    }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filterType === 'all') return matchesSearch
    if (filterType === 'premium') return matchesSearch && user.isPremium
    if (filterType === 'free') return matchesSearch && !user.isPremium
    
    return matchesSearch
  })

  return (
    <Box>
      {showStats ? (
        <Box>
          <Box sx={{ mb: 3 }}>
            <IconButton onClick={() => setShowStats(false)}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="h6" component="span" sx={{ ml: 2 }}>
              Retour à la liste des utilisateurs
            </Typography>
          </Box>
          <UserQuizStats userId={selectedUser.id} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Rechercher un utilisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                  <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Type d&apos;utilisateur</InputLabel>
                    <Select
                      value={filterType}
                      label="Type d'utilisateur"
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <MenuItem value="all">Tous</MenuItem>
                      <MenuItem value="premium">Premium</MenuItem>
                      <MenuItem value="free">Gratuit</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {loading ? (
                  <LinearProgress />
                ) : (
                  <DataGrid
                    rows={filteredUsers}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 25, 50]}
                    autoHeight
                    disableSelectionOnClick
                    components={{
                      Toolbar: GridToolbar
                    }}
                    sx={{
                      '& .MuiDataGrid-row:hover': {
                        cursor: 'pointer',
                        backgroundColor: 'action.hover'
                      }
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default UsersList 