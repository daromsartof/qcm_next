/*
  Warnings:

  - Added the required column `time` to the `quizmatiere` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `quizmatiere` ADD COLUMN `time` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `quizuseranswer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quizId` INTEGER NOT NULL,
    `answerId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `answerId`(`answerId`),
    INDEX `questionId`(`questionId`),
    INDEX `quizId`(`quizId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `quizuseranswer` ADD CONSTRAINT `quizuseranswer_ibfk_1` FOREIGN KEY (`answerId`) REFERENCES `answer`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `quizuseranswer` ADD CONSTRAINT `quizuseranswer_ibfk_2` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `quizuseranswer` ADD CONSTRAINT `quizuseranswer_ibfk_3` FOREIGN KEY (`quizId`) REFERENCES `quiz`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `quizuseranswer` ADD CONSTRAINT `quizuseranswer_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
