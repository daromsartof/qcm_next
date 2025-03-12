import { NextResponse } from "next/server";

import QuizRepositorie from "@/repositories/QuizRepositorie";


export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get('categoryId')
        const status = searchParams.get('status')   
        const premium = searchParams.get('premium')

        const quizzes = await QuizRepositorie.getAllQuizzes({
            categoryId,
            status,
            premium
        })


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

        return NextResponse.json(quiz)
    } catch (error) {
        console.log(error)

        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 })
        }

        await QuizRepositorie.deleteQuiz(id)

        return NextResponse.json({ message: "Quiz deleted successfully" })
    } catch (error) {
        console.log(error)

        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')
        const body = await req.json()

        if (!id) {
            return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 })
        }

        const updatedQuiz = await QuizRepositorie.updateQuiz(id, {
            title: body.title,
            categoryId: body.categoryId,
            matieresIds: body.quizMatieres,
            questionIds: body.quizQuestions,
            is_active: body.is_active,
            is_prenium: body.is_prenium
        })

        return NextResponse.json(updatedQuiz)
    } catch (error) {
        console.log(error)

        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}