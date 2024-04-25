/*
  Warnings:

  - You are about to drop the column `bookName` on the `record` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `record` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `record` DROP COLUMN `bookName`,
    DROP COLUMN `username`;
