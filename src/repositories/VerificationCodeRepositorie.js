import crypto from 'crypto'

import prisma from "@/services/Utils/prisma"




class VerificationCodeRepositorie {
    generateVerificationCode() {
        return crypto.randomInt(100000, 999999).toString()
    }
    async createVerificationCode({
        userId
    }){
        await this.deleteVerificationCodeByUserId(userId)

        return prisma.verificationcode.create({
            data: {
                code: this.generateVerificationCode(),
                userId,
                expiresAt: new Date(),
                isUsed: false
            }
        })
    }

    async getVerificationCodeByUserId(userId) {
        return prisma.verificationcode.findFirst({
            where: {
                userId,
                isUsed: false
            }
        })
    }

    async getVerificationCodeByUserEmail({
        email
    }) {
        return prisma.verificationcode.findFirst({
            where: {
                user:{
                    email
                }
            },
            include: {
                user: true
            },
            orderBy: {
                expiresAt: 'desc'
            }
        })
    }

    async deleteVerificationCodeById(id) {
        return prisma.verificationcode.delete({
            where: { id }
        })
    }
    async deleteVerificationCodeByUserId(userId) {
        return prisma.verificationcode.deleteMany({
            where: { userId }
        })
    }
}

const VerificationCode = new VerificationCodeRepositorie()

export default VerificationCode