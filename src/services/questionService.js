import axios from 'axios'

export const getAllQuestions = async (filters = {}) => {
  try {
    const { categoryId, sourceId, matiereId } = filters
    let url = '/api/question'
    const params = new URLSearchParams()

    if (categoryId) params.append('categoryId', categoryId)
    if (sourceId) params.append('sourceId', sourceId)
    if (matiereId) params.append('matiereId', matiereId)

    const queryString = params.toString()

    if (queryString) {
      url += `?${queryString}`
    }

    const response = await axios.get(url)

    
return response.data
  } catch (error) {
    throw error
  }
}

export const createQuestion = async (data) => {
  try {
      const response = await axios.post('/api/question', {
          "title": data.title,
          "matiereId": data.matiereId,
          "sourceId": data.sourceId,
          "categoryId": data.categorieId,
          "isMultichoise": data.isMultichoise,
          "content": data.explaination,
          "reponses": data.reponses.map(r => ({
              "title": r.title,
              "explaination": r.explaination,
              "isCorrect": r.isCorrect ? 1 : 0,
          }))
      })


      return response.data
  } catch (error) {
      throw new Error(error)
  }
}

export const updateQuestion = async (data) => {
  try {
    const response = await axios.put('/api/question', data)

    
return response.data
  } catch (error) {
    throw error
  }
}

export const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`/api/question?id=${id}`)

    
return response.data
  } catch (error) {
    throw error
  }
}
