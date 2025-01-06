import prisma from "@/services/Utils/prisma"

class SourceRepositorie {
    async createSource({
        name
    }) {
        return prisma.source.create({
            data: {
                title: name
            }
        })
    }

    async getAllSources() {
        return prisma.source.findMany({
            where: {
                isDeleted: false
            },
            orderBy: {
                createdAt : 'desc'
            }
        })
    }

    async deleteSource(id){
        return prisma.source.update({
            where: { id },
            data: { isDeleted: true }
        })
    }

    async updateSource({ id, name }) {
        return prisma.source.update({
            where: { id },
            data: {
                title: name
            }
        })
    }
}

const source = new SourceRepositorie()

export default source