
import { NextResponse } from 'next/server'

import QuestionRepositorie from '@/repositories/QuestionRepositorie'
import { uploadImage } from '@/services/api/uploadService';

export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get('title');
    const content = formData.get('content');
    const categoryId = parseInt(formData.get('categoryId'));
    const sourceId = parseInt(formData.get('sourceId'));
    const matiereId = parseInt(formData.get('matiereId'));
    const isMultichoise = formData.get('isMultichoise') === 'true';
    const image = formData.get('image');
    const reponseImage = formData.get('reponseImage');

    let fileUrl = null;

    if (image) {
      fileUrl = await uploadImage(image);
    }

    let fieReponse = null;

    if (reponseImage) {
      fieReponse = await uploadImage(reponseImage);
    }

    const reponses = [];

    for (const entry of formData.entries()) {
      const [key, value] = entry;

      if (key.startsWith('reponses[')) {
        reponses.push(JSON.parse(value));
      }
    }

    const question = await QuestionRepositorie.createQuestion({
      title,
      content,
      categoryId,
      sourceId,
      matiereId,
      isMultichoise,
      fileUrl,
      fieReponse,
      reponses,
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error(error);
    
return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


//rouvelles function:

export async function GET(req) {
  try {
    console.log("API /api/question appelée");
    const { searchParams } = new URL(req.url);

    const filters = {
      categoryId: searchParams.get('categoryId'),
      sourceId: searchParams.get('sourceId'),
      matiereId: searchParams.get('matiereId'),
      strict: searchParams.get('strict')
    }

    const questions = await QuestionRepositorie.getAllQuestions(filters)

    return NextResponse.json(questions)
  } catch (error) {
    console.error(" Erreur dans GET /api/question:", error);
    
return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const question = await QuestionRepositorie.updateQuestion(body);

    return NextResponse.json(question);
  } catch (error) {
    console.error(error);
    
return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await QuestionRepositorie.deleteQuestion(parseInt(id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    
return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
