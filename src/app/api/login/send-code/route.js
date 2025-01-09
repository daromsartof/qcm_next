import { NextResponse } from "next/server"

import userRepo from "@/repositories/UserRepositorie";
import VerificationCode from "@/repositories/VerificationCodeRepositorie";

export async function POST(req){
    try {
        const { email } = await req.json()

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400, statusText: "Bad Request" });
        }

        const user = await userRepo.getUserByEmail({
            email
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404, statusText: 'Not Found' });
        }

        const verificationCode = await VerificationCode.createVerificationCode({
            userId: user.id
        })


        /*const mailOptions = {
            from: 'romeo.ericka.razaka@gmail.com',
            to: email,
            subject: 'Your Verification Code',
            html: `
                <h1>Email Verification</h1>
                <p>Your verification code is: <strong>${verificationCode.code}</strong></p>
                <p>This code will expire in 10 minutes.</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);*/

       return NextResponse.json({ message: 'Verification code sent successfully', status: "ok" })
    } catch (error) {
        console.error('Error sending verification code:', error);

        return NextResponse.json({ error: 'Failed to send verification code' }, { status: 500, statusText: 'Error' })
    }
}