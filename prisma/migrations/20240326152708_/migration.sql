/*
  Warnings:

  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_diaryId_fkey`;

-- AlterTable
ALTER TABLE `comment` ADD COLUMN `created_At` DATETIME(3) NULL,
    ADD COLUMN `updated_At` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `diary` ADD COLUMN `created_At` DATETIME(3) NULL,
    ADD COLUMN `updated_At` DATETIME(3) NULL;

-- DropTable
DROP TABLE `image`;
