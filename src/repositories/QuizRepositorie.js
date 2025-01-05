import prisma from "@/services/Utils/prisma"


class QuizRepositorie {
    async getAllQuizzes() {
        return prisma.quiz.findMany({
            include: {
                Category: true,
                QuizQuestions: {
                    include: {
                        Question: true
                    }
                },
                QuizMatieres: {
                    include: {
                        Matiere: true
                    }
                }
            }
        })
    }

    async createQuiz({ title, categoryId, matieresIds, questionIds }) {
        const quiz = await prisma.quiz.create({
            data: {
                title,
                categoryId,
                QuizMatieres: {
                    createMany: {
                        data: matieresIds.map((matiereId) => ({
                            matiereOrder: matiereId.order,
                            matiereId: matiereId.matierId
                        }))
                    }
                },
                QuizQuestions: {
                    createMany: {
                        data: questionIds.map((questionId) => ({
                            questionOrder: questionId.order,
                            questionId: questionId.questionId
                        }))
                    }
                }
            }
        })

        return quiz
    }
}

const quiz = new QuizRepositorie()

export default quiz