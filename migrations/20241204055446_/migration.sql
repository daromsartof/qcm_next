/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RoleToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_RoleToUser` DROP FOREIGN KEY `_RoleToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_RoleToUser` DROP FOREIGN KEY `_RoleToUser_B_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `roles` VARCHAR(191) NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE `Role`;

-- DropTable
DROP TABLE `_RoleToUser`;
