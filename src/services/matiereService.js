import axios from "axios"

const getAllMatieres = async () => {
    try {
        const response = await axios.get('/api/matiere')

        
return response.data
    } catch (error) {
        throw new Error(error)
    }
}

const createOneMatiere = async ({
    name
}) => {
    try {
        const response = await axios.post('/api/matiere', {
            name
        })

        
return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export {
    getAllMatieres,
    createOneMatiere
}