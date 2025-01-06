import axios from 'axios'

export const getAllSources = async () => {
  try {
    const response = await axios.get('/api/source')

    
return response.data
  } catch (error) {
    throw error
  }
}

export const createSource = async (data) => {
  try {
    const response = await axios.post('/api/source', data)

    
return response.data
  } catch (error) {
    throw error
  }
}

export const updateSource = async (data) => {
  try {
    const response = await axios.put('/api/source', data)

    
return response.data
  } catch (error) {
    throw error
  }
}

export const deleteSource = async (id) => {
  try {
    const response = await axios.delete(`/api/source?id=${id}`)

    
return response.data
  } catch (error) {
    throw error
  }
}