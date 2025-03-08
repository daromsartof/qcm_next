import { NextResponse } from "next/server";

import quizUserAnswerRepositorie from "@/repositories/QuizUserAnswerRepositorie";

export async function POST(req) {
    try {
        const { quizId, data, userId } = await req.json();

        const quizUserAnswer = await quizUserAnswerRepositorie.createQuizUserAnswer({
            quizId,
            userId,
            datas: data
        })


        return NextResponse.json(quizUserAnswer)
    } catch (error) {
        console.error(error)

        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId')
        console.log(userId)
        const quizUserAnswer = await quizUserAnswerRepositorie.getUserStats(userId)
        console.log(quizUserAnswer)
        

        return NextResponse.json(quizUserAnswer)
    } catch (error) {
        console.error(error)

        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}