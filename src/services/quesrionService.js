import axios from "axios"

const getAllQuestions = async () =>{
    try {
        const response = await axios.get('/api/question')
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export {
    getAllQuestions
}