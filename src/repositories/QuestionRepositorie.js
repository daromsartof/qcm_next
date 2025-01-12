import prisma from "@/services/Utils/prisma"

import ReponseRepositorie from "./ReponseRepositorie"

class QuestionRepositorie {
    async createQuestion({
        title,
        content,
        categoryId,
        sourceId,
        matiereId,
        isMultichoise,
        reponses = []
    }){
        const question = await prisma.question.create({
            data:{
                title,
                description: content,
                categoryId: parseInt(categoryId),
                sourceId: parseInt(sourceId),
                matiereId: parseInt(matiereId),
                isMultiChoice: isMultichoise === 1
            },
            include: {
                Category: true,
                Source: true,
                Matiere: true
            }
        })

        const reponseData = await Promise.all(reponses.map(async reponse => {
            return await ReponseRepositorie.createReponse({
                questionId: question.id,
                title: reponse.title,
                description: reponse.explaination,
                isCorrect: reponse.isCorrect === 1
            })
        }))

        return {
            ...question,
            answers: reponseData
        }
    }

    async getAllQuestions(filters = {}) {
        const { categoryId, sourceId, matiereId } = filters
        
        const where = {
            isDeleted: false,
            Category: {
                isDeleted: false
            },
            Source: {
                isDeleted: false
            },
            Matiere: {
                isDeleted: false
            }
        }

        if (categoryId) where.categoryId = parseInt(categoryId)
        if (sourceId) where.sourceId = parseInt(sourceId)
        if (matiereId) where.matiereId = parseInt(matiereId)

        return prisma.question.findMany({
            where,
            include: {
                Category: true,
                Source: true,
                answers: true,
                Matiere: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    async updateQuestion({
        id,
        title,
        content,
        categoryId,
        sourceId,
        matiereId
    }) {
        return prisma.question.update({
            where: { id },
            data: {
                title,
                content,
                categoryId,
                sourceId,
                matiereId
            }
        })
    }

    async deleteQuestion(id) {
        return prisma.question.update({
            where: { id },
            data: { isDeleted: true }
        })
    }
}

const question = new QuestionRepositorie()

export default question