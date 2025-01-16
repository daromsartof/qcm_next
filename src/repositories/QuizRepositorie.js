import prisma from "@/services/Utils/prisma"


class QuizRepositorie {
    async getAllQuizzes() {
        return prisma.quiz.findMany({
            include: {
                category: true,
                quizQuestions: {
                    include: {
                        question: true
                    }
                },
                quizMatieres: {
                    include: {
                        matiere: true
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
                quizMatieres: {
                    createMany: {
                        data: matieresIds.map((matiereId) => ({
                            matiereOrder: matiereId.order,
                            matiereId: matiereId.matierId
                        }))
                    }
                },
                quizQuestions: {
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