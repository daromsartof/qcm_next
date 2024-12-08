import axios from "axios"

const getAllSources = async () => {
    try {
        const response = await axios.get('/api/source')

        
return response.data
    } catch (error) {
        throw new Error(error)
    }
}

const createOneSource = async ({
    name
}) => {
    try {
        const response = await axios.post('/api/source', {
            name
        })

        
return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export {
    getAllSources,
    createOneSource
}