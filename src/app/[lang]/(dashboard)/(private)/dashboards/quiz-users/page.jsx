

import Grid from '@mui/material/Grid'

import UsersList from '@/views/dashboards/statistics/UsersList'

const QuestionsPage = async () => {
  
return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UsersList />
      </Grid>
    </Grid>
  )
}

export default QuestionsPage