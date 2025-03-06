

import Grid from '@mui/material/Grid'

import prisma from "@/services/Utils/prisma"

import Question from '@/views/dashboards/question/Question'

const QuestionsPage = async () => {
 const utilisateur = await prisma.user.findMany()

 console.log(utilisateur)
  
return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
      </Grid>
    </Grid>
  )
}

export default QuestionsPage