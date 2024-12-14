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

    async deleteCategorie(id){
        return prisma.category.update({
            where: { id },
            data: { isDeleted: true }
        })
    }

    async updateCategorie({ id, name }) {
        return prisma.category.update({
            where: { id },
            data: {
                title: name
            }
        })
    }
}

const category = new CategorieRepositorie()

export default category