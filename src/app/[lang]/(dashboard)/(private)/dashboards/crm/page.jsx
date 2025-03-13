'use client';

// React Imports
import { useState, useEffect } from 'react';

// MUI Imports
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// Chart Imports
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';

// Icon Imports
import Icon from '@mui/material/Icon';

// Service Imports

// Additional imports for Material-UI icons
import UpdateIcon from '@mui/icons-material/Update';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import PieChartIcon from '@mui/icons-material/PieChart';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import QuizIcon from '@mui/icons-material/Quiz';

import { getDashboardStats } from '@/services/dasboardService';

const DashboardOverview = () => {
  // Hooks
  const theme = useTheme();

  const [stats, setStats] = useState({
    utilisateur_actif: 0,
    quiz_actif: 0,
    quiz_prenium: 0,
    dailySignups: {}
  });

  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await getDashboardStats();

      setStats(res);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Handlers
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRefresh = () => {
    fetchStats();
    handleMenuClose();
  };

  // Format daily signups data for chart
  const formatDailySignupsData = () => {
    if (!stats.dailySignups) return [];
    
    return Object.entries(stats.dailySignups).map(([date, count]) => {
      const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit'
      });
      
      return {
        date: formattedDate,
        inscriptions: count
      };
    }).sort((a, b) => {
      const dateA = a.date.split('/').reverse().join('');
      const dateB = b.date.split('/').reverse().join('');

      
return dateA.localeCompare(dateB);
    });
  };

  // Calculate total signups
  const calculateTotalSignups = () => {
    if (!stats.dailySignups) return 0;
    
    return Object.values(stats.dailySignups).reduce((sum, count) => sum + count, 0);
  };

  // Pie chart data for quiz distribution
  const quizDistributionData = [
    { name: 'Quiz Premium', value: stats.quiz_prenium || 0 },
    { name: 'Quiz Gratuits', value: (stats.quiz_actif || 0) - (stats.quiz_prenium || 0) }
  ];
  
  const COLORS = [theme.palette.warning.main, theme.palette.info.main];

  // Render dashboard header
  const renderHeader = () => (
    <Box sx={{ mb: 6 }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Tableau de bord
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bienvenue dans votre espace d&apos;analyse et de suivi des performances
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label={`Dernière mise à jour: ${new Date().toLocaleString('fr-FR')}`}
              size="small" 
              color="primary" 
              variant="outlined"
              icon={<UpdateIcon fontSize="small" />}
            />
            <IconButton 
              aria-label="more options" 
              aria-controls="dashboard-menu" 
              aria-haspopup="true"
              onClick={handleMenuClick}
              sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
              id="dashboard-menu"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'dashboard-menu-button',
              }}
            >
              <MenuItem onClick={handleRefresh}>
                <RefreshIcon fontSize="small" sx={{ mr: 1 }} />
                Rafraîchir les données
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
                Paramètres
              </MenuItem>
            </Menu>
          </Box>
      </Grid>
      </Grid>

      <Box sx={{ mt: 4, mb: 2 }}>
        <Tabs
          value={0}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minWidth: 'auto',
              px: 4,
              py: 2,
              borderRadius: '8px 8px 0 0',
              '&.Mui-selected': {
                backgroundColor: theme.palette.background.paper,
                borderBottom: 'none',
              }
            },
            '& .MuiTabs-indicator': {
              display: 'none'
            }
          }}
        >
          <Tab label="Vue d'ensemble" icon={<PieChartIcon />} iconPosition="start" />
        </Tabs>
      </Box>
    </Box>
  );

  // Render key metrics section
  const renderKeyMetrics = () => (
    <Grid container spacing={3} sx={{ mb: 6 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 2,
            boxShadow: theme.shadows[3]
          }}
        >
          {loading ? (
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 150 }}>
              <CircularProgress size={30} />
            </CardContent>
          ) : (
            <>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '40%',
                  height: '100%',
                  background: `linear-gradient(to right, transparent, ${theme.palette.primary.light}20)`,
                  borderRadius: '0 8px 8px 0'
                }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar
                    sx={{
                      mr: 3,
                      bgcolor: theme.palette.primary.light,
                      color: theme.palette.primary.main,
                      width: 48,
                      height: 48
                    }}
                  >
                    <PeopleIcon fontSize="medium" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Utilisateurs actifs
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {stats.utilisateur_actif || 0}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Total des inscriptions
                  </Typography>
                  <Chip
                    label={calculateTotalSignups()}
                    size="small"
                    color="primary"
                    sx={{ height: 24, fontWeight: 600 }}
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={100}
                  sx={{
                    mt: 1,
                    height: 6,
                    borderRadius: 5,
                    backgroundColor: theme.palette.primary.light,
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 5,
                      backgroundColor: theme.palette.primary.main
                    }
                  }}
                />
              </CardContent>
            </>
          )}
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 2,
            boxShadow: theme.shadows[3]
          }}
        >
          {loading ? (
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 150 }}>
              <CircularProgress size={30} />
            </CardContent>
          ) : (
            <>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '40%',
                  height: '100%',
                  background: `linear-gradient(to right, transparent, ${theme.palette.success.light}20)`,
                  borderRadius: '0 8px 8px 0'
                }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar
                    sx={{
                      mr: 3,
                      bgcolor: theme.palette.success.light,
                      color: theme.palette.success.main,
                      width: 48,
                      height: 48
                    }}
                  >
                    <TrendingUpIcon fontSize="medium" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Taux de conversion
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {stats.utilisateur_actif > 0 
                        ? `${Math.round((stats.quiz_prenium / stats.utilisateur_actif) * 100)}%` 
                        : '0%'}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Utilisateurs premium
                  </Typography>
                  <Chip
                    label={`${stats.quiz_prenium || 0} quiz`}
                    size="small"
                    color="success"
                    sx={{ height: 24, fontWeight: 600 }}
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={stats.utilisateur_actif > 0 ? (stats.quiz_prenium / stats.utilisateur_actif) * 100 : 0}
                  sx={{
                    mt: 1,
                    height: 6,
                    borderRadius: 5,
                    backgroundColor: theme.palette.success.light,
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 5,
                      backgroundColor: theme.palette.success.main
                    }
                  }}
                />
              </CardContent>
            </>
          )}
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 2,
            boxShadow: theme.shadows[3]
          }}
        >
          {loading ? (
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 150 }}>
              <CircularProgress size={30} />
            </CardContent>
          ) : (
            <>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '40%',
                  height: '100%',
                  background: `linear-gradient(to right, transparent, ${theme.palette.warning.light}20)`,
                  borderRadius: '0 8px 8px 0'
                }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar
                    sx={{
                      mr: 3,
                      bgcolor: theme.palette.warning.light,
                      color: theme.palette.warning.main,
                      width: 48,
                      height: 48
                    }}
                  >
                    <WorkspacePremiumIcon fontSize="medium" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Quiz premium
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {stats.quiz_prenium || 0}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Pourcentage premium
                  </Typography>
                  <Chip
                    label={stats.quiz_actif > 0 
                      ? `${Math.round((stats.quiz_prenium / stats.quiz_actif) * 100)}%` 
                      : '0%'}
                    size="small"
                    color="warning"
                    sx={{ height: 24, fontWeight: 600 }}
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={stats.quiz_actif > 0 ? (stats.quiz_prenium / stats.quiz_actif) * 100 : 0}
                  sx={{
                    mt: 1,
                    height: 6,
                    borderRadius: 5,
                    backgroundColor: theme.palette.warning.light,
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 5,
                      backgroundColor: theme.palette.warning.main
                    }
                  }}
                />
              </CardContent>
            </>
          )}
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 2,
            boxShadow: theme.shadows[3]
          }}
        >
          {loading ? (
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 150 }}>
              <CircularProgress size={30} />
            </CardContent>
          ) : (
            <>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '40%',
                  height: '100%',
                  background: `linear-gradient(to right, transparent, ${theme.palette.info.light}20)`,
                  borderRadius: '0 8px 8px 0'
                }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar
                    sx={{
                      mr: 3,
                      bgcolor: theme.palette.info.light,
                      color: theme.palette.info.main,
                      width: 48,
                      height: 48
                    }}
                  >
                    <QuizIcon fontSize="medium" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Quiz actifs
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {stats.quiz_actif || 0}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Quiz gratuits
                  </Typography>
                  <Chip
                    label={`${(stats.quiz_actif || 0) - (stats.quiz_prenium || 0)}`}
                    size="small"
                    color="info"
                    sx={{ height: 24, fontWeight: 600 }}
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={100}
                  sx={{
                    mt: 1,
                    height: 6,
                    borderRadius: 5,
                    backgroundColor: theme.palette.info.light,
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 5,
                      backgroundColor: theme.palette.info.main
                    }
                  }}
                />
              </CardContent>
            </>
          )}
        </Card>
      </Grid>
      </Grid>
  );

  // Render charts section
  const renderCharts = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[3], height: '100%' }}>
          {loading ? (
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
              <CircularProgress />
            </CardContent>
          ) : (
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Inscriptions quotidiennes
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={formatDailySignupsData()}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip 
                      formatter={(value) => [`${value} inscription(s)`, 'Nombre']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Bar 
                      dataKey="inscriptions" 
                      fill={theme.palette.primary.main} 
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          )}
        </Card>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[3], height: '100%' }}>
          {loading ? (
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
              <CircularProgress />
            </CardContent>
          ) : (
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Distribution des quiz
              </Typography>
              <Box sx={{ height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={quizDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {quizDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} quiz`, '']} />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
                  {quizDistributionData.map((entry, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: COLORS[index % COLORS.length],
                          mr: 1
                        }}
                      />
                      <Typography variant="body2">{entry.name}: {entry.value}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
          )}
        </Card>
      </Grid>
      
      <Grid item xs={12}>
        <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[3], mt: 3 }}>
          {loading ? (
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <CircularProgress />
            </CardContent>
          ) : (
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Résumé des statistiques
              </Typography>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Métrique</TableCell>
                      <TableCell align="right">Valeur</TableCell>
                      <TableCell align="right">Pourcentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PeopleIcon sx={{ mr: 1, color: theme.palette.primary.main }} fontSize="small" />
                          Utilisateurs actifs
                        </Box>
                      </TableCell>
                      <TableCell align="right">{stats.utilisateur_actif || 0}</TableCell>
                      <TableCell align="right">100%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <QuizIcon sx={{ mr: 1, color: theme.palette.info.main }} fontSize="small" />
                          Quiz actifs
                        </Box>
                      </TableCell>
                      <TableCell align="right">{stats.quiz_actif || 0}</TableCell>
                      <TableCell align="right">100%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <WorkspacePremiumIcon sx={{ mr: 1, color: theme.palette.warning.main }} fontSize="small" />
                          Quiz premium
                        </Box>
                      </TableCell>
                      <TableCell align="right">{stats.quiz_prenium || 0}</TableCell>
                      <TableCell align="right">
                        {stats.quiz_actif > 0 
                          ? `${Math.round((stats.quiz_prenium / stats.quiz_actif) * 100)}%` 
                          : '0%'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TrendingUpIcon sx={{ mr: 1, color: theme.palette.success.main }} fontSize="small" />
                          Inscriptions totales
                        </Box>
                      </TableCell>
                      <TableCell align="right">{calculateTotalSignups()}</TableCell>
                      <TableCell align="right">-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          )}
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ pb: 5 }}>
      {renderHeader()}
      {renderKeyMetrics()}
      {renderCharts()}
    </Box>
  );
};

export default DashboardOverview;
