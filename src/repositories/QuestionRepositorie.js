import prisma from "@/services/Utils/prisma"

import ReponseRepositorie from "./ReponseRepositorie"

class QuestionRepositorie {
    async createQuestion({
        title,
        content,
        categoryId,
        sourceId,
        matiereId,
        fieReponse,
        isMultichoise,
        fileUrl, // Nouvelle colonne pour l'image
        reponses = [],
    }) {
        const question = await prisma.question.create({
            data: {
                title,
                description: content,
                categoryId,
                sourceId,
                response_file_url: fieReponse,
                matiereId,
                isMultiChoice: isMultichoise,
                fileUrl, // Stocker l'image
            },
            include: {
                category: true,
                source: true,
                matiere: true,
            },
        });

        const reponseData = await Promise.all(
            reponses.map(async (reponse) => {
                return await ReponseRepositorie.createReponse({
                    questionId: question.id,
                    title: reponse.title,
                    description: reponse.explaination,
                    isCorrect: reponse.isCorrect === 1,
                });
            })
        );

        return {
            ...question,
            answers: reponseData,
        };
    }


    async getAllQuestions(filters = {}) {
        const { categoryId, sourceId, matiereId } = filters

        const where = {
            isDeleted: false,
            OR: []
        }

        if (categoryId) where.OR.push({ categoryId: parseInt(categoryId) })
        if (sourceId) where.OR.push({ sourceId: parseInt(sourceId) })
        if (matiereId) where.OR.push({ matiereId: parseInt(matiereId) })
        if (where.OR.length === 0) delete where.OR
        return prisma.question.findMany({
            where,
            include: {
                category: true,
                source: true,
                answers: true,
                matiere: true
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