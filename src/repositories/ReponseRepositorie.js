
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

    async getAnswers({
        questionId
    }) {
        return await prisma.answer.findMany({
            where: {
                ...(questionId && {
                    questionId: Number(questionId)
                }),
                isDeleted: false
            }
        })
    }

    async updateAnswer(id, data) {
        return await prisma.answer.update({
            where: { id: Number(id) },
            data
        })
    }
}

const response =  new ReponseRepositorie()

export default response