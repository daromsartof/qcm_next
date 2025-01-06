import axios from 'axios'

const getAllMatieres = async () => {
  try {
    const response = await axios.get('/api/matiere')

    
return response.data
  } catch (error) {
    throw new Error(error)
  }
}

const createMatiere = async ({ name }) => {
  try {
    const response = await axios.post('/api/matiere', {
      name
    })

    
return response.data
  } catch (error) {
    throw new Error(error)
  }
}

const updateMatiere = async ({ id, name }) => {
  try {
    const response = await axios.put('/api/matiere', {
      id,
      name
    })

    
return response.data
  } catch (error) {
    throw new Error(error)
  }
}

const deleteMatiere = async (id) => {
  try {
    const response = await axios.delete(`/api/matiere?id=${id}`)

    
return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export {
  getAllMatieres,
  createMatiere,
  updateMatiere,
  deleteMatiere
}
