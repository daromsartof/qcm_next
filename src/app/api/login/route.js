import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import prisma from "@/services/Utils/prisma"

export async function POST(req) {


    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: "Email and password are required" }, { status: 400, statusText: "Bad Request" });
    }

    try {
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401, statusText: 'Unauthorized Access' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401, statusText: 'Unauthorized Access' });
        }

        // Return success response
        return NextResponse.json({ message: "Login successful", userData: user });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}