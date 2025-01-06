import { NextResponse } from "next/server";

import CategorieRepositorie from "@/repositories/CategorieRepositorie";

export async function POST(req) {
    try {
        const { name } = await req.json();

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 })
        }

        const sources = await CategorieRepositorie.createCategorie({
            name
        })


        return NextResponse.json(sources)
    } catch (error) {
        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}

export async function GET(req) {
    try {
        const sources = await CategorieRepositorie.getAllCategories()


        return NextResponse.json(sources)
    } catch (error) {
        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        const body = await req.json()
        const { id, name } = body

        const category = await CategorieRepositorie.updateCategorie({
            id,
            name
        })

        return NextResponse.json(category)
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

        await CategorieRepositorie.deleteCategorie(parseInt(id))

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        
return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}