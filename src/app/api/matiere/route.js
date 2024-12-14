import { NextResponse } from "next/server";

import MatiereRepositorie from "@/repositories/MatiereRepositorie";

export async function POST(req) {
    try {
        const { name } = await req.json();

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 })
        }

        const matiere = await MatiereRepositorie.createMatiere({
            name
        })


        return NextResponse.json(matiere)
    } catch (error) {
        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}

export async function GET(req) {
    try {
        const matieres = await MatiereRepositorie.getAllMatieres()


        return NextResponse.json(matieres)
    } catch (error) {
        return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        const body = await req.json()
        const { id, name, description } = body

        const category = await MatiereRepositorie.updateMatiere({
            id,
            name,
            description
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

        await MatiereRepositorie.deleOneMatiere(parseInt(id))

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}