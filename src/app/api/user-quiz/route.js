import quizUserAnswerRepositorie from "@/repositories/QuizUserAnswerRepositorie";
import { NextResponse } from "next/server";

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
