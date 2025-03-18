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
ALTER TABLE `answer` ADD CONSTRAINT `answer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_matiereId_fkey` FOREIGN KEY (`matiereId`) REFERENCES `matiere`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `source`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quiz` ADD CONSTRAINT `quiz_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quizmatiere` ADD CONSTRAINT `quizmatiere_matiereId_fkey` FOREIGN KEY (`matiereId`) REFERENCES `matiere`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quizmatiere` ADD CONSTRAINT `quizmatiere_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quizquestion` ADD CONSTRAINT `quizquestion_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quizquestion` ADD CONSTRAINT `quizquestion_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `verificationcode` ADD CONSTRAINT `verificationcode_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quizuseranswer` ADD CONSTRAINT `quizuseranswer_ibfk_1` FOREIGN KEY (`answerId`) REFERENCES `answer`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `quizuseranswer` ADD CONSTRAINT `quizuseranswer_ibfk_2` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `quizuseranswer` ADD CONSTRAINT `quizuseranswer_ibfk_3` FOREIGN KEY (`quizId`) REFERENCES `quiz`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `quizuseranswer` ADD CONSTRAINT `quizuseranswer_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
