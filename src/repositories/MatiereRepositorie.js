import prisma from "@/services/Utils/prisma"

class MatiereRepositorie {
    async createMatiere({
        name
    }) {
        return prisma.matiere.create({
            data: {
                title: name
            }
        })
    }

    async getAllMatieres() {
        return prisma.matiere.findMany({
            where: {
                isDeleted: false
            }
        })
    }
}

const matiere = new MatiereRepositorie()

export default matiere