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

    async getUserStats(userId) {
        // Get all quizzes
        const allQuizzes = await prisma.quiz.findMany({
            include: {
                quizQuestions: {
                    include: {
                        question: {
                            include: {
                                answers: true
                            }
                        }
                    }
                }
            }
        });


      //  const totalQuizzes = allQuizzes.length;
        const quizQuestions = allQuizzes.flatMap(quiz => quiz.quizQuestions);
        const totalQuestionsQuiz = allQuizzes.reduce((sum, quiz) => sum + quiz.quizQuestions.length, 0);


        // Get all user answers
        const userAnswers = await prisma.quizuseranswer.findMany({
            where: { userId: parseInt(userId) },
            include: {
                quiz: true,
                question: {
                    include: {
                        answers: true
                    }
                },
                answer: true
            }
        });

        // Get unique completed quizzes
        const completedQuizIds = [...new Set(userAnswers.map(answer => answer.quizId))];
        const completedQuizzes = completedQuizIds.length;

        // Calculate total questions answered
        let correctAnswers = 0;

        const totalQuestionsAnswered = quizQuestions.reduce((sum, quizQuestion) => {
            const { question } = quizQuestion

            if (question.answers.some(answer => userAnswers.some(userAnswer => userAnswer.questionId === question.id && userAnswer.answerId === answer.id))) {
                if (question.answers.some(answer => userAnswers.some(userAnswer => userAnswer.questionId === question.id && userAnswer.answerId === answer.id) && answer.isCorrect)) {
                    correctAnswers++;
                }

                sum++;
            }

            
return sum
        }, 0);

        // Calculate overall success rate
        const successRate = totalQuestionsAnswered > 0 
            ? Math.round((correctAnswers / totalQuestionsAnswered) * 100) 
            : 0;

        // Calculate failed quizzes (success rate < 50%)
        const quizResults = completedQuizIds.map(quizId => {
            const quizAnswers = userAnswers.filter(answer => answer.quizId === quizId);
            const correctQuizAnswers = quizAnswers.filter(answer => answer.answer.isCorrect).length;

            
return {
                quizId,
                successRate: Math.round((correctQuizAnswers / quizAnswers.length) * 100)
            };
        });

        const failedQuizzes = quizResults.filter(quiz => quiz.successRate < 50).length;

        // Calculate overall progression
        const progressionPercentage = Math.round((totalQuestionsAnswered / totalQuestionsQuiz) * 100);

        return {
            progression: {
                percentage: progressionPercentage,
                questionsAnswered: totalQuestionsAnswered,
                totalPossibleQuestions: totalQuestionsQuiz
            },
            quizStats: {
                completed: completedQuizzes,
                failed: failedQuizzes,
                successRate: successRate
            }
        };
    }
}


const quizUserAnswerRepositorie = new QuizUserAnswerRepositorie()

export default quizUserAnswerRepositorie