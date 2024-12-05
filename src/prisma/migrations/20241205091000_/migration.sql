/*
  Warnings:

  - You are about to drop the column `questionId` on the `Answer` table. All the data in the column will be lost.
  - Added the required column `question` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Answer` DROP FOREIGN KEY `Answer_questionId_fkey`;

-- AlterTable
ALTER TABLE `Answer` DROP COLUMN `questionId`,
    ADD COLUMN `question` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_question_fkey` FOREIGN KEY (`question`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
