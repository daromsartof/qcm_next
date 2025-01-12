'use client'
import { useEffect, useState } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem } from '@mui/material'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import RenderSource from '@/components/RenderSource'
import CustomTextField from '@/@core/components/mui/TextField'

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

const AddQuestionMatier = ({ open, matiere, toggle, questions, handleSaveQuestion }) => {
  const [data, setData] = useState([])
  const [source, setSources] = useState("")
  const [filtredQuestions, setFiltredQuestions] = useState([])
  const [question, setQuestion] = useState("")


  //  const [items] = useState([1, 2, 3])
  const handleChangeSource = value => {
    setSources(value)

    if (value === 0) {
      setData(questions)

      return
    }

    const filtered = questions.filter(question => question.Source?.id === value)

    //setFiltredQuestions(filtered)
    setData([...filtered])
  }

  // const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);

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
    handleSaveQuestion(filtredQuestions, matiere)
    setFiltredQuestions([])

    toggle()
  }

  const handleDelete = id => {
    console.log('here ', id)

    //  setFiltredQuestions((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  useEffect(() => {
    setData([...questions])

    // setFiltredQuestions(questions)
    return () => {
      setData([])
    }
  }, [questions])

  return (
    <div>
      <Dialog open={open} maxWidth={'lg'} fullWidth={true} onClose={toggle} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>
          <Grid container spacing={2} className='d-flex items-center'>
            <Grid item sm={3} className='d-flex items-center'>
              <div>{matiere.title}</div>
            </Grid>
            <Grid item sm={9}>
              <Grid container spacing={6} className='d-flex items-end justify-end'>
                <Grid item sm={4}>
                  <RenderSource value={source} onChange={element => handleChangeSource(element.target.value)} />
                </Grid>
                <Grid item sm={5}>
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
                  <Button>Random Question</Button>
                </Grid>
              </Grid>
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
          <Button onClick={toggle}>Annuler</Button>
          <Button onClick={onSave}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddQuestionMatier
