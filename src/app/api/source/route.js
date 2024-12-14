import { NextResponse } from "next/server";

import SourceRepositorie from "@/repositories/SourceRepositorie";

export async function POST(req) {
    try {
        const { title } = await req.json();

        if (!title) {
            return NextResponse.json({ error: "title is required" }, { status: 400 })
        }

        const sources = await SourceRepositorie.createSource({
            name: title
        })


        return NextResponse.json(sources)
    } catch (error) {
        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}

export async function GET(req) {
    try {
        const sources = await SourceRepositorie.getAllSources()


        return NextResponse.json(sources)
    } catch (error) {
        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        const body = await req.json()
        const { id, title } = body

        const source = await SourceRepositorie.updateSource({
            id,
            name: title
        })

        return NextResponse.json(source)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 })
        }

        await SourceRepositorie.deleteSource(parseInt(id))

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}