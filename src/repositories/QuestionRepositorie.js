
// QuestionRepositorie.js:

import prisma from "@/services/Utils/prisma"
import ReponseRepositorie from "./ReponseRepositorie"

class QuestionRepositorie {

// independant pour le filtre par titre
async getQuestionsByTitle(title) {
    return await prisma.question.findMany({
        where: {
          title: {
            contains: title, 
          },
          isDeleted: false,
        },
        select: {
          id: true,
          title: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
}
//

    async createQuestion({
        title,
        content,
        categoryId,
        sourceId,
        matiereId,
        fieReponse,
        isMultichoise,
        fileUrl,
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
                fileUrl,
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
        const { categoryId, sourceId, matiereId, strict } = filters

        const where = {
            isDeleted: false,
            OR: []
        }
        if (strict) {
            if (categoryId) where.categoryId = parseInt(categoryId)
            if (sourceId) where.sourceId = parseInt(sourceId)
            if (matiereId) where.matiereId = parseInt(matiereId)
        } else {
            if (categoryId) where.OR.push({ categoryId: parseInt(categoryId) })
            if (sourceId) where.OR.push({ sourceId: parseInt(sourceId) })
            if (matiereId) where.OR.push({ matiereId: parseInt(matiereId) })
        }

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
        });
    }

    async getAllQuestionIds() {
        return prisma.question.findMany({
            select: {
                id: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async updateQuestion({
        id,
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
        const question = await prisma.question.update({
            where: {
                id : parseInt(id)
            },
            data: {
                title,
                description: content,
                categoryId,
                sourceId,
                updatedAt: new Date(),
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
                return await ReponseRepositorie.updateAnswer(reponse.id, {
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

    async deleteQuestion(id) {
        return prisma.question.update({
            where: { id },
            data: { isDeleted: true }
        });
    }
}

const question = new QuestionRepositorie();

export default question;
