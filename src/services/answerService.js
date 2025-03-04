
//answeService.js

import axios from "axios";

const getAnswers = async ({ questionId = null, answerId = null } = {}) => {
    try {
        if (!questionId) {
            console.error(" ERREUR: `questionId` est requis !");
            throw new Error("questionId est requis");
        }

        console.log(" Envoi requête GET /api/answers avec:", { questionId, answerId });

        const response = await axios.get('/api/answers', {
            params: {
                questionId,
                answerId
            }
        });

        console.log(" Réponse reçue:", response.data);
        return response.data;
    } catch (error) {
        console.error(" Erreur Axios:", error.response?.data || error.message);
        throw new Error(error.response?.data?.error || "Erreur inattendue");
    }
}

const createAnswer = async (answerData) => {
    try {
        console.log(" Envoi requête POST /api/answers avec:", answerData);
        
        const response = await axios.post('/api/answers', answerData);
        
        console.log(" Réponse de l'API:", response.data);
        return response.data;
    } catch (error) {
        console.error(" Erreur Axios:", error.response?.data || error.message);
        throw new Error(error.response?.data?.error || "Erreur inattendue");
    }
}


const updateAnswer = async (id, answerData) => {
    try {
        console.log("Envoi requête PUT /api/answers avec:", { id, ...answerData });

        const response = await axios.put('/api/answers', { id, ...answerData });

        console.log("Réponse de l'API:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur Axios:", error.response?.data || error.message);
        throw new Error(error.response?.data?.error || "Erreur inattendue");
    }
};


const deleteAnswer = async (id) => { 
    try {
        console.log("Envoi requête DELETE /api/answers avec ID:", id);
        
        const response = await axios.delete(`/api/answers`, {
            data: { id }
        });

        console.log("Réponse de l'API:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur Axios:", error.response?.data || error.message);
        throw new Error(error.response?.data?.error || "Erreur inattendue");
    }
};



export { getAnswers, createAnswer, updateAnswer, deleteAnswer };

