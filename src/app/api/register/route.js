import { NextResponse } from "next/server"

import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function POST(req) {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
        return  NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = await prisma.user.create({
            data: {
                name,
                firstname: name,
                email,
                password: hashedPassword
            },
        });
        
        return NextResponse.json({ error: "User registered successfully", user }, { status: 201 })
    } catch (error) {
        console.log(error)
        
return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}