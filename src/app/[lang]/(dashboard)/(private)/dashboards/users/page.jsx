'use client';

import { useState, useEffect } from 'react';

import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  InputAdornment,
  Tooltip,
  Alert,
  Fade,
  Pagination,
  Skeleton,
  Stack,
  useTheme,
  TablePagination,
  Snackbar,
  Grid
} from '@mui/material';
import { 
  Edit, 
  Delete, 
  Add, 
  Search, 
  FilterList, 
  Refresh, 
  AdminPanelSettings, 
  Person,
  CheckCircle
} from '@mui/icons-material';

export default function UsersPage() {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstname.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      const data = await response.json();

      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      setError('Failed to load users');
      showSnackbar('Impossible de charger les utilisateurs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (user = null) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const url = selectedUser ? `/api/users/${selectedUser.id}` : '/api/users';
    const method = selectedUser ? 'PUT' : 'POST';

    try {
      setLoading(true);

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error('Operation failed');
      await fetchUsers();
      handleClose();
      showSnackbar(selectedUser ? 'Utilisateur mis à jour avec succès' : 'Utilisateur créé avec succès');
    } catch (error) {
      setError('Operation failed. Please try again.');
      showSnackbar('Échec de l\'opération. Veuillez réessayer.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteConfirm = (user) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
    setUserToDelete(null);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    
    try {
      setLoading(true);
      await fetch(`/api/users/${userToDelete.id}`, { method: 'DELETE' });
      await fetchUsers();
      showSnackbar('Utilisateur supprimé avec succès');
    } catch (error) {
      setError('Failed to delete user');
      showSnackbar('Échec de la suppression de l\'utilisateur', 'error');
    } finally {
      setLoading(false);
      closeDeleteConfirm();
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getInitials = (name, firstname) => {
    return `${name?.charAt(0) || ''}${firstname?.charAt(0) || ''}`.toUpperCase();
  };

  const getAvatarColor = (role) => {
    return role === 'admin' ? theme.palette.error.main : theme.palette.primary.main;
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  return (
    <Box sx={{ pb: 5 }}>
      {/* Header Section */}
      <Card 
        elevation={0} 
        sx={{ 
          mb: 4, 
          backgroundColor: theme.palette.background.default,
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{ 
            p: 4, 
         
            borderBottom: `1px solid ${theme.palette.divider}`
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              Gestion des Utilisateurs
            </Typography>
            
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => handleOpen()} 
              startIcon={<Add />}
              sx={{ 
                borderRadius: '8px',
                boxShadow: 2,
                px: 3
              }}
            >
              Nouvel Utilisateur
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Consultez, ajoutez, modifiez et supprimez les utilisateurs de votre application
          </Typography>
        </Box>
        
        {/* Search and Filter Bar */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Rechercher un utilisateur..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              flex: 1, 
              minWidth: '200px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
          />
          
          <Tooltip title="Rafraîchir la liste">
            <IconButton onClick={fetchUsers} color="primary" sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: '8px' }}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Card>

      {/* Main Content */}
      <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {loading && !users.length ? (
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
              {[...Array(5)].map((_, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        ) : error && !users.length ? (
          <Box sx={{ p: 3 }}>
            <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
          </Box>
        ) : (
          <>
            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ backgroundColor: theme.palette.background.default }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Utilisateur</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Rôle</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Code Step</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filteredUsers
                  ).map((user) => (
                    <TableRow 
                      key={user.id}
                      hover
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar 
                            sx={{ 
                              bgcolor: getAvatarColor(user.roles),
                              width: 40,
                              height: 40,
                              fontWeight: 600
                            }}
                          >
                            {getInitials(user.name, user.firstname)}
                          </Avatar>
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {user.name} {user.firstname}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ID: {user.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip 
                          icon={user.roles === 'admin' ? <AdminPanelSettings fontSize="small" /> : <Person fontSize="small" />}
                          label={user.roles === 'admin' ? 'Administrateur' : 'Utilisateur'} 
                          size="small"
                          color={user.roles === 'admin' ? 'error' : 'primary'}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{user.codeStep || '—'}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                          <Tooltip title="Modifier">
                            <IconButton onClick={() => handleOpen(user)} color="primary" size="small" sx={{ border: `1px solid ${theme.palette.divider}` }}>
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Supprimer">
                            <IconButton onClick={() => openDeleteConfirm(user)} color="error" size="small" sx={{ border: `1px solid ${theme.palette.divider}` }}>
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 69 * emptyRows }}>
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                  {filteredUsers.length === 0 && !loading && (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Search sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }} />
                          <Typography variant="h6" color="text.secondary">
                            Aucun utilisateur trouvé
                          </Typography>
                          <Typography variant="body2" color="text.disabled" sx={{ mb: 2 }}>
                            Essayez de modifier vos critères de recherche
                          </Typography>
                          <Button 
                            variant="outlined" 
                            onClick={() => setSearchTerm('')}
                            startIcon={<Refresh />}
                          >
                            Réinitialiser la recherche
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredUsers.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Lignes par page:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count !== -1 ? count : `plus de ${to}`}`}
              rowsPerPageOptions={[5, 10, 25, { label: 'Tous', value: -1 }]}
            />
          </>
        )}
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          elevation: 1,
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 0 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {selectedUser ? 'Modifier un utilisateur' : 'Créer un utilisateur'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {selectedUser ? 'Modifiez les informations de l\'utilisateur' : 'Remplissez le formulaire pour créer un nouvel utilisateur'}
          </Typography>
          <Divider sx={{ mt: 2 }} />
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="name"
                  label="Nom"
                  fullWidth
                  required
                  defaultValue={selectedUser?.name || ''}
                  InputProps={{
                    sx: { borderRadius: 1.5 }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="firstname"
                  label="Prénom"
                  fullWidth
                  required
                  defaultValue={selectedUser?.firstname || ''}
                  InputProps={{
                    sx: { borderRadius: 1.5 }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  defaultValue={selectedUser?.email || ''}
                  InputProps={{
                    sx: { borderRadius: 1.5 }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="roles"
                  label="Rôle"
                  select
                  fullWidth
                  required
                  defaultValue={selectedUser?.roles || 'user'}
                  InputProps={{
                    sx: { borderRadius: 1.5 }
                  }}
                >
                  <MenuItem value="user">Utilisateur</MenuItem>
                  <MenuItem value="admin">Administrateur</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  name="password"
                  label="Mot de passe"
                  type="password"
                  fullWidth
                  required={!selectedUser}
                  placeholder={selectedUser ? 'Laisser vide pour conserver le mot de passe actuel' : ''}
                  helperText={selectedUser ? 'Laissez vide pour conserver le mot de passe actuel' : 'Entrez un mot de passe sécurisé'}
                  InputProps={{
                    sx: { borderRadius: 1.5 }
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button 
              onClick={handleClose} 
              variant="outlined"
              sx={{ borderRadius: 1.5 }}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={16} /> : <CheckCircle />}
              sx={{ borderRadius: 1.5 }}
            >
              {selectedUser ? 'Mettre à jour' : 'Créer'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={closeDeleteConfirm}
        PaperProps={{
          elevation: 1,
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle>
          <Typography variant="h6">Confirmer la suppression</Typography>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2, borderRadius: 1.5 }}>
            Cette action est irréversible !
          </Alert>
          <Typography variant="body1">
            Êtes-vous sûr de vouloir supprimer l&apos;utilisateur <strong>{userToDelete?.name} {userToDelete?.firstname}</strong> ?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={closeDeleteConfirm} 
            variant="outlined"
            sx={{ borderRadius: 1.5 }}
          >
            Annuler
          </Button>
          <Button 
            onClick={handleDelete} 
            color="error" 
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : <Delete />}
            sx={{ borderRadius: 1.5 }}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}