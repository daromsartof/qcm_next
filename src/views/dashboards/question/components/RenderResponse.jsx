// React Imports
import { useState } from 'react'

// MUI Imports
import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'

const RenderResponse = ({
  data = []
}) => {
  return (
    <List className='w-full'>
      {
        data.map((answer, i) => (
          <ListItem disablePadding key={i}>
            <ListItemButton>
              <div>
              <ListItemText id={`checkbox-list-label-${answer.id}`} primary={answer.title} />
              </div>
              <div>
              <ListItemSecondaryAction>
                <Checkbox
                  edge='end'
                  disabled
                  disableRipple
                  checked={answer.isCorrect}
                  inputProps={{ 'aria-labelledby': `checkbox-list-label-${answer.id}` }}
                />
              </ListItemSecondaryAction>
              </div>
              
            </ListItemButton>
          </ListItem>
        ))
      }
    </List>
  )
}

export default RenderResponse