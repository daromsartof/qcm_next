import { NextResponse } from 'next/server'

import QuestionRepositorie from '@/repositories/QuestionRepositorie'
import { uploadImage } from '@/services/api/uploadService';

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Récupérer les champs du formulaire
    const title = formData.get('title');
    const content = formData.get('content');
    const categoryId = parseInt(formData.get('categoryId'));
    const sourceId = parseInt(formData.get('sourceId'));
    const matiereId = parseInt(formData.get('matiereId'));
    const isMultichoise = formData.get('isMultichoise') === 'true';
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
        reponses.push(JSON.parse(value)); // Supposant que les réponses sont envoyées sous forme JSON
      }
    }

    // Création de la question en base de données
    const question = await QuestionRepositorie.createQuestion({
      title,
      content,
      categoryId,
      sourceId,
      matiereId,
      isMultichoise,
      fileUrl, // Stocker l'URL de l'image
      fieReponse,
      reponses,
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)

    const filters = {
      categoryId: searchParams.get('categoryId'),
      sourceId: searchParams.get('sourceId'),
      matiereId: searchParams.get('matiereId'),
      strict: searchParams.get('strict')
    }

    const questions = await QuestionRepositorie.getAllQuestions(filters)

    return NextResponse.json(questions)
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    const body = await req.json()
    const question = await QuestionRepositorie.updateQuestion(body)

    return NextResponse.json(question)
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await QuestionRepositorie.deleteQuestion(parseInt(id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
