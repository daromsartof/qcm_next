import { NextResponse } from "next/server"

import jwt from 'jsonwebtoken'

import VerificationCode from "@/repositories/VerificationCodeRepositorie";

export async function POST(req) {
    try {
        const { email, code } = await req.json()
        
        if (!email || !code) {
            return NextResponse.json({ error: "Email and code are required" }, { status: 400, statusText: "Bad Request" })
        }

        const verificationCode = await VerificationCode.getVerificationCodeByUserEmail({
            email
        })

        
        if (!verificationCode) {
            return NextResponse.json({ error: "No verification code found for this email" }, { status: 400, statusText: "Bad Request" })
        }

        if (Date.now() - (new Date(verificationCode.expiresAt)).getTime() > 10 * 60 * 1000) {
            VerificationCode.deleteVerificationCodeById(verificationCode.id)

            return NextResponse.json({ error: 'Verification code has expired' }, { status: 400, statusText: "Bad Request" })
        }
    
        if (verificationCode.code !== code) {

            return NextResponse.json({ error: 'Invalid verification code' }, { status: 400, statusText: "Bad Request" })
        }

        const user = verificationCode.User

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        VerificationCode.deleteVerificationCodeById(verificationCode.id)

        return NextResponse.json({ message: 'Email verified successfully', 
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.error('Error sending verification code:', error);

        return NextResponse.json({ error: 'Failed to send verification code' }, { status: 500, statusText: 'Error' })
    }
}