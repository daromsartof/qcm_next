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
                content,
                categoryId,
                sourceId,
                matiereId,
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
                question: question.id,
                title: reponse.name,
                description: reponse.explaination,
                isCorrect: reponse.isCorrect
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