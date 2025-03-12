import { NextResponse } from 'next/server'

import QuestionRepositorie from '@/repositories/QuestionRepositorie'
import { uploadImage } from '@/services/api/uploadService';

export async function PUT(req, { params }) {
    try {
      const { id } = params

      const formData = await req.formData();
  
      // Récupérer les champs du formulaire
      const title = formData.get('title') || undefined;
      const content = formData.get('content') || undefined;
      const categoryId = parseInt(formData.get('categoryId')) || undefined;
      const sourceId = parseInt(formData.get('sourceId')) || undefined;
      const matiereId = parseInt(formData.get('matiereId')) || undefined;
      const isMultichoise = formData.get('isMultichoise') === 'true' ;
      const image = formData.get('image'); // Fichier image
      const reponseImage = formData.get('reponseImage'); // Fichier image de la réponse
  
      // Upload de l'image si présente
      let fileUrl = null;

      if (image) {
        fileUrl = await uploadImage(image);
      }
  
      let fieReponse = null

      if (reponseImage) {
        fieReponse = await uploadImage(reponseImage);
      }
  
      // Extraction des réponses depuis FormData
      const reponses = [];

      for (const entry of formData.entries()) {
        const [key, value] = entry;

        if (key.startsWith('reponses[')) {
          //reponses.push(JSON.parse(value)); // Supposant que les réponses sont envoyées sous forme JSON
          // Extract the index from the key (e.g., "reponses[0]" -> "0")
          const match = key.match(/\[(\d+)\]/);

          if (match) {
            const index = parseInt(match[1]);


            // If this is an ID field, parse it separately
            if (key.endsWith('[id]')) {
              reponses[index] = {
                ...reponses[index],
                id: parseInt(value)
              }
            }

            // If this is a title field, parse it separately  
            else if (key.endsWith('[title]')) {
              reponses[index] = {
                ...reponses[index],
                title: value
              }
            }

            // If this is an isCorrect field, parse it separately
            else if (key.endsWith('[isCorrect]')) {
              reponses[index] = {
                ...reponses[index],
                isCorrect: parseInt(value)
              }
            }
          }
        }
      }
  
      // Création de la question en base de données
      const question = await QuestionRepositorie.updateQuestion({
        id,
        title,
        content,
        categoryId,
        sourceId,
        matiereId,
        isMultichoise,
        fileUrl :  fileUrl || undefined,
        fieReponse: fieReponse || undefined,
        reponses,
      });
  
      return NextResponse.json(question);
    } catch (error) {
      console.error(error);
      
return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  