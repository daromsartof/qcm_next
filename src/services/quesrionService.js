import axios from "axios"

const getAllQuestions = async () =>{
    try {
        const response = await axios.get('/api/question')

        
return response.data
    } catch (error) {
        throw new Error(error)
    }
}

const createQuestion = async (data) => {
    try {
        const response = await axios.post('/api/question', {
            "name": data.name,
            "matiereId": data.matiereId,
            "sourceId": data.sourceId,
            "categorieId": data.categorieId,
            "isMultichoise": data.isMultichoise,
            "explaination": data.explaination,
            "reponses": data.reponses.map(r => ({
                "name": r.title,
                "explaination": r.explaination,
                "isCorrect": r.isCorrect ? 1 : 0,
            }))
        })

        
return response.data
    } catch (error) {
        throw new Error(error)
    }
}

const deleteQuestion = async (id) => {
    try {
        const res = await axios.delete(`/api/question?id=${id}`)

        
return res.data
    } catch (error) {
        throw new Error(error)
    }
}

export {
    getAllQuestions,
    deleteQuestion,
    createQuestion
}