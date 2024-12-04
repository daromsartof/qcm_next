import { NextResponse } from "next/server";

export async function POST(req) {
    console.log(await req.json())
    return NextResponse.json([])
}