// MUI Imports
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Checkbox from '@mui/material/Checkbox'
import { Grid } from '@mui/material'

const RenderResponse = ({
  data = []
}) => {
  return (
    <List className='w-full'>
      {
        data.map((answer, i) => (
          <ListItem disablePadding key={i}>
            <Grid container>
              <Grid item xs={11}>
                <span className='whitespace-normal'>{answer.title}</span>
              </Grid>
              <Grid item xs={1}>
                  <Checkbox
                    edge='end'
                    disabled
                    disableRipple
                    checked={answer.isCorrect}
                    inputProps={{ 'aria-labelledby': `checkbox-list-label-${answer.id}` }}
                  />
              </Grid>
            </Grid>
          </ListItem>
        ))
      }
    </List>
  )
}

export default RenderResponse