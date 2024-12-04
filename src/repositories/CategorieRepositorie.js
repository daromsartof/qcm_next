import prisma from "@/services/Utils/prisma"

class CategorieRepositorie {
    async createCategorie({
        name
    }) {
        return prisma.category.create({
            data: {
                title: name
            }
        })
    }

    async getAllCategories() {
        return prisma.category.findMany({
            where: {
                isDeleted: false
            }
        })
    }
}

export default new CategorieRepositorie()