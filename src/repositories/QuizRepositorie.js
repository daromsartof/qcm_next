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
}

const quiz = new QuizRepositorie()

export default quiz