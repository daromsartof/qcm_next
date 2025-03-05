
//questionService.js :

import axios from 'axios';

/**
 * Récupère toutes les questions avec des filtres optionnels.
 * @param {Object} filters - Filtres pour la requête (categoryId, sourceId, matiereId)
 * @returns {Promise<Array>} Liste des questions
 */
export const getAllQuestions = async (filters = {}) => {
  try {
    const { categoryId, sourceId, matiereId, strict } = filters
    let url = '/api/question'
    const params = new URLSearchParams()

    if (categoryId) params.append('categoryId', categoryId)
    if (sourceId) params.append('sourceId', sourceId)
    if (matiereId) params.append('matiereId', matiereId)
    if (strict) params.append('strict', strict)

    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des questions:', error);
    throw new Error('Impossible de récupérer les questions');
  }
};

/**
 * Nouvelle fonction pour récupérer des questions, utilisée dans AnswerForm.
 * @returns {Promise<Array>} Liste des questions
 */
export const getQuestions = async () => {
  try {
    const response = await axios.get('/api/question');
    console.log(" Données reçues de l'API question:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des questions:", error);
    throw new Error("Erreur lors du chargement des questions");
  }
};


/**
 * Création d'une nouvelle question.
 * @param {Object} data - Données de la question
 * @returns {Promise<Object>} La question créée
 */
export const createQuestion = async ({ title, matiereId, sourceId, categoryId, reponseImage, isMultichoise, content, image,
  reponses = [],
}) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('matiereId', matiereId);
    formData.append('sourceId', sourceId);
    formData.append('categoryId', categoryId);
    formData.append('isMultichoise', isMultichoise);
    formData.append('content', content);

    if (image?.length) formData.append('image', image[0]);
    if (reponseImage?.length) formData.append('reponseImage', reponseImage[0]);

    reponses.forEach((reponse, index) => {
      formData.append(`reponses[${index}]`, JSON.stringify(reponse));
    });

    const response = await axios.post('/api/question', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la question:', error);
    throw new Error('Impossible de créer la question');
  }
};

/**
 * Mise à jour d'une question existante.
 * @param {Object} data - Données mises à jour
 * @returns {Promise<Object>} La question mise à jour
 */
export const updateQuestion = async (id, data) => {
  try {
    console.log(" data ", data)
    
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('matiereId', data.matiereId);
    formData.append('sourceId', data.sourceId);
    formData.append('categoryId', data.categoryId);
    formData.append('isMultichoise', data.isMultichoise);
    formData.append('content', data.content);
    
    if (data.image) {
      const img = data.image[0]
      formData.append('image', img);
    }

    if(data.reponseImage) formData.append('reponseImage', data.reponseImage[0]);

    data.reponses.forEach((reponse, index) => {
      formData.append(`reponses[${index}]`, JSON.stringify(reponse));
    });


    const response = await axios.put(`/api/question/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    return response.data
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la question:', error);
    throw new Error('Impossible de mettre à jour la question');
  }
};

/**
 * Suppression d'une question par ID.
 * @param {string} id - ID de la question à supprimer
 * @returns {Promise<Object>} Réponse du serveur
 */
export const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`/api/question?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de la question:', error);
    throw new Error('Impossible de supprimer la question');
  }
};

//independant pour le filtre par titre
export const getQuestionsByTitle = async (title) => {
  try {
    const response = await axios.get(`/api/question/title?title=${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    console.error(" Erreur lors de la récupération des questions par titre:", error);
    throw new Error("Impossible de récupérer les questions par titre");
  }
};
