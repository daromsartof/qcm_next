import axios from "axios"

const getAllCategories = async () => {
    try {
        const response = await axios.get('/api/categorie')
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

const createOneCategorie = async ({ name }) => {
    try {
        const response = await axios.post('/api/categorie', {
            name
        })
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

const updateCategorie = async ({ id, name }) => {
    try {
        const response = await axios.put('/api/categorie', {
            id,
            name
        })
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

const deleteCategorie = async (id) => {
    try {
        const response = await axios.delete(`/api/categorie?id=${id}`)
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export {
    getAllCategories,
    createOneCategorie,
    updateCategorie,
    deleteCategorie
}