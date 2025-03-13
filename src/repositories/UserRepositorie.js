import prisma from "@/services/Utils/prisma"


class UserRepositorie {

    async getUserByEmail({
        email
    }) {
        return prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async getAllUsers() {
        return prisma.user.findMany()
    }

    async getUsersByDateRange(startDate, endDate) {
        return prisma.user.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            }
        })
    }
}


const userRepo = new UserRepositorie()

export default userRepo