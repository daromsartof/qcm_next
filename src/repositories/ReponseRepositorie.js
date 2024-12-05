import prisma from "@/services/Utils/prisma"

class ReponseRepositorie {
    async createReponse({
        question,
        description,
        title,
        isCorrect
    }) {
        console.log({
            question,
            title,
            description,
            isCorrect: isCorrect === 1
        })
        return prisma.answer.create({
            data: {
                question,
                title,
                description,
                isCorrect: isCorrect === 1
            },
            include: {
                Question: true
            }
        })
    }
}

export default new ReponseRepositorie()