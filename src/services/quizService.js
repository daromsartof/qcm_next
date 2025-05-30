import axios from 'axios'


export const getAllQuizzes = async (categoryId, status, premium) => {
    try {
        const response = await axios.get('/api/quiz', {
            params: {
                categoryId : categoryId || undefined,
                status : status || undefined,
                premium : premium || undefined
            }
        })


        return response.data
    } catch (error) {
        throw error
    }
}

export const createQuiz = async (data) => {
    try {
        const response = await axios.post('/api/quiz', data)

        return response.data
    } catch (error) {
        throw error
    }
}

export const updateQuiz = async (id, data) => {
    try {
        const response = await axios.put(`/api/quiz?id=${id}`, data)


        return response.data


    } catch (error) {
        throw error
    }
}


export const deleteQuiz = async (id) => {
    try {
        const response = await axios.delete(`/api/quiz?id=${id}`)


        return response.data
    } catch (error) {
        throw error
    }
}

export const getUserStats = async (userId) => {
    try {
        const response = await axios.get(`/api/user-quiz?userId=${userId}`)


        return response.data
    } catch (error) {
        throw error
    }
}