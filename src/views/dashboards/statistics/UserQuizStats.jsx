'use client'
import React, { useState, useEffect } from 'react'

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Tabs,
  Tab,
  Divider,
  Chip,
  LinearProgress
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector
} from '@mui/lab'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AssignmentIcon from '@mui/icons-material/Assignment'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PersonIcon from '@mui/icons-material/Person'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

import StatsOverviewCard from './components/StatsOverviewCard'
import QuizActivityChart from './components/QuizActivityChart'
import UserPerformanceRadar from './components/UserPerformanceRadar'
import { getUserStats } from '@/services/quizService'

const UserQuizStats = ({ userId }) => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    fetchUserStats()
  }, [userId])

  const fetchUserStats = async () => {
    try {
      // Appel API pour récupérer les statistiques de l'utilisateur
      const data = await getUserStats(userId)

      setUserData(data)
    } catch (error) {
      console.error('Error fetching user stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const quizColumns = [
    { 
      field: 'quizTitle', 
      headerName: 'Quiz', 
      flex: 1 
    },
    { 
      field: 'category', 
      headerName: 'Catégorie', 
      flex: 1 
    },
    { 
      field: 'score', 
      headerName: 'Score', 
      width: 130,
      renderCell: (params) => `${params.value}%`
    },
    { 
      field: 'duration', 
      headerName: 'Durée', 
      width: 130,
      renderCell: (params) => `${params.value} min`
    },
    { 
      field: 'completedAt', 
      headerName: 'Date', 
      width: 180,
      renderCell: (params) => format(new Date(params.value), 'dd/MM/yyyy HH:mm', { locale: fr })
    }
  ]

  if (loading) return <LinearProgress />

  return (
    <Grid container spacing={3}>
      {/* En-tête utilisateur */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar sx={{ width: 80, height: 80 }}>
                <PersonIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h5">{userData?.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Membre depuis {format(new Date(userData?.createdAt), 'dd MMMM yyyy', { locale: fr })}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip 
                    label={userData?.roles === 'admin' ? 'Administrateur' : 'Utilisateur'} 
                    color={userData?.roles === 'admin' ? 'primary' : 'default'}
                    size="small"
                  />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Cartes de statistiques */}
      <Grid item xs={12} md={4}>
        <StatsOverviewCard
          title="Quiz Complétés"
          stats={userData?.totalQuizzes}
          icon={<AssignmentIcon />}
          trend={0}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatsOverviewCard
          title="Temps Total"
          stats={`${userData?.totalTime || 0}h`}
          icon={<AccessTimeIcon />}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatsOverviewCard
          title="Score Moyen"
          stats={`${userData?.averageScore}%`}
          icon={<TrendingUpIcon />}
          trend={userData?.scoreTrend}
        />
      </Grid>

      {/* Graphiques et tableaux */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
              <Tab label="Activité Récente" />
              <Tab label="Performance par Matière" />
              <Tab label="Historique Complet" />
            </Tabs>
            <Box sx={{ mt: 3 }}>
              {tabValue === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <QuizActivityChart 
                      data={userData?.activityData.map(item => ({
                        date: format(new Date(item.date), 'dd/MM'),
                        score: item.score
                      }))} 
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Timeline>
                      {userData?.recentActivity?.map((activity, index) => (
                        <TimelineItem key={index}>
                          <TimelineSeparator>
                            <TimelineDot color="primary" />
                            {index < userData.recentActivity.length - 1 && <TimelineConnector />}
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography variant="body2" color="textSecondary">
                              {format(new Date(activity.date), 'dd/MM/yyyy HH:mm', { locale: fr })}
                            </Typography>
                            <Typography>
                              {activity.details?.quizTitle} - Score: {activity.details?.score}%
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {activity.details?.correctAnswers}/{activity.details?.totalQuestions} questions correctes
                            </Typography>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </Grid>
                </Grid>
              )}
              {tabValue === 1 && (
                <UserPerformanceRadar data={userData?.performanceData} />
              )}
              {tabValue === 2 && (
                <DataGrid
                  rows={userData?.quizHistory || []}
                  columns={quizColumns}
                  pageSize={10}
                  autoHeight
                  disableSelectionOnClick
                />
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserQuizStats 