-- AlterTable
ALTER TABLE `question` ADD COLUMN `response_file_url` TEXT NULL;

-- AlterTable
ALTER TABLE `quiz` ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `level` INTEGER NULL DEFAULT 1,
    ADD COLUMN `time` INTEGER NULL;
