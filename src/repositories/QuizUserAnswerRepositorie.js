import prisma from "@/services/Utils/prisma"


class QuizUserAnswerRepositorie {
    async createQuizUserAnswer({
        quizId,
        userId,
        datas
    }) {
        const quiz = await prisma.quiz.findUnique({
            where: { id: quizId }
        })
        const quizQuestions = await prisma.quizquestion.findMany({
            where: { quizId },
            include: {
                question: {
                    include: {
                        answers: true
                    }
                }
            }
        })
        let correctAnswers = 0;
        let totalQuestions = quizQuestions.length;
        quizQuestions.forEach((q) => {
            q.question.answers.forEach((a) => {
                if(a.isCorrect && datas.find(d => d.questionId === q.questionId && d.answerId === a.id)) correctAnswers++
            })
        })
        const questions = quizQuestions.flatMap((q) => {
            const userAnswerId= datas.find((d) => d.questionId === q.questionId)?.answerId || 0
            const isCorrect = q.question.answers.find(a => a.id === userAnswerId)?.isCorrect || false
            return {
                text: q.question.title,
                isCorrect,
                answerImage: q.question.response_file_url,
                image: q.question.fileUrl,
                userAnswer: q.question.answers.find(a => a.id === userAnswerId)?.title || 'Auccun Reponse',
                correctAnswer:  q.question.answers.find(a => a.isCorrect)?.title || 'Auccun Reponse',
                hasImage: !!q.question.fileUrl
            }
        })
        console.log(questions);
        const results = {
            scorePercentage: Math.round((correctAnswers / totalQuestions) * 100),
            correctAnswers,
            totalQuestions,
            //timeTaken: quiz_data!.time * 60 - timeLeft,
            questions,
            categorie: quiz.categoryId
          
        }

        await prisma.quizuseranswer.createMany({
            data: datas.map((data) => ({
                quizId: parseInt(quizId),
                userId: parseInt(userId),
                questionId: parseInt(data.questionId),
                answerId: parseInt(data.answerId)
            }))
        })

        
        return results
    }
}


const quizUserAnswerRepositorie = new QuizUserAnswerRepositorie()
export default quizUserAnswerRepositorie