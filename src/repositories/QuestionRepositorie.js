import prisma from "@/services/Utils/prisma"

class QuestionRepositorie {
    async createQuestion({
        title,
        description,
        categoryId,
        matiereId,
        sourceId,
        isMultichoise
    }){
        return prisma.question.create({
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