import prisma from "@/services/Utils/prisma"
import ReponseRepositorie from "./ReponseRepositorie"

class QuestionRepositorie {
    async createQuestion({
        title,
        description,
        categoryId,
        matiereId,
        sourceId,
        isMultichoise,
        reponses = []
    }){
        const question = await prisma.question.create({
            data:{
                title,
                description,
                categoryId,
                matiereId,
                source: sourceId,
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

        console.log(reponseData)

        return {
            ...question,
            reponses: reponseData
        }
    }

    async getAllQuestions(){
        return prisma.question.findMany({
            where: {
                isDeleted: false
            },
            include: {
                Category: true,
                Source: true,
                Matiere: true
            }
        })
    }
}

export default new QuestionRepositorie()