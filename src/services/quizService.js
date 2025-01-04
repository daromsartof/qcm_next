import axios from 'axios'


export const getAllQuizzes = async () => {
    try {
        const response = await axios.get('/api/quiz')
        return response.data
    } catch (error) {
        throw error
    }
}