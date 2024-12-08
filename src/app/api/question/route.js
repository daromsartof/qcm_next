import { NextResponse } from "next/server";

import QuestionRepositorie from "@/repositories/QuestionRepositorie";

export async function POST(req) {
    try {
        const {
            name,
            matiereId,
            sourceId,
            categorieId,
            isMultichoise,
            reponses,
            explaination
        } = await req.json()

        if (!name || !matiereId || !sourceId || !categorieId) {
            return NextResponse.json({ error: "field missing" }, { status: 400 })
        }

        const question = await QuestionRepositorie.createQuestion({
            title: name,
            matiereId,
            sourceId,
            reponses,
            categoryId: categorieId,
            isMultichoise,
            description: explaination
        })

        
return NextResponse.json(question)
    } catch (error) {
        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}

export async function GET(req) {
    try {
        const questions = await QuestionRepositorie.getAllQuestions()

        
return NextResponse.json(questions)
    } catch (error) {
        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}

export async function DELETE(req) {
    try {
        const url = new URL(req.url)
        const id = url.searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: "id missing" }, { status: 400 })
        }

        const question = await QuestionRepositorie.deleteQuestion(
            parseInt(id)
        )

        
return NextResponse.json(question)
    } catch (error) {
        console.log(error)
        
return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}