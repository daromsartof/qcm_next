import { NextResponse } from "next/server";

import QuizRepositorie from "@/repositories/QuizRepositorie";


export async function GET(req) {
    try {
        const quizzes = await QuizRepositorie.getAllQuizzes()


        return NextResponse.json(quizzes)
    } catch (error) {
        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json();

        const quiz = await QuizRepositorie.createQuiz({
            title: body.title,
            categoryId: body.categoryId,
            matieresIds: body.quizMatieres,
            questionIds: body.quizQuestions
        })
        
        console.log(quiz)

        
        return NextResponse.json(quiz)
    } catch (error) {
        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}