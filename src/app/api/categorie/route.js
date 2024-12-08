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
        return NextResponse.json({ error: "unexpected error"}, { status: 500 })
    }
}

export async function GET(req) {
    try {
        const sources = await CategorieRepositorie.getAllCategories()

        
return NextResponse.json(sources)
    } catch (error) {
        return NextResponse.json({ error: "unexpected error"}, { status: 500 })
    }
}