

import Grid from '@mui/material/Grid'

import prisma from "@/services/Utils/prisma"
import UsersList from '@/views/dashboards/statistics/UsersList'

const QuestionsPage = async () => {
 const utilisateur = await prisma.user.findMany()

 console.log(utilisateur)
  
return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UsersList />
      </Grid>
    </Grid>
  )
}

export default QuestionsPage