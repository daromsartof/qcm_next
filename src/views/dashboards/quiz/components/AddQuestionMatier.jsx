'use client'
import { useEffect, useState } from 'react'

import { Button, Card, CardContent, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, Grid, MenuItem, Typography, Alert } from '@mui/material'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import List from '@mui/material/List'
import InputAdornment from '@mui/material/InputAdornment'

import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import RenderSource from '@/components/RenderSource'
import CustomTextField from '@/@core/components/mui/TextField'
import { getAllQuestions } from '@/services/questionService'

const SortableItem = ({ question, id, index, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '10px',
    border: '1px solid #ccc',
    marginBottom: '5px',
    backgroundColor: '#f9f9f9',
    cursor: 'grab'
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className='flex justify-between items-center'>
        <div className='d-flex justify-between'>
          <div>
            <span className='font-bold'>Q {index + 1} : </span>
            <span>{question.title}</span>
          </div>
          <div>
            <span className='font-bold'>Source : </span>
            <span>{question.Source?.title}</span>
          </div>
        </div>
        <div>
          <Button edge='end' size='small' onClick={() => onDelete(question.id)}>
            <DeleteSweepIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

const AddQuestionMatier = ({ open, matiere, categorie, toggle, handleSaveQuestion }) => {
  const [data, setData] = useState([])
  const [source, setSources] = useState("")
  const [filtredQuestions, setFiltredQuestions] = useState([])
  const [minute, setMinute] = useState(0)
  const [question, setQuestion] = useState("")
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  // Ajout de la fonction pour réinitialiser les champs
  const resetFields = () => {
    setSources("")
    setQuestion("")
    setError('')
    setMinute(0)
    setFiltredQuestions([])
    setData([])
  }

  useEffect(() => {
    handleChangeSource(0)
  }, [matiere.id, categorie])

  const handleChangeSource = async value => {
    setSources(value)

    if (value === 0) {
      setData(await getAllQuestions({ matiereId: matiere.id, categoryId: categorie, strict: true }))

      return
    }

    const filtered = await getAllQuestions({ matiereId: matiere.id, categoryId: categorie, sourceId: value, strict: true })

    //setFiltredQuestions(filtered)
    setData([...filtered])
  }

  const handleDragEnd = event => {
    const { active, over } = event

    if (active.id !== over.id) {
      setFiltredQuestions(prevItems => {
        const oldIndex = prevItems.findIndex(item => item.id === active.id)
        const newIndex = prevItems.findIndex(item => item.id === over.id)

        return arrayMove(prevItems, oldIndex, newIndex)
      })
    }
  }

  const handleRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * data.length)
    const randomQuestion = data[randomIndex]
    setFiltredQuestions(prevItems => [...prevItems, randomQuestion])
  }

  const onChangeQuestion = event => {
    const value = event.target.value

    if (value === 0) {
      setFiltredQuestions(data)

      return
    }

    const filtered = data.find(question => question.id === value)

    setQuestion(value)
    setFiltredQuestions(prevItems => [...prevItems, filtered])
  }

  const onSave = () => {
    if (filtredQuestions.length === 0) {
      setError('Veuillez sélectionner au moins une question')
      return
    }
    if (minute === 0) {
      setError('Veuillez entrer le temps')
      return
    }
    handleSaveQuestion(filtredQuestions, matiere, minute)
    resetFields()
    toggle()
  }

  const handleDelete = id => {
    console.log('here ', id)
    setFiltredQuestions(prevItems => prevItems.filter(item => item.id !== id))
  }

  // Modification du toggle dans le Dialog
  const handleClose = () => {
    resetFields()
    toggle()
  }
  const filteredQuestions = data.filter(question =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <Dialog
        open={open}
        maxWidth={'lg'}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          <Grid container spacing={2} className='d-flex items-center'>
            <Grid item sm={12}>
              <Grid item xs={2}>
                <div>{matiere?.title}</div>
              </Grid>
              {error && (
                  <Grid item xs={10}>
                    <Alert severity="error">{error}</Alert>
                  </Grid>
                )}
            </Grid>
            <Grid item sm={12}>
              <Grid container spacing={6} className='d-flex items-end justify-end'>
                <Grid item sm={3}>
                  <CustomTextField
                    type='number'
                    label='Minute'
                    onChange={(el) => setMinute(el.target.value)}
                  />
                </Grid>
                <Grid item sm={3}>
                  <RenderSource value={source} onChange={element => handleChangeSource(element.target.value)} />
                </Grid>
                <Grid item sm={3}>
                  <CustomTextField value={question} select fullWidth label='Questions' onChange={onChangeQuestion}>
                    <MenuItem value={0}>Tous</MenuItem>
                    {data.map((question, index) => (
                      <MenuItem key={index} value={question.id}>
                        {question.title}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
                <Grid item sm={3} className='d-flex items-center'>
                  <Button onClick={handleRandomQuestion}>Random Question</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="Rechercher une question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2, maxHeight: '100px', overflow: 'auto' }}>
              {filteredQuestions.map((question) => (
                <Grid item xs={12} key={question.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={filtredQuestions.find(item => item.id === question.id)}
                            onChange={() => onChangeQuestion({
                              target: {
                                value: question.id
                              }
                            })}
                          />
                        }
                        label={
                          <Typography variant="body1">
                            {question.title}
                          </Typography>
                        }
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Divider />
          <List sx={{ maxHeight: 560, bgcolor: 'background.paper' }}>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={filtredQuestions} strategy={verticalListSortingStrategy}>
                {filtredQuestions.map((question, index) => (
                  <SortableItem
                    key={question.id}
                    id={question.id}
                    index={index}
                    question={question}
                    onDelete={handleDelete}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </List>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={onSave}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddQuestionMatier
