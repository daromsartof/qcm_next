import prisma from "@/services/Utils/prisma"


class QuizRepositorie {
    async getAllQuizzes({
        categoryId
    }) {
        return prisma.quiz.findMany({
            where: {
                ...(categoryId && {
                    categoryId: parseInt(categoryId)
                })
            },
            include: {
                category: true,
                quizQuestions: {
                    include: {
                        question: {
                            include: {
                                answers: {
                                    where: {
                                        isDeleted: false
                                    }
                                }
                            }
                        }
                    }
                },
                quizMatieres: {
                    include: {
                        matiere: true
                    }
                }
            }, 
            orderBy: {
                createdAt: 'desc'
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
                            matiereId: matiereId.matierId,
                            time: matiereId.time ? parseInt(matiereId.time) : 12
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

    async updateQuiz(id, { title, categoryId, matieresIds, questionIds, is_active, is_prenium }) {
        // Then update the quiz with new data
        const updatedQuiz = await prisma.quiz.update({
            where: { id: parseInt(id) },
            data: {
                ...(title && { title }),
                ...(categoryId && { categoryId }),
                ...(typeof is_active !== 'undefined' && { is_active }),
                ...(typeof is_prenium !== 'undefined' && { is_prenium }),
                ...(matieresIds && {
                    quizMatieres: {
                        createMany: {
                            data: matieresIds.map((matiereId) => ({
                                matiereOrder: matiereId.order,
                                matiereId: matiereId.matierId,
                                time: matiereId.time ? parseInt(matiereId.time) : 12
                            }))
                        }
                    }
                }),
                ...(questionIds && {
                    quizQuestions: {
                        createMany: {
                            data: questionIds.map((questionId) => ({
                                questionOrder: questionId.order,
                                questionId: questionId.questionId
                            }))
                        }
                    }
                })
            },
            include: {
                category: true,
                quizQuestions: {
                    include: {
                        question: {
                            include: {
                                answers: {
                                    where: {
                                        isDeleted: false
                                    }
                                }
                            }
                        }
                    }
                },
                quizMatieres: {
                    include: {
                        matiere: true
                    }
                }
            }
        })

        return updatedQuiz
    }

    async deleteQuiz(id) {
        // First, delete related records
        await prisma.$transaction([
            prisma.quizmatiere.deleteMany({
                where: { quizId: parseInt(id) }
            }),
            prisma.quizquestion.deleteMany({
                where: { quizId: parseInt(id) }
            })
        ])

        // Then delete the quiz
        return prisma.quiz.delete({
            where: { id: parseInt(id) }
        })
    }
}

const quiz = new QuizRepositorie()

export default quiz