import React from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'


const RenderPreviewQuiz = ({ open, quiz, handleClose }) => {

    console.log(quiz)
    
  return (
    <Dialog open={open} maxWidth={'sm'} fullWidth={true} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{quiz.title}</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions className='dialog-actions-dense'>
      </DialogActions>
    </Dialog>
  )
}

export default RenderPreviewQuiz