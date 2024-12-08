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
        return NextResponse.json({ error: "unexpected error"}, { status: 500 })
    }
}

export async function GET(req) {
    try {
        const matieres = await MatiereRepositorie.getAllMatieres()

        
return NextResponse.json(matieres)
    } catch (error) {
        return NextResponse.json({ error: "unexpected error"}, { status: 500 })
    }
}