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
                if (a.isCorrect && datas.find(d => d.questionId === q.questionId && d.answerId === a.id)) correctAnswers++
            })
        })

        const questions = quizQuestions.flatMap((q) => {
            const userAnswerId = datas.find((d) => d.questionId === q.questionId)?.answerId || 0
            const isCorrect = q.question.answers.find(a => a.id === userAnswerId)?.isCorrect || false


            return {
                text: q.question.title,
                isCorrect,
                answerImage: q.question.response_file_url,
                image: q.question.fileUrl,
                userAnswer: q.question.answers.find(a => a.id === userAnswerId)?.title || 'Auccun Reponse',
                correctAnswer: q.question.answers.find(a => a.isCorrect)?.title || 'Auccun Reponse',
                hasImage: !!q.question.fileUrl
            }
        })

        console.log(questions);

        // Commencer une transaction pour s'assurer que toutes les opérations sont effectuées
        const results = await prisma.$transaction(async (prisma) => {
            // Créer les réponses de l'utilisateur
            await prisma.quizuseranswer.createMany({
                data: datas.map((data) => ({
                    quizId: parseInt(quizId),
                    userId: parseInt(userId),
                    questionId: parseInt(data.questionId),
                    answerId: parseInt(data.answerId)
                }))
            })

            // Calculer le temps total passé (à adapter selon vos besoins)
            const timeSpent = quiz.time ? quiz.time * 60 : 0 // Convertir en secondes

            // Enregistrer les statistiques du quiz
            await prisma.userquizstatistics.create({
                data: {
                    userId: parseInt(userId),
                    quizId: parseInt(quizId),
                    score: Math.round((correctAnswers / totalQuestions) * 100),
                    timeSpent: timeSpent
                }
            })

            // Enregistrer l'activité
            await prisma.useractivitylog.create({
                data: {
                    userId: parseInt(userId),
                    action: 'QUIZ_COMPLETED',
                    details: JSON.stringify({
                        quizTitle: quiz.title,
                        score: Math.round((correctAnswers / totalQuestions) * 100),
                        correctAnswers,
                        totalQuestions
                    })
                }
            })

            // Mettre à jour les performances par matière
            const quizMatieres = await prisma.quizmatiere.findMany({
                where: { quizId: parseInt(quizId) }
            })

            for (const quizMatiere of quizMatieres) {
                // Calculer le score pour cette matière spécifique
                const matiereQuestions = quizQuestions.filter(qq =>
                    qq.question.matiereId === quizMatiere.matiereId
                )

                let matiereCorrectAnswers = 0

                matiereQuestions.forEach((q) => {
                    q.question.answers.forEach((a) => {
                        if (a.isCorrect && datas.find(d =>
                            d.questionId === q.questionId &&
                            d.answerId === a.id
                        )) {
                            matiereCorrectAnswers++
                        }
                    })
                })

                const matiereScore = Math.round((matiereCorrectAnswers / matiereQuestions.length) * 100)

                await prisma.userperformancebymatiere.upsert({
                    where: {
                        userId_matiereId: {
                            userId: parseInt(userId),
                            matiereId: quizMatiere.matiereId
                        }
                    },
                    update: {
                        totalScore: {
                            increment: matiereScore
                        },
                        quizCount: {
                            increment: 1
                        }
                    },
                    create: {
                        userId: parseInt(userId),
                        matiereId: quizMatiere.matiereId,
                        totalScore: matiereScore,
                        quizCount: 1
                    }
                })
            }

            return {
                scorePercentage: Math.round((correctAnswers / totalQuestions) * 100),
                correctAnswers,
                totalQuestions,
                questions,
                categorie: quiz.categoryId
            }
        })

        return results
    }

    async getUserStats(userId) {
        try {
            // Récupérer les statistiques générales des quiz
            const quizStats = await prisma.userquizstatistics.aggregate({
                where: { userId: parseInt(userId) },
                _count: {
                    id: true // nombre total de quiz
                },
                _avg: {
                    score: true, // score moyen
                    timeSpent: true // temps moyen passé
                },
                _sum: {
                    timeSpent: true // temps total passé
                }
            })
    
            // Récupérer l'utilisateur avec ses informations de base
            const user = await prisma.user.findUnique({
                where: { id: parseInt(userId) },
                select: {
                    name: true,
                    email: true,
                    createdAt: true,
                    roles: true
                }
            })
    
            // Récupérer les performances par matière
            const matierePerformance = await prisma.userperformancebymatiere.findMany({
                where: { userId: parseInt(userId) },
                include: {
                    matiere: {
                        select: {
                            title: true
                        }
                    }
                }
            })
    
            // Récupérer l'historique des quiz avec détails
            const quizHistory = await prisma.userquizstatistics.findMany({
                where: { userId: parseInt(userId) },
                include: {
                    quiz: {
                        select: {
                            title: true,
                            category: {
                                select: {
                                    title: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    completedAt: 'desc'
                }
            })
    
            // Récupérer l'activité récente
            const recentActivity = await prisma.useractivitylog.findMany({
                where: { userId: parseInt(userId) },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 10
            })
    
            // Calculer les tendances (30 derniers jours)
            const thirtyDaysAgo = new Date()

            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
            const activityData = await prisma.userquizstatistics.groupBy({
                by: ['completedAt'],
                where: {
                    userId: parseInt(userId),
                    completedAt: {
                        gte: thirtyDaysAgo
                    }
                },
                _avg: {
                    score: true
                },
                orderBy: {
                    completedAt: 'asc'
                }
            })
    
            // Formater les données pour le frontend
            const formattedQuizHistory = quizHistory.map(history => ({
                id: history.id,
                quizTitle: history.quiz.title,
                category: history.quiz.category.title,
                score: history.score,
                duration: Math.round(history.timeSpent / 60), // Convertir en minutes
                completedAt: history.completedAt
            }))
    
            const performanceData = matierePerformance.map(perf => ({
                subject: perf.matiere.title,
                score: Math.round(perf.totalScore / perf.quizCount) // Score moyen par matière
            }))
    
            // Calculer la tendance du score (comparaison avec la période précédente)
            const currentPeriodAvg = quizStats._avg.score || 0

            const previousPeriodAvg = activityData.length > 0 
                ? activityData.slice(0, Math.floor(activityData.length / 2)).reduce((acc, curr) => acc + (curr._avg.score || 0), 0) / Math.floor(activityData.length / 2)
                : 0

            const scoreTrend = previousPeriodAvg ? ((currentPeriodAvg - previousPeriodAvg) / previousPeriodAvg) * 100 : 0
    
            return {
                // Informations utilisateur
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                roles: user.roles,
    
                // Statistiques générales
                totalQuizzes: quizStats._count.id,
                averageScore: Math.round(quizStats._avg.score || 0),
                totalTime: Math.round((quizStats._sum.timeSpent || 0) / 3600), // Convertir en heures
                scoreTrend: Math.round(scoreTrend),
    
                // Données pour les graphiques
                performanceData,
                activityData: activityData.map(activity => ({
                    date: activity.completedAt,
                    score: Math.round(activity._avg.score || 0)
                })),
    
                // Activité récente
                recentActivity: recentActivity.map(activity => ({
                    date: activity.createdAt,
                    action: activity.action,
                    details: activity.details ? JSON.parse(activity.details) : null
                })),
    
                // Historique complet
                quizHistory: formattedQuizHistory
            }
        } catch (error) {
            console.error('Error fetching user stats:', error)
            throw error
        }
    }
}


const quizUserAnswerRepositorie = new QuizUserAnswerRepositorie()

export default quizUserAnswerRepositorie