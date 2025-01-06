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
            },
            orderBy: {
                title: 'asc'
            }
        })
    }

    async deleOneMatiere(id){
        return prisma.matiere.update({
            where: { id },
            data: { isDeleted: true }
        })
    }

    async updateMatiere({ id, name }) {
        return prisma.matiere.update({
            where: { id },
            data: {
                title: name
            }
        })
    }
}

const matiere = new MatiereRepositorie()

export default matiere