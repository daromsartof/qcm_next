import { useState } from 'react'

import { 
  Button, 
  Checkbox, 
  Divider, 
  FormControlLabel, 
  Grid, 
  IconButton, 
  Card, 
  Typography,
  Tooltip,
  Box
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import CustomTextField from '@/@core/components/mui/TextField'

const RenderResponseForm = ({ defaultChecked, responses, setResponses }) => {
  const [error, setError] = useState({})

  const handleClickAdd = () => {
    setResponses(response => {
      const newResponses = { ...response }

      newResponses[Object.keys(response).length + 1] = {
        title: '',
        isCorrect: false,
        explaination: ''
      }
      
return newResponses
    })
  }

  const handleChange = (key, name, value) => {
    setResponses(response => {
      const newResponses = { ...response }

      newResponses[key][name] = value
      
return newResponses
    })
    
    // Clear error when user types
    if (error[key]) {
      setError(prev => ({ ...prev, [key]: null }))
    }
  }

  const handleDelete = (keyToDelete) => {
    if (Object.keys(responses).length <= 2) {
      return // Empêcher la suppression si moins de 2 réponses
    }
    
    setResponses(prevResponses => {
      const newResponses = { ...prevResponses }

      delete newResponses[keyToDelete]
      
      // Réorganiser les clés
      const reorderedResponses = {}

      Object.values(newResponses).forEach((response, index) => {
        reorderedResponses[index + 1] = response
      })
      
      return reorderedResponses
    })
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = { ...responses }
    const [reorderedItem] = Object.entries(items).splice(result.source.index, 1)

    Object.entries(items).splice(result.destination.index, 0, reorderedItem)

    const reorderedResponses = {}

    Object.values(items).forEach((response, index) => {
      reorderedResponses[index + 1] = response
    })

    setResponses(reorderedResponses)
  }

  const validateResponse = (key) => {
    if (!responses[key].title.trim()) {
      setError(prev => ({ ...prev, [key]: "Le titre est requis" }))
      
return false
    }

    
return true
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="responses">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {Object.keys(responses).map((key, index) => (
                <Draggable key={key} draggableId={key} index={index}>
                  {(provided) => (
                    <Card 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      sx={{ 
                        p: 3, 
                        mb: 2,
                        border: responses[key].isCorrect ? '2px solid #28c76f' : 'none',
                        position: 'relative'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <div {...provided.dragHandleProps}>
                          <DragIndicatorIcon sx={{ cursor: 'grab', mr: 2 }} />
                        </div>
                        <Typography variant="h6">Réponse {key}</Typography>
                        <Tooltip title="Supprimer la réponse">
                          <IconButton 
                            color="error" 
                            sx={{ ml: 'auto' }}
                            onClick={() => handleDelete(key)}
                            disabled={Object.keys(responses).length <= 2}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>

                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            fullWidth
                            required
                            label='Titre'
                            value={responses[key].title}
                            placeholder='Réponse ... '
                            onChange={e => handleChange(key, 'title', e.target.value)}
                            error={!!error[key]}
                            helperText={error[key]}
                            onBlur={() => validateResponse(key)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            fullWidth
                            label='Explication'
                            rows={2}
                            multiline
                            type='textarea'
                            placeholder="Explication de la réponse ... "
                            value={responses[key].explaination}
                            onChange={e => handleChange(key, 'explaination', e.target.value)}
                          />
                        </Grid>
                      </Grid>

                      <FormControlLabel
                        sx={{ mt: 2 }}
                        label='Réponse correcte'
                        control={
                          <Checkbox
                            checked={responses[key].isCorrect}
                            onChange={() => handleChange(key, 'isCorrect', !responses[key].isCorrect)}
                            color="success"
                          />
                        }
                      />
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button 
        variant='contained' 
        onClick={handleClickAdd} 
        startIcon={<AddCircleOutlineIcon />}
        sx={{ mt: 4 }}
      >
        Ajouter une réponse
      </Button>
    </div>
  )
}

export default RenderResponseForm