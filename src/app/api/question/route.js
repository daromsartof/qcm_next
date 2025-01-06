import { NextResponse } from "next/server";

import QuestionRepositorie from "@/repositories/QuestionRepositorie";

export async function POST(req) {
    try {
        const body = await req.json();
        const question = await QuestionRepositorie.createQuestion(body);

        
return NextResponse.json(question);
    } catch (error) {
        console.error(error);
        
return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);

        const filters = {
            categoryId: searchParams.get("categoryId"),
            sourceId: searchParams.get("sourceId"),
            matiereId: searchParams.get("matiereId"),
        };

        const questions = await QuestionRepositorie.getAllQuestions(filters);

        
return NextResponse.json(questions);
    } catch (error) {
        console.error(error);
        
return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const question = await QuestionRepositorie.updateQuestion(body);

        
return NextResponse.json(question);
    } catch (error) {
        console.error(error);
        
return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await QuestionRepositorie.deleteQuestion(parseInt(id));
        
return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        
return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}