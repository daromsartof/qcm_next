import { NextResponse } from "next/server";

import SourceRepositorie from "@/repositories/SourceRepositorie";

export async function POST(req) {
    try {
        const { name } = await req.json();

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 })
        }

        const sources = await SourceRepositorie.createSource({
            name
        })

        
return NextResponse.json(sources)
    } catch (error) {
        return NextResponse.json({ error: "unexpected error"}, { status: 500 })
    }
}

export async function GET(req) {
    try {
        const sources = await SourceRepositorie.getAllSources()

        
return NextResponse.json(sources)
    } catch (error) {
        return NextResponse.json({ error: "unexpected error"}, { status: 500 })
    }
}