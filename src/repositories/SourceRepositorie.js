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
            }
        })
    }
}

export default new SourceRepositorie()