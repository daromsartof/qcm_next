-- AlterTable
ALTER TABLE `Answer` ADD COLUMN `answerFileUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Question` ADD COLUMN `fileUrl` VARCHAR(191) NULL;
