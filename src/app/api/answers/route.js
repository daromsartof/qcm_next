
//route de answer
import { NextResponse } from "next/server";
import ReponseRepositorie from "@/repositories/ReponseRepositorie";

export async function GET(req) {
    console.log("API GET reponses hit");  //log pour voir si l'API est bien appelée
    
    try {
        const { searchParams } = new URL(req.url);
        const questionId = searchParams.get('questionId');

        if (!questionId) {
            return NextResponse.json({ error: "questionId is required" }, { status: 400 });
        }

        const answers = await ReponseRepositorie.getAnswers({ questionId });

        return NextResponse.json(answers);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "unexpected error" }, { status: 500 });
    }
}


export async function POST(req) {
    try {
        const body = await req.json()

        const answer = await ReponseRepositorie.createReponse(body) 


        return NextResponse.json(answer, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}


export async function PUT(req) {
    try {
        const body = await req.json()
        const { id, title, answerFileUrl, description, isCorrect } = body

        const answer = await ReponseRepositorie.updateAnswer(id, {
            title,
            answerFileUrl,
            description,
            isCorrect
        })

        return NextResponse.json(answer, {
            status: 200
        })
    } catch (error) {
        console.error(error)

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}


export async function DELETE(req) {
    try {
        const { id } = await req.json();  // Récupérer l'ID depuis le body de la requête

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        console.log("Suppression de la réponse avec ID:", id);
        
        await ReponseRepositorie.updateAnswer(id, { isDeleted: true }); // Modifier isDeleted à 1

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erreur serveur lors de la suppression:", error);

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
