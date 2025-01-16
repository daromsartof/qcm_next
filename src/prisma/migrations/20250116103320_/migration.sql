-- CreateTable
CREATE TABLE `answer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionId` INTEGER NOT NULL,
    `title` LONGTEXT NOT NULL,
    `answerFileUrl` VARCHAR(191) NULL,
    `description` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `isCorrect` BOOLEAN NOT NULL DEFAULT false,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `answer_questionId_fkey`(`questionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matiere` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` LONGTEXT NOT NULL,
    `description` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `matiereId` INTEGER NULL,
    `categoryId` INTEGER NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `isMultiChoice` BOOLEAN NOT NULL DEFAULT false,
    `fileUrl` VARCHAR(191) NULL,
    `sourceId` INTEGER NULL,

    INDEX `question_categoryId_fkey`(`categoryId`),
    INDEX `question_matiereId_fkey`(`matiereId`),
    INDEX `question_sourceId_fkey`(`sourceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quiz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mode` SMALLINT NOT NULL DEFAULT 1,
    `categoryId` INTEGER NOT NULL,

    INDEX `quiz_categoryId_fkey`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quizmatiere` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quizId` INTEGER NOT NULL,
    `matiereId` INTEGER NOT NULL,
    `matiereOrder` INTEGER NULL,

    INDEX `quizMatiere_matiereId_fkey`(`matiereId`),
    UNIQUE INDEX `quizmatiere_quizId_matiereId_key`(`quizId`, `matiereId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quizquestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quizId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `questionOrder` INTEGER NULL,

    INDEX `quizQuestion_questionId_fkey`(`questionId`),
    UNIQUE INDEX `quizQuestion_quizId_questionId_key`(`quizId`, `questionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `source` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `codeStep` VARCHAR(191) NULL,
    `roles` VARCHAR(191) NOT NULL DEFAULT 'user',
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verificationcode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `isUsed` BOOLEAN NOT NULL DEFAULT false,

    INDEX `verificationCode_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `answer` ADD CONSTRAINT `answer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_matiereId_fkey` FOREIGN KEY (`matiereId`) REFERENCES `matiere`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `source`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quiz` ADD CONSTRAINT `quiz_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quizmatiere` ADD CONSTRAINT `quizmatiere_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quizmatiere` ADD CONSTRAINT `quizmatiere_matiereId_fkey` FOREIGN KEY (`matiereId`) REFERENCES `matiere`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quizquestion` ADD CONSTRAINT `quizquestion_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quizquestion` ADD CONSTRAINT `quizquestion_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `verificationcode` ADD CONSTRAINT `verificationcode_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
