import prisma from "@/services/Utils/prisma"

class ReponseRepositorie {
    async createReponse({
        questionId,
        description,
        title,
        isCorrect
    }, include = {}) {
        return prisma.answer.create({
            data: {
                questionId,
                title,
                description,
                isCorrect
            },
            include: {
                ...include
            }
        })
    }
}

const response =  new ReponseRepositorie()

export default response