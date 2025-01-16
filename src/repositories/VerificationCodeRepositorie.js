import crypto from 'crypto'

import prisma from "@/services/Utils/prisma"




class VerificationCodeRepositorie {
    generateVerificationCode() {
        return crypto.randomInt(100000, 999999).toString()
    }
    async createVerificationCode({
        userId
    }){
        return prisma.verificationCode.create({
            data: {
                code: this.generateVerificationCode(),
                userId,
                expiresAt: new Date(),
                isUsed: false
            }
        })
    }

    async getVerificationCodeByUserId(userId) {
        return prisma.verificationCode.findFirst({
            where: {
                userId,
                isUsed: false
            }
        })
    }

    async getVerificationCodeByUserEmail({
        email
    }) {
        return prisma.verificationCode.findFirst({
            where: {
                user:{
                    email
                }
            },
            include: {
                User: true
            },
            orderBy: {
                expiresAt: 'desc'
            }
        })
    }

    async deleteVerificationCodeById(id) {
        return prisma.verificationCode.delete({
            where: { id }
        })
    }
}

const VerificationCode = new VerificationCodeRepositorie()

export default VerificationCode