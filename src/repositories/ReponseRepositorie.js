import prisma from "@/services/Utils/prisma"

class ReponseRepositorie {
    async createReponse({
        question,
        description,
        title,
        isCorrect
    }, include = {}) {
        return prisma.answer.create({
            data: {
                question,
                title,
                description,
                isCorrect: isCorrect === 1
            },
            include: {
                ...include
            }
        })
    }
}

export default new ReponseRepositorie()