import QuestionRepositorie from "@/repositories/QuestionRepositorie";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const {     
            name,
            matiereId,
            sourceId,
            categorieId,
            isMultichoise,
            explaination 
        } = await req.json();
        if (!name || !matiereId || !sourceId || !categorieId) {
            return NextResponse.json({ error: "field missing" }, { status: 400 })
        }
        const question = await QuestionRepositorie.createQuestion({
            title: name,
            matiereId,
            sourceId,
            categoryId: categorieId,
            isMultichoise,
            description: explaination
        })
        return NextResponse.json(question)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "unexpected error"}, { status: 500 })
    }
}

export async function GET(req) {
    try {
        const questions = await QuestionRepositorie.getAllQuestions()
        return NextResponse.json(questions)
    } catch (error) {
        return NextResponse.json({ error: "unexpected error"}, { status: 500 })
    }
}