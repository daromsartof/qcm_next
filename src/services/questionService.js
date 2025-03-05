import axios from 'axios'

export const getAllQuestions = async (filters = {}) => {
  try {
    const { categoryId, sourceId, matiereId, strict } = filters
    let url = '/api/question'
    const params = new URLSearchParams()

    if (categoryId) params.append('categoryId', categoryId)
    if (sourceId) params.append('sourceId', sourceId)
    if (matiereId) params.append('matiereId', matiereId)
    if (strict) params.append('strict', strict)

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

export const createQuestion = async ({
  title,
  matiereId,
  sourceId,
  categoryId,
  reponseImage,
  isMultichoise,
  content,
  image,
  reponses = [],
}) => {
  try {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('matiereId', matiereId);
    formData.append('sourceId', sourceId);
    formData.append('categoryId', categoryId);
    formData.append('isMultichoise', isMultichoise);
    formData.append('content', content);
    
    if (image) {
      const img = image[0]
      formData.append('image', img);
    }

    if(reponseImage) formData.append('reponseImage', reponseImage[0]);

    reponses.forEach((reponse, index) => {
      formData.append(`reponses[${index}]`, JSON.stringify(reponse));
    });

    const response = await axios.post('/api/question', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};


export const updateQuestion = async (id, data) => {
  try {
    console.log(" data ", data)
    
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('matiereId', data.matiereId);
    formData.append('sourceId', data.sourceId);
    formData.append('categoryId', data.categoryId);
    formData.append('isMultichoise', data.isMultichoise);
    formData.append('content', data.content);
    
    if (data.image) {
      const img = data.image[0]
      formData.append('image', img);
    }

    if(data.reponseImage) formData.append('reponseImage', data.reponseImage[0]);

    data.reponses.forEach((reponse, index) => {
      formData.append(`reponses[${index}]`, JSON.stringify(reponse));
    });


    const response = await axios.put(`/api/question/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
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
