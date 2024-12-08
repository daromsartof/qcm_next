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

        return {
            ...question,
            answers: reponseData
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
                answers: true,
                Matiere: true
            }
        })
    }

    async deleteQuestion(id){
        return prisma.question.update({
            where: { id },
            data: { isDeleted: true }
        })
    }
}

const question =  new QuestionRepositorie()

export default question