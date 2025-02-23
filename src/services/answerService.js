import axios from "axios"

const getAnswers = async ({
    questionId,
    answerId = null
}) => {
    try {
        const response = await axios.get('/api/answers', {
            params: {
                questionId,
                answerId
            }
        })


        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export {
    getAnswers
}