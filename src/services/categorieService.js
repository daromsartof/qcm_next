import axios from "axios"

const getAllCategories = async () => {
    try {
        const response = await axios.get('/api/categorie')

        
return response.data
    } catch (error) {
        throw new Error(error)
    }
}

const createOneCategorie = async ({
    name
}) => {
    try {
        const response = await axios.post('/api/categorie', {
            name
        })

        
return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export {
    getAllCategories,
    createOneCategorie
}