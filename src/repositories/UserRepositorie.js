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
}


const userRepo = new UserRepositorie()

export default userRepo