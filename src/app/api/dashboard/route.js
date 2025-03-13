import { NextResponse } from "next/server";

import QuizRepositorie from "@/repositories/QuizRepositorie";
import UserRepositorie from "@/repositories/UserRepositorie";

export async function GET() {
    try {
        const utilisateur_actif = await UserRepositorie.getAllUsers()
        const today = new Date();
        const lastWeek = new Date(today);

        lastWeek.setDate(today.getDate() - 7);

        const usersByDay = await UserRepositorie.getUsersByDateRange(lastWeek, today);
        
        // Group users by day
        const dailySignups = {};

        usersByDay.forEach(user => {
            const date = new Date(user.createdAt).toISOString().split('T')[0];

            dailySignups[date] = (dailySignups[date] || 0) + 1;
        });

        // Fill in missing days with 0
        for (let d = new Date(lastWeek); d <= today; d.setDate(d.getDate() + 1)) {
            const date = d.toISOString().split('T')[0];

            if (!dailySignups[date]) {
                dailySignups[date] = 0;
            }
        }

        const quiz_actif = await QuizRepositorie.getAllQuizzes({
            status: "active"
        })

        const quiz_prenium = await QuizRepositorie.getAllQuizzes({
            premium: "premium"
        })


        return NextResponse.json({
            utilisateur_actif: utilisateur_actif.length,
            quiz_actif: quiz_actif.length,
            dailySignups,
            quiz_prenium: quiz_prenium.length
        })
    } catch (error) {
        console.log(error)
        
return NextResponse.json({ error: "unexpected error" }, { status: 500 })
    }
}