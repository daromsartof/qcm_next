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
        console.log(body)
        
        return NextResponse.json([])
    } catch (error) {
        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}